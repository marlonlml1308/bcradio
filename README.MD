# VPS Radio - Icecast + Web + Nginx Proxy Manager

## Arquitectura

```
Internet
   |
Nginx Proxy Manager
   |
   +-- radio.midominio.com
   |       |
   |       +-- Icecast Docker :8000
   |
   +-- www.midominio.com
           |
           +-- Web HTML/CSS/JS Docker
```

---

# 1. Instalar Docker

```bash
apt update
apt upgrade -y

curl -fsSL https://get.docker.com | sh

systemctl enable docker
systemctl start docker
```

Validar:

```bash
docker --version
```

---

# 2. Nginx Proxy Manager

Crear carpeta:

```bash
mkdir -p /opt/npm
cd /opt/npm
```

Crear:

```bash
nano docker-compose.yml
```

Contenido:

```yaml
version: "3"

services:
  npm:
    image: jc21/nginx-proxy-manager
    container_name: nginx-proxy-manager
    restart: unless-stopped

    ports:
      - "80:80"
      - "81:81"
      - "443:443"

    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
```

Iniciar:

```bash
docker compose up -d
```

Panel:

```
http://IP_VPS:81
```

---

# 3. Icecast

Crear:

```bash
mkdir -p /opt/icecast
cd /opt/icecast
```

Crear:

```bash
nano docker-compose.yml
```

Contenido:

```yaml
version: "3"

services:

  icecast:
    image: infiniteproject/icecast
    container_name: icecast
    restart: unless-stopped

    ports:
      - "8000:8000"

    environment:
      ICECAST_HOSTNAME: radio.midominio.com
      ICECAST_SOURCE_PASSWORD: source123
      ICECAST_ADMIN_PASSWORD: admin123
      ICECAST_RELAY_PASSWORD: relay123
```

Iniciar:

```bash
docker compose up -d
```

---

# 4. Configurar Icecast en Nginx Proxy Manager

Crear Proxy Host:

```
Domain:
radio.midominio.com

Forward Hostname:
icecast

Forward Port:
8000
```

SSL:

```
Request SSL Certificate
Force SSL
```

URLs:

Stream:

```
https://radio.midominio.com/stream
```

Panel:

```
https://radio.midominio.com
```

Estado:

```
https://radio.midominio.com/status.xsl
```

---

# 5. Datos del Stream

Configuración encoder (BUTT, Rocket Broadcaster, Mixxx):

```
Tipo:
Icecast 2

Servidor:
radio.midominio.com

Puerto:
8000

Usuario:
source

Password:
source123

Mount:
/stream
```

Resultado:

```
https://radio.midominio.com/stream
```

---

# 6. Web HTML/CSS/JS

Crear carpeta:

```bash
mkdir -p /opt/web-radio
cd /opt/web-radio
```

Clonar repositorio:

```bash
git clone URL_REPOSITORIO .
```

Crear:

```bash
nano Dockerfile
```

Contenido:

```dockerfile
FROM nginx:alpine

COPY . /usr/share/nginx/html
```

Crear:

```bash
nano docker-compose.yml
```

Contenido:

```yaml
version: "3"

services:

  web-radio:
    build: .
    container_name: web-radio
    restart: unless-stopped

    ports:
      - "8080:80"
```

Iniciar:

```bash
docker compose up -d --build
```

---

# 7. Publicar Web con NPM

Crear Proxy Host:

```
Domain:
www.midominio.com

Forward Hostname:
web-radio

Forward Port:
80
```

Activar SSL.

Web:

```
https://www.midominio.com
```

---

# Comandos útiles

Ver contenedores:

```bash
docker ps
```

Consumo:

```bash
docker stats
```

Logs:

```bash
docker logs -f icecast
```

Actualizar web:

```bash
cd /opt/web-radio
git pull
docker compose up -d --build
```
