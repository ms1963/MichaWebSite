var retrieveTweets = function(user,count) {
  $.mobile.showPageLoadingMsg(true);
  var $page = $('#ListOfTweets');

  var strUrl = "http://search.twitter.com/search.json?callback=?&rpp=" + count + "&q=from:" + user;

  $.ajax({
    url: strUrl,
    dataType: 'jsonp',

    success: function(data) {
      $page.find('.content').empty();

      if (data.results.length === 0) {
     	$page.find('.content').html('<ul data-role="listview" data-filter="true"></ul>');
      	$list = $page.find('.content ul');	
		var strHtml = '<li><h1><strong> No tweets found </strong></h4></li>';
        $.mobile.hidePageLoadingMsg();
      }
	  else {
      	$page.find('.content').html('<ul data-role="listview" data-filter="true"></ul>');
      	$list = $page.find('.content ul');

      	for (var i = 0; i < data.results.length; i++) {
        
        	var strHtml = '<li><a href="#Tweet">' + '<img src="' + data.results[i].profile_image_url + '">' + data.results[i].text + '</a></li>\n';
        	var tweet = $(strHtml);
        	$list.append(tweet);
        	$list.find('a:last').data('tweetInfo', JSON.stringify(data.results[i]));
      }

      $list.listview();
      $.mobile.hidePageLoadingMsg();
      $list.find('a').tap(function() {
        var $this = $(this);
        $('#Tweet').data('tweetInfo', $this.data('tweetInfo'));
      });
	  }
    },

    error: function() {
 	 alert("accessing Twitter failed");

      // Hide the page loading dialog
      $.mobile.hidePageLoadingMsg();
    }
  });
};
