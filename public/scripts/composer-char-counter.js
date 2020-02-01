$(document).ready(function() {

  //counts characters
  $('#tweetContent').keyup(function() {
    let length = $(this).val().length;
    const maxLength = 140;
    let $countTag = $(this).siblings(".counter");

    if (length <= maxLength) {
      $countTag.html(length);
      $countTag.css("color", "black");
    } else if (length > maxLength) {
      $countTag.html(maxLength - length);
      $countTag.css("color", "red");
    }
  });

});