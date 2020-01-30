$(document).ready(function() {
  // returns the time between a given date and current date
  const timeBetween = (date) => {
    const msPerDay = 1000 * 60 * 60 * 24
    let currentDate = new Date()
    const diffInTime = (currentDate - date) / msPerDay
    if (diffInTime >= 365) {
      return Math.floor(diffInTime / 365) + " years ago"
    } else if (diffInTime >= 1) {
      return Math.floor(diffInTime) + " days ago"
    } else {
      return Math.floor(diffInTime * 24) + " hours ago"
    }
  }

  // creates one tweet element
  const createTweetElement = (tweet) => {
    const {
      name,
      avatars,
      handle,
    } = tweet.user
    const { text } = tweet.content
    const { created_at } = tweet
  
    const tweetHTML = (`
    <article class="tweet">
      <header>
        <img src=${avatars} alt="avatar">
        ${name}
        <span>${handle}</span>
      </header>
      <p>
        ${text}
      </p>
      <footer>
        ${timeBetween(new Date(created_at))}
      </footer>
    </article>
    `)
    return tweetHTML
  }
  
 // takes in an array of tweet objects, stringifies and renders them 
  // aka makes presentable html sections out of tweet objects
  const renderTweets = function(tweets) {
    const tweetArray = []
    for (tweet of tweets) {
      const tweetElement = createTweetElement(tweet)
      tweetArray.push(tweetElement)
    }

    $('main #tweetSection').append(tweetArray.join(''))
  }

 // fetches tweets from /tweets page => unsure if this works?
  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: function (data) {
        renderTweets(data)}
    })
  }
  
 //render new tweets
  loadTweets()

  //listen for 'submit'
  $('.container').find('form').on('submit', function(event) {
    event.preventDefault();
    const $form = $(event.target);
    const $textbox = $form.find('#tweetContent')
    const $tweet = $textbox.val();

    console.log('Form submitted, performing ajax call...');
    const maxLength = 140;
    if ($tweet === "") {
      alert("Your tweet currently has no content")
    } else if ($tweet.length > maxLength) {
      alert("Your tweet exceeds the maximum amount of characters")
    } else {
      $.ajax({
        type: 'POST',
        url: '/tweets', 
        "data": $textbox,
        success: function() {
          loadTweets()},
        error: function() {     //sometimes problematic... remove?
          alert("Could not load tweets")}
      })
    }
  })
})
