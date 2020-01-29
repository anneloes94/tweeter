$(document).ready(function() {

  const timeBetween = (date) => {
    const msPerDay = 1000 * 60 * 60 * 24
    let currentDate = new Date()
    const diffInTime = (currentDate - date) / msPerDay
    if (diffInTime >= 365) {
      return Math.floor(diffInTime / 365) + " years ago"
    } else if (diffInTime >= 1) {
      return Math.floor(diffInTime) + " days ago"
    } else {
      return Math.floor(diffInTime*24) + " hours ago"
    }
  }

  console.log(new Date())

  const createTweetElement = (tweetData) => {
    const tweetArray = []
    for (tweet of tweetData) {
      const {
        name,
        avatars,
        handle,
      } = tweet.user

      const { text } = tweet.content

      const { created_at } = tweet
    

      tweetArray.push(`
      <article class="tweet">
        <header>
          ${name}
          ${avatars}
          ${handle}
        </header>
        <p>
          ${text}
        </p>
        <footer>
          ${timeBetween(new Date(created_at))}
        </footer>
      `)
    }
    return tweetArray;
  }

    // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [{
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
          "handle": "@SirIsaac"
        },
      "content": {
          "text": "If I have seen further it is by standing on the shoulders of giants"
        },
      "created_at": 1461116232227
   }]
  
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('main #tweetSection').append($tweet); // to add it to the page so we can make sure it's   got all the right elements, classes, etc.


      // $('main #tweetSection').append($article);
  })