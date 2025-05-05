console.log(YT);

////////////// JPLAYER //////////////////

$(document).ready(function() {
  var myPlaylist = new jPlayerPlaylist(
    {
      jPlayer: "#jquery_jplayer_1",
      cssSelectorAncestor: "#jp_container_1"
    },
    [
      {
        title: "+RADIOPB",
        artist: "Mu",
        poster: "https://cdn-profiles.tunein.com/s201489/images/logod.jpg?t=159891",
        oga: "https://radios.yanapak.org/bcradio"
      },
    ],
    {
      swfPath: "../../dist/jplayer",
      supplied: "webmv, ogv, m4a, oga, mp3, m4v, mp4, youtube",
      wmode: "window",
      volume: 1,
      useStateClassSkin: true,
      autoBlur: false,
      smoothPlayBar: true,
      keyEnabled: true,
      ended: function() {
        // The $.jPlayer.event.ended event
        //$(this).jPlayer("play"); // Repeat the media
        //alert("ended");
      } // ended
    }
  ); // end jplayer initiate

  /* ======== Other Audio Player Functions ======== */

  $("#jquery_jplayer_1").on(
    $.jPlayer.event.ready + " " + $.jPlayer.event.play,
    function(event) {
      ///////////// GC TEST EVENT /////////////////////////
      // ALL CURRENT INFOS
      console.log(event.jPlayer.status);

      if ($(this).data().jPlayer.status.paused == false) {
        //if($(this)).data().jPlayer.status.paused == false){
        //Is Playing;
        console.log("Is Playing");
      }
      ///////////// GC TEST EVENT END /////////////////////////

      /* === ENABLE PLAYLIST ==== */

      var current = myPlaylist.current;
      var playlist = myPlaylist.playlist;
      $.each(playlist, function(index, obj) {
        if (index == current) {
          if (typeof obj.poster !== "undefined");

          $(".jp-now-playing").html(
            "<img id='mini_poster' src=" +
              obj.poster +
              "><div class='jp-track-name'>" +
              obj.title +
              "</div> <div class='jp-artist-name'>" +
              obj.artist +
              "</div>"
          );
        }
      });

      /* === VOLUME DRAGGING ==== */
      $(".jp-volume-bar")
        .mousedown(function() {
          var parentOffset = $(this).offset(),
            width = $(this).width();
          $(window).mousemove(function(e) {
            var x = e.pageX - parentOffset.left,
              volume = x / width;
            if (volume > 1) {
              $("#jquery_jplayer_1").jPlayer("volume", 1);
            } else if (volume <= 0) {
              $("#jquery_jplayer_1").jPlayer("mute");
            } else {
              $("#jquery_jplayer_1").jPlayer("volume", volume);
              $("#jquery_jplayer_1").jPlayer("unmute");
            }
          });
          return false;
        })
        .mouseup(function() {
          $(window).unbind("mousemove");
        });

      /* === ENABLE DRAGGING ==== */

      var timeDrag = false; /* Drag status */
      $(".jp-play-bar").mousedown(function(e) {
        timeDrag = true;
        updatebar(e.pageX);
      });
      $(document).mouseup(function(e) {
        if (timeDrag) {
          timeDrag = false;
          updatebar(e.pageX);
        }
      });
      $(document).mousemove(function(e) {
        if (timeDrag) {
          updatebar(e.pageX);
        }
      });

      //update Progress Bar control
      var updatebar = function(x) {
        var progress = $(".jp-progress");
        //var maxduration = myPlaylist.duration; //audio duration

        var position = x - progress.offset().left; //Click pos
        var percentage = 100 * position / progress.width();

        //Check within range
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }

        $("#jquery_jplayer_1").jPlayer("playHead", percentage);

        //Update progress bar
        $(".jp-play-bar").css("width", percentage + "%");
      };

      /* === Playlist Functions ==== */

      $("#playlist-toggle").on("click", function() {
        $("#playlist-wrap").stop().fadeToggle();
        $(this).toggleClass("playlist-is-visible");
      });

      //////////  GC YOUTUBE FUNCTIONS
    } // end of i don't know
  ); // end jplayer event ready

  //////////////  YOUTUBE OPTIONS EXTRA ////////////

  // $("#destroy").on("click", function() {

  //  $("#playlist-wrap").stop().fadeToggle();
  //         $(this).toggleClass("playlist-is-visible");
  // });

  $("#destroy").on("click", function() {
    //alert('destroy');
    //$('#jquery_jplayer_1').jPlayer("volume", 0.3);
    $("#jp_container_1").addClass("yt-player");
    //$("#jquery_jplayer_1").jPlayer("destroy");
    $("#jquery_jplayer_1").jPlayer( "clearMedia" );
    //$(this).jPlayer("destroy");
    
    
  var $this = $(this);
  var videoID = $this.attr("data-ytid");
  var divID = 'yt-' + videoID;
  var containerID = 'vc-' + videoID;

  //var player = items[Math.floor(Math.random() * items.length)];

  //$(this).after('<div id="' + randomID + '"></div>');
  $(this).after('<div id="' + containerID + '" class="video-container" id=""><div id="' + divID + '"></div></div>');

  //this.after('<div class="video-container" id="wrapper_' + video_id + '"><iframe id="' + video_id + '" class="YTiframe" src="https://www.youtube.com/embed/' + video_id + '?autoplay=1&v_load_policy=3" frameborder="0" allowfullscreen allowscriptaccess="always"></iframe></div>');
  // $("iframe[src^='http://www.youtube.com']").addClass("myClass");
var newPlayer = new YT.Player("yt-player", {
  //var newPlayer = players[divID] = new YT.Player(divID, {
    //player = new YT.Player(player, {
    width: 430,
    height: 270,
    videoId: "Xa0Q0J5tOP0",
    playerVars: {
      controls: 1,
      showinfo: 0,
      rel: 0,
      showsearch: 0,
      iv_load_policy: 3
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': catchError // OPTIONAL IF FUNCTION
    }
  });

  function onPlayerReady(event) {
    //event.target.playVideo();
    playersarr.push(newPlayer);
    
 
//       var playButton = document.getElementById("play-button");
//   playButton.addEventListener("click", function() {
//     newPlayer.playVideo();
//   });
  
//   var pauseButton = document.getElementById("pause-button");
//   pauseButton.addEventListener("click", function() {
//     newPlayer.pauseVideo();
//   });
    
  
    
    
$(function() {
  
  $(document).on("click", ".yt-player .jp-play", function(event) {  
  //$(document).on("click", ".yt-player .jp-play", function(event) {  
  //$(".yt-player .jp-play").on("click", function() {
    player.playVideo();
  });

  $(document).on("click", ".yt-player .jp-next", function(event) {
  //$(".yt-player .jp-next").on("click", function() {
    player.nextVideo()
    //player.pauseVideo();
  });
});
    
    
  }
    
    
    
  });

  function destroy() {}


  ////////////////////////////////////////////////
}); // end document ready


// OPTIONAL onStateChange
function onPlayerStateChange(event) {

  if (event.data == YT.PlayerState.PLAYING) {

    //alert("PLAYING");

    var temp = event.target.a.src;
    var tempPlayers = $("iframe"); // with class: var temp = $("iframe.yt_players");
    for (var i = 0; i < playersarr.length; i++) {
      //if (playersarr[i].a.src != temp) playersarr[i].stopVideo();
      if (playersarr[i].a.src != temp) playersarr[i].pauseVideo();
    }
  }
}

function catchError(event) {
  if (event.data == 100) console.log("De video bestaat niet meer");
}