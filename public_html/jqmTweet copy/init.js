(function($) {
  var methods = {
    initMainPage: function() {
      var $page = $('#pageTweetList');

      // Set some defaults
      $page.data('rpp', 20);
      $page.data('twitterUser', 'jsgeneve');
      $page.data('boolUpdate', false);

      // Update the twitter feed for the first time
      updateTwitterFeed();

      // Every time we show this page we need to check if we need to update
      $page.bind('pageshow', function(event, ui) {
	    alert("psMain");
        if ($page.data('boolUpdate')) {
          updateTwitterFeed();
          $page.data('boolUpdate', false);
        }
      });
    },

    initDetailPage: function() {
      var $page = $('#pageTweetDetail');

      $page.bind('pageshow', function(event, ui){
		 	    alert("psDetail");
        var objTweet = JSON.parse($page.data('tweetJSON'));
        var strHTML = '<p><img src="' + objTweet.profile_image_url + '">';
        strHTML += objTweet.text + '</p>';
        $page.find('.container-tweet').html(strHTML);
      });
    },

    initSettingsPage: function() {
      var $page = $('#pageSettings');
      var $datapage = $('#pageTweetList');

      $page.find('#username').change(function() {
        var newVal = $(this).val();
        $datapage.data('twitterUser', newVal);
        $datapage.data('boolUpdate', true);
      });

      // JQuery Mobile does not have a change event for slider
      // We need to check it when the user leaves the page
      $page.bind('pagebeforehide', function(event, ui) {
        var sliderValue = $page.find('#slider').val();
        if (parseInt(sliderValue, 10) != parseInt($datapage.data('rpp'), 10)) {
          $datapage.data('rpp', sliderValue);
          $datapage.data('boolUpdate', true);
        }
      });

      // On page show we need to update the elements on this page to reflect current data
      $page.bind('pageshow', function(event, ui) {
        $page.find('#username').val($datapage.data('twitterUser'));
        $page.find('#slider').val($datapage.data('rpp'));
      });
    },

    initAll: function() {
      $().initApp('initMainPage');
      $().initApp('initDetailPage');
      $().initApp('initSettingsPage');
    }
  };

  $.fn.initApp = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.initAll.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist');
    }
  };
})(jQuery);
