$(document).ready(function() {
  // returns the time between a given date and current dat
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
    `)
    return tweetHTML
  }

  // takes in an array of tweet objects, stringifies and renders them 
  const renderTweets = function(tweets) {
    const tweetArray = []
    for (tweet of tweets) {
      const tweetElement = createTweetElement(tweet)
      tweetArray.push(tweetElement)
    }
    
    $('main #tweetSection').append(tweetArray.join(''))
  }
  
  renderTweets(data);
})
