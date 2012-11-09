var updateTwitterFeed = function() {

  // Call the page loading dialog
  $.mobile.showPageLoadingMsg(true);

  // Get the page and list we need to work with
  var $page = $('#pageTweetList');

  // Build the URL we need using the data stored on the main view page
  var strUrl = "http://search.twitter.com/search.json?callback=?&rpp=";
  strUrl += $page.data('rpp');
  strUrl += "&q=from:" + $page.data('twitterUser');

  // Get the tweets and append them to the list
  $.ajax({
    url: strUrl,
    dataType: 'json',

    success: function(data) {

      // Delete the existing list, if any
      $page.find('.content').empty();

      // Are there even any tweets to display?
      if (data.results.length === 0) {
        // display an error message in the error dialog
        var strHtml = '<h3>No Tweets Found</h3>';
        strHtml += '<p>No tweets found for the Twitter user name ';
        strHtml += $page.data('twitterUser') + '.</p>';
        $('#pageError .content').html(strHtml);
        $('#show-error-page').click();

        // update the list page to reflect that no tweets were found
        $page.find('.content').html('<h3>No Tweets Found</h3>');

        // Hide the page loading dialog
        $.mobile.hidePageLoadingMsg();

        return;
      }

      // Create a new list
      $page.find('.content').html('<ul></ul>');
      $list = $page.find('.content ul');

      for (var i = 0; i < data.results.length; i++) {
        // Build HTML that contains the desired information
        var strHtml = '<li><a href="#pageTweetDetail">';
        strHtml += '<img src="' + data.results[i].profile_image_url + '">';
        strHtml += data.results[i].text;
        strHtml += '</a></li>\n';

        // Make it into a JQuery object...
        var tweet = $(strHtml);

        // ...so we can append it to our list
        $list.append(tweet);

        // Store to JSON data for this tweer (we will need it for the detail page)
        $list.find('a:last').data('tweetJSON', JSON.stringify(data.results[i]));
      }

      // Call the listview widget
      $list.listview();

      // Hide the page loading dialog
      $.mobile.hidePageLoadingMsg();

      // When the user taps on a tweet, it will go to the detail page.
      // We need to give the detail page the data it needs to display.
      $list.find('a').click(function() {
        var $this = $(this);
        $('#pageTweetDetail').data('tweetJSON', $this.data('tweetJSON'));
      });
    },

    error: function() {
      var $page = $('#pageError .content');
      
      // Create the error message
      var strHtml = '<h3>Update failed</h3>';
      strHtml += '<p>We were unable to update the twitter feed. Please try again.</p>'
      
      $page.html(strHtml);
      $('#show-error-page').click();

      // Hide the page loading dialog
      $.mobile.hidePageLoadingMsg();
    }
  });
};
