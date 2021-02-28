/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
  $(".write").click(function() {
    $('html, body').animate({
      scrollTop: $(".new-tweet").offset().top
    }, 1000);
  });

  // escape funciton refactors the user input
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  const timeCreated = (time) => {
    const timeDiff = Date.now() - time;
    if (timeDiff >= 31556952000) {
      return `${Math.floor(timeDiff / 31556952000)} years`;
    } else if (timeDiff >= 2592000000) {
      return `${Math.floor(timeDiff / 2592000000)} months`;
    } else if (timeDiff >= 604800000) {
      return `${Math.floor(timeDiff / 604800000)} weeks`;
    } else if (timeDiff >= 86400000) {
      return `${Math.floor(timeDiff / 86400000)} days`;
    } else if (timeDiff >= 3600000) {
      return `${Math.floor(timeDiff / 3600000)} hours`;
    } else if (timeDiff >= 60000) {
      return `${Math.floor(timeDiff / 60000)} minutes`;
    } else {
      return `${Math.floor(timeDiff / 1000)} seconds`;
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet =
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
        <p>${escape(tweet.content.text)}</p>
      </div>

      <footer class="tweet-footer">
        <div class="left-footer">
          <h4 class="tweet-time">${timeCreated(tweet.created_at)} ago</h4>
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
    `;
    return $tweet;
  };

  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const tweet of tweets) {
    // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      console.log($tweet);
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
    }
  };

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET",
      success: function(res) {
        renderTweets(res);
      }
    });
  };
  
$(document).ready(function() {
  loadTweets();
  
  $("#tweet-form").on('submit', function(event) {
    event.preventDefault();

    // If form is empty
    if (!$("#tweet-text").val()) {
      $(".tweet-error").text("Cannot submit an empty tweet");
      $(".tweet-error").slideDown("slow");
      $(".tweet-error").css({"color": "red", "border": "3px solid red", "padding" : "10px"});
    }
    
    // If form exceeds 140 characters
    if ($("#tweet-text").val().length > 140) {
      $(".tweet-error").text("Too long. Please respect our arbitrary limit");
      $(".tweet-error").slideDown("slow");
      $(".tweet-error").css({"color": "red", "border": "3px solid red", "padding" : "10px"});
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(this).serialize()
    })
      .then(() => {
      // resets to empty textarea when submit
        $('#tweet-text').val("");
        // resets the counter to 140 when submit
        $(".counter").text(140);
        $(".tweet-error").css("display", "none");
        loadTweets();
      });
  });
});