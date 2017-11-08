$(document).ready(function(){
  setTimeout(function(){
    $(".angular-google-map-container").height($('#right-content').height());
  },3000);
  $( window ).resize(function() {
    if($(window).width() > '767') {
      $(".angular-google-map-container").height($('#right-content').height());
    }
  });
});
