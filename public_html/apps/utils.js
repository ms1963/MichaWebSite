// JavaScript Document
$(document).bind("pageinit", function() {
	$("#login_page").bind("pagebeforeshow", function(e) {
		$("#user").val("");
		$("#pass").val("");
	});
	
	$("#logout").click(function(event) {
		$.mobile.changePage("index.html");
	});
	
	function onSuccess() {
		$.mobile.changePage("home.html");
	}
	
	function onError(msg) {
		
		if (msg == "false") {
			errorMessage = "<h4><strong> * Could not log you in. Check your credentials! </strong></h4>";
		}
		else
		{
			errorMessage = "<h4><strong> * " + msg + "</strong></h4>";
		}
		$("#login_page").find(".error_msg").html(errorMessage);
		setTimeout(function(){ $("#login_page").find(".error_msg").empty();
		}, 5000);	
	}
	
	$("#submitLogin").bind("click", function(event) {
		var error_msg = "";
		if ($("#user").val().length == 0) {
			error_msg = " * User name  must not be empty!  ";
		}
		if ($("#pass").val().length == 0) {
			error_msg += "<br/>  * Password must not be empty!";
		}
		if (error_msg.length > 0) {
				$("#login_page").find(".error_msg").html("<h4> <strong> " + error_msg + "</strong> </h4>");
				setTimeout(function(){ $("#login_page").find(".error_msg").empty();
				}, 5000);	
		} else {
			$.post("login.php", $("#loginForm").serialize(),function(response){
				(response == "true") ? onSuccess() : onError(response);
			});
		}
		event.preventDefault();
	});
});