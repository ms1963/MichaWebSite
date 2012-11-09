<?php
		session_start();
	    $mysql_host = "mysql11.000webhost.com";
		$mysql_database = "a4576946_appdb";
		$mysql_user = "a4576946_stal";
		$mysql_password = "3l3fant";
	    $user = preg_replace('/\s+/','',$_POST["user"]); // no whitespaces
	    $pass =  md5($_POST["pass"]);
		$con = mysql_connect($mysql_host,$mysql_user,$mysql_password) or die('Could not connect to database: '. mysql_error());
		
		mysql_select_db($mysql_database, $con) or die('Could not select database: ' . mysql_error());
		$query ="SELECT COUNT(*) as num FROM login WHERE user='" . $user ."' AND password='" . $pass . "'";
		
		$result = 	mysql_query($query) or die('Could not execute query: ' . mysql_error());
		$row = mysql_fetch_assoc($result);
		$rowCount = $row['num'];
	
		
		mysql_close($con); 
			
		if ($rowCount == 0) header("location:index.html");
		else {
			$_SESSION["user"]=$user;
			header("location:home.html");
		}
	
		
?>
