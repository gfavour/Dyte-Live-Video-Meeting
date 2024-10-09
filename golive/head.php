<?php 
include("../fxn/connection.php");
include("../fxn/paginator-bootstrap.php"); 
if(isset($_SESSION["caali20"])){
$globalid = $_SESSION["caali20"];
$globalname = $_SESSION["caalfn20"];
$globalem = $_SESSION["caalem20"];
$globalrole = $_SESSION["caalr20"];
$globalphoto = $_SESSION["caalpix20"];
}else{
redirect('../login'); //login/ manifest="../aalmanifest_1_0.appcache"
}
?>
<!doctype html>
<html lang="en">
  <head>
  	<title>AgentAway</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="shortcut icon" href="../images/favicon.png" type="image/x-icon">
	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="../assets/fonts/bs-icons/bs-icons.css">
	<link rel="stylesheet" href="../assets/css/modal.css">
	<link rel="stylesheet" href="../assets/resources/css/style.css">
	<link rel="stylesheet" href="../assets/resources/css/mine-u.css">
	<link rel="stylesheet" href="../fxn/paginator-bootstrap.css">
  </head>