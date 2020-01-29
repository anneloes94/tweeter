$(document).ready(function() {
  console.log("Char counter is loaded into HTML file, hooray!")

  const $container = $('.container');

  //counts characters
  $('#tweetContent').keyup(function() {
    let length = $(this).val().length
    const maxLength = 140
    let $countTag = $(this).siblings(".counter")

    if (length <= maxLength) {
      $countTag.html(length);
    } else if (length > maxLength) {
      $countTag.html(maxLength - length);
    }
  })


  // Registers and pushes new Tweet
  $container.find('form').on('submit', (e) => {
    e.preventDefault();
      const $form = $(e.target);
      const $textbox = $form.find('#tweetContent')
      const $tweet = $textbox.val();
      const $newTweet = $('<article>').addClass('newTweet').text($tweet);


      $container.append($newTweet);
      // $container.append($('<div>"1, 2, 3"</div>'))
  })
});