$(document).ready(function() {

  $(`#arrow-nav`).click(function(event) {
    $(`.new-tweet`).slideToggle('fast', function() {
      $(`#tweetContent`).focus();
    })
    event.stopPropagation();
  })

  $('.error-message').hide();

  // returns the time between a given date and current date
  const timeBetween = (date) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    let currentDate = new Date();
    const diffInTime = (currentDate - date) / msPerDay;

    if (diffInTime >= 365) {
      return Math.floor(diffInTime / 365) + " years ago";
    } else if (diffInTime >= 1) {
      return Math.floor(diffInTime) + " days ago";
    } else {
      return Math.floor(diffInTime * 24) + " hours ago";
    };
  };

  // creates one tweet element
  const createTweetElement = (tweet) => {
    const {
      name,
      avatars,
      handle,
    } = tweet.user;
    const { text } = tweet.content;
    const { created_at } = tweet;

    $footerText = timeBetween(new Date(created_at));

    $like = 'images/Like.png';
    $retweet = 'images/Retweet.png';
    $flag = 'images/Flag.png';

    $p = $("<p>").text(text);
    $footerDiv1 = $('<div id="time">').html($footerText);
    $footerDiv2 = $('<div id="social-links">').html(`<img src=` + $flag + ` alt="flag">` + `<img src=` + $retweet + ` alt="retweet">` + `<img src=` + $like + ` alt="like">`);
    $footer = $("<footer>").append($footerDiv1, $footerDiv2);
    $header = $("<header>").html(`<img src=${avatars} alt="avatar">
    ${name}<span id="username">${handle}</span>`);
    $article = $("<article>");
    $article.addClass("tweet");


    $article.append($header,$p,$footer);

    return '<article class="tweet">' + $article.html() + '</article>';
  }
  
 // takes in an array of tweet objects, stringifies and renders them 
  // aka makes presentable html sections out of tweet objects
  const renderTweets = function(tweets) {
    const tweetArray = [];
    for (tweet of tweets) {
      const tweetElement = createTweetElement(tweet);
      tweetArray.unshift(tweetElement);
    }

    $('main #tweet-section').append(tweetArray.join(''));
  }

 // fetches tweets from /tweets page
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (data) {
        renderTweets(data);
      }
    });
  };
  
 //render new tweets
  loadTweets();

  //listen for 'submit'
  $('.container').find('form').on('submit', function(event) {
    event.preventDefault();
    const $form = $(event.target);
    const $textbox = $form.find('#tweetContent')
    const $tweet = $textbox.val();

    console.log('Form submitted, performing ajax call...');
    const maxLength = 140;
    if ($tweet === "") {
      $(".error-message").html("<strong>Warning! </strong>Your tweet currently has no content");
      $('.error-message').show();
    } else if ($tweet.length > maxLength) {
      jQuery.fx.off = true;
      $(".error-message").html("<strong>Warning! </strong>Your tweet exceeds the maximum amount of characters");
      $('.error-message').show();
    } else {
      $('.error-message').hide();
      $.ajax({
        type: 'POST',
        url: '/tweets', 
        "data": $textbox,
        success: function() {
          $('main #tweet-section').html("");    // clear all html
          loadTweets();                       // load tweets again
        }
      });
    };
  });
});
