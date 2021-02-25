/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() { 
  const data = []

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
    // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
    // takes return value and appends it to the tweets container
      $("#tweets-container").append($tweet);
    }
  }

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
      success: function(res) {
        renderTweets(res);
      }
    });
  };
  loadTweets();

  const createTweetElement = function(tweet) {
    let $tweet = /* Your code for creating the tweet element */
    `
    <article class="tweet">
      <header class="tweet-header">
        <div class="left-header">
          <img class="avatar-pic" src="${tweet.user.avatars}">
          <h3 class="avatar-name">${tweet.user.name}</h3>
        </div>
        <div class="right-header">
          <h3 class="avatar-handle">${tweet.user.handle}</h3>
        </div>
      </header>

      <div class="tweet-paragraph">
        <p>${tweet.content.text}</p>
      </div>

      <footer class="tweet-footer">
        <div class="left-footer">
          <h4 class="tweet-time">${tweet.created_at}</h4>
        </div>
        <div class="right-footer">
          <div class="tweet-icons">
            <img alt="flag" src="images/flag.png">
            <img src="images/retweet.png">
            <img src="images/like.png">
          </div>
        </div>
      </footer>
    </article>
    
    `
    // ...
    return $tweet;
  }
  renderTweets(data);

  $("#tweet-form").on('submit', function (event) {
    event.preventDefault();

    // If form is empty
    if(!$("#tweet-text").val()) {
      alert("No text entered")
      return;
    } 
    
    if ($("#tweet-text").val().length > 140) {
      alert("Text exceeded 140 characters")
      return;
    } 

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
    .then(console.log(this))
  })
});