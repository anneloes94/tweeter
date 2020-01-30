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
    console.log("Going into createTweetElement")  ///
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
    console.log("going into renderTweets(). Tweets:")
    console.log(tweets)
    const tweetArray = []
    for (tweet of tweets) {
      const tweetElement = createTweetElement(tweet)
      console.log(tweetElement)                   ///
      tweetArray.push(tweetElement)
    }

    //console.log(tweetArray.join("")) // still okay
    $('main #tweetSection').append(tweetArray.join(''))
  }

 // fetches tweets from /tweets page => unsure if this works?
  const loadTweets = () => {
    console.log("Going into loadTweets()")
    console.log($("tweets").serialize())            ///

    $.ajax({
      type: 'GET',
      url: '/tweets',
      // data: $("tweets").serialize(),
      success: function (data) {
        renderTweets(data)},
      error: alert("Could not load initial tweets")
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
      // let name = $(this).siblings(".profile").find("#name") //??
      // console.log("name ")
      // console.log(name)
      // let data = {
      //   "user": {
      //     name,
      //     handle,alert("hello")
      //     avatars
      //   },
      //   "content": {
      //     "text": $(tweet).serialize()
      //   },
      //   "created_at": new Date()
      // }


      $.ajax({
        type: 'POST',
        url: '/tweets', 
        "data": $textbox,
        success: loadTweets(),
        error: alert("Could not load tweets")
      })
    }
  })


})
