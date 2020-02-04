$(document).ready(function() {

  //counts characters
  $('#tweetContent').keyup(function() {
    let length = $(this).val().length;
    const maxLength = 140;
    let $countTag = $(this).siblings(".counter");

    $countTag.html(maxLength - length);

    if (length <= maxLength) {
      $countTag.css("color", "black");
    } else if (length > maxLength) {
      $countTag.css("color", "red");
    }
  });

});