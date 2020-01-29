$(document).ready(function() {

  const $container = $('.container');

  // Registers and pushes new Tweet
  $container.find('form').on('submit', (e) => {
    e.preventDefault();
      const $form = $(e.target);
      const $textbox = $form.find('#tweetContent')
      const $tweet = $textbox.val();
      const $newTweet = $('<article>').addClass('tweet').text($tweet);


      $('main #tweetSection').append($newTweet);
  })
});