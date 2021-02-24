$(document).ready(function() {
  // --- our code goes here ---
  $("textarea").on('keyup', function() {
    const value = $(this).val().length;
    const count = 140 - value;
    //traverses up the DOM tree to find counter class
    const counter = $(this).parent().find('.counter');

    $(counter).text(count);
    if (count < 0) {
      counter.addClass("limit");
    } else {
      counter.removeClass("limit");
    }
  });
});