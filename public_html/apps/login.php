<?php
	    define("mysql_host","mysql11.000webhost.com");
		define("mysql_database","a4576946_appdb");
		define("mysql_user","a4576946_stal");
		define("mysql_password","3l3fant");
		
		
	    $user = preg_replace('/\s+/','',$_POST["user"]); // no whitespaces
	    $pass =  md5($_POST["pass"]);
		
		
		try {
			$db = new PDO("mysql:host=" . mysql_host . ";dbname=" . mysql_database, mysql_user,mysql_password);
			$stmt = $db->prepare("SELECT * FROM login WHERE user=? AND password=?");
			$stmt->execute(array($user, $pass));
			$rowcount = $stmt->rowCount();
			if ($rowcount > 0) {
				session_start();
				$_SESSION["user"] = $user;
				$db = null;
				echo "true";
			}
			else {
				$db = null;
				echo "false";
			}
		}
		catch (PDOException $ex) {
			$db = null;
			echo "false";
		}
		
?>
