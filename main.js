//Sidebar menu

$(document).ready(function () {
  $('#sidebar_btn').click(function () {
    $('#menu').toggleClass('visible');
  });
});



//FlexSlider

$(window).load(function () {

  // Vimeo API nonsense
  var player = document.getElementById('player_1');
  $f(player).addEvent('ready', ready);

  function addEvent(element, eventName, callback) {
    (element.addEventListener) ? element.addEventListener(eventName, callback, false) :
      element.attachEvent(eventName, callback, false);
  }

  function ready(player_id) {
    var froogaloop = $f(player_id);
    
    froogaloop.addEvent('play', function (data) {
      $('.flexslider').flexslider("pause");
    });
    
    froogaloop.addEvent('pause', function (data) {
      $('.flexslider').flexslider("play");
    });
  };

  // Call fitVid before FlexSlider initializes, so the proper initial height can be retrieved.
  $(".flexslider")
    .fitVids()
    .flexslider({
      animation: "slide",
      useCSS: false,
      animationLoop: false,
      smoothHeight: true,
      start: function (slider) {
        $('body').removeClass('loading');
      },
      before: function (slider){
      $f(player).api('pause');
      }
    });
});



//AJAX/JSON

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(xhttp.responseText);
    var images = response.images;
    var videos = response.videos;
    
    var gallery = document.getElementsByClassName("gallery_content");
    var video = document.getElementsByClassName("video");
    var slider = document.getElementsByClassName("slides")[0];
    
    slider.innerHTML += "<li><iframe id='player_1' src='" + videos[0].video + "' width='500' height='281' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></li>";
    slider.innerHTML += "<li><img src='" + images[1].image + "'></li>";
    slider.innerHTML += "<li><img src='" + images[2].image + "'></li>";
        
    gallery[0].style.backgroundImage = "url('" + images[0].image + "')";
    gallery[1].style.backgroundImage = "url('" + images[1].image + "')";
    gallery[2].style.backgroundImage = "url('" + images[2].image + "')";
    video[0].setAttribute("data-video", "" + videos[0].video + "");
    
  }
};
xhttp.open("GET", "data.json", true);
xhttp.send();



//Modal panel

$(function() {
    $(".video").click(function () {
      var theModal = $(this).data("target"),
      videoSRC = $(this).attr("data-video"),
      videoSRCauto = videoSRC + "?modestbranding=1&rel=0&controls=0&showinfo=0&html5=1&autoplay=1";
      $(theModal + ' iframe').attr('src', videoSRCauto);
      $(theModal + ' button.close').click(function () {
        $(theModal + ' iframe').attr('src', videoSRC);
      });
    });
  });