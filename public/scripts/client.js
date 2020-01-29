$(document).ready(function() {

  const $container = $('.container');

  // Registers and pushes new Tweet
  $container.find('form').on('submit', (e) => {
    e.preventDefault();
      const $form = $(e.target);
      const $textbox = $form.find('#tweetContent')
      const $tweet = $textbox.val();
      // const $newTweet = $('<article>').addClass('tweet').text($tweet);

      $article = $('<article>').addClass('tweet')
      $header = $('<header>').text("AUTHOR")
      $p = $('<p>').text($tweet)
      $footer = $('<footer>').text("7 days ago")
      $article.append($header)
              .append($p)
              .append($footer);

      // <article>
      //   <header> 
      //     Author
      //   </header>
      //   <p>
      //   $newTweet
      //   </p>
      //   <footer>
      //     7 days ago
      //   </footer>
      // </article>

      $('main #tweetSection').append($article);
  })

  // wteet element changes when hovering over it

  // console.log("Hello")

  // const $tweetArticle = $('<article>').find('.tweet')

  //css pseudoclass

  // $tweetArticle.hover(
  //   function() {
  //     let $tweetArticle = $('<article>').find('.tweet')
  //     $tweetArticle.css('color', 'black')
  //     console.log($(this))
  //     $(this).css('box-shadow', '5px 5px lightskyblue')
  //   }, function() {
  //     $(this).css('article.tweet')
  //   }
  // )
});