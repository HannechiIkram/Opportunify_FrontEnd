<?php

//Add your information here
$recipient = "themefunctions@gmail.com";

//Don't edit anything below this line

//import form information
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$mobile = $_POST['mobile'];
$email = $_POST['email'];
$case1 = $_POST['case1'];
$case2 = $_POST['case2'];
$thing = $_POST['thing'];
$thing1 = $_POST['thing1'];
$thing2 = $_POST['thing2'];
$thing3 = $_POST['thing3'];
$thing4 = $_POST['thing4'];
$thing5 = $_POST['thing5'];
$thing6 = $_POST['thing6'];
$thing7 = $_POST['thing7'];
$thing8 = $_POST['thing8'];
$thing9 = $_POST['thing9'];
$thing10 = $_POST['thing10'];
$thing11 = $_POST['thing11'];
$thing = $_POST['thing'];

$name=stripslashes($name);
$subject=stripslashes($url);
$email=stripslashes($email);
$message=stripslashes($message);
$message= "Name: $name, Url: $url \n\n Message: $message";

/*
Simple form validation
check to see if an email and message were entered
*/

//if no message entered and no email entered print an error
if (empty($message) && empty($email)){
print "No email address and no message was entered. <br>Please include an email and a message";
}
//if no message entered send print an error
elseif (empty($message)){
print "No message was entered.<br>Please include a message.<br>";
}
//if no email entered send print an error
elseif (empty($email)){
print "No email address was entered.<br>Please include your email. <br>";
}


//mail the form contents
if(mail("$recipient", "$url", "$message", "From: $email" )) {

	// Email has sent successfully, echo a success page.

	echo '<div class="alert alert-success alert-dismissable fade in">
		<button type = "button" class = "close" data-dismiss = "alert" aria-hidden = "true">&times;</button>
    
		<p>Email Sent Successfully! We Will get back to you shortly</p></div>';

	} else {

	echo 'ERROR!';

	}

