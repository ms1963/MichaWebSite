$(document).bind("pageinit",function(){
      var $page = $('#pageTweetList');
	  var twitterUser = "pavlobaron";
	  var count = 20;
     
      retrieveTweets(twitterUser, count);
	  $("#refresh").bind("click", function() {
		  retrieveTweets(twitterUser, count);
	  });

      $('#ListOfTweets').bind('pageshow', function(event, ui) {
          retrieveTweets(twitterUser, count);
      });

      $('#Tweet').bind('pageshow', function(event, ui){
        var tweetInfo = JSON.parse($('#Tweet').data('tweetInfo'));
        var strHTML = '<p><img src="' + tweetInfo.profile_image_url + '">' + tweetInfo.text + '</p>';
        $('#Tweet').find('.tweet-content').html(strHTML);
		$('#Tweet').find('.user').html('<h3><I>'+tweetInfo.from_user+'</I> tweeted at ' + tweetInfo.created_at + ':<h3>');
      });
});