<!doctype html>
<html lang="en">
  <head>
  	<title>AgentAway</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="shortcut icon" href="../images/favicon.png" type="image/x-icon">
	<link rel="stylesheet" href="../assets/fonts/bs-icons/bs-icons.css">
	<link rel="stylesheet" href="../assets/css/modal.css">
	<link rel="stylesheet" href="../assets/resources/css/style.css">
	<link rel="stylesheet" href="../assets/resources/css/mine-u.css">
        
    <?php include("../assets/dyte/functions.php"); ?>
    <style>
        body{background:#f5f5f5;}
        .btn1{padding:10px 10px; background:#080;color:#fff;width:150px;text-align:center; text-decoration:none;border-radius:3px;margin:10px auto;}
        #joinbox{padding:30px 15px 35px 15px !important;border-radius:10px; margin:10% 5%; text-align:center;background:#fff;color:#111;}
        #result{margin:0;font-size:12px; padding:2px 0;}
        input[type="text"]{border:#ccc solid 1px; padding:10px; text-align:center;}
        .d-block{display:block;}
        .fw-600{font-weight:600;}
    </style>
  </head>
<body>
	
<div id="joinbox" class="shadow-sm">
  <h3 class="mb-1 fw-600"><i class="bi bi-headset d-block" style="font-size:45px;color:#090;"></i>AgentAway Assistant</h3>
  <p class="mb-1">You're trying to join a meeting with an agent but something happens. <span class="d-block p-2 m-3" style="color:#f00;background:#eee;border-radius:10px;"><?php echo ($_GET["m"] != '')?$_GET["m"]:'No reason'; ?></span> You contact your agent to join their meeting.</p>
  <p class="m-3"><small>Are you a real estate agent? Signup with free trial account on agentaway.com to get unlimited referrals and showings.</small></p>
  
  <div id="lvmain">
      <a href="../signup/"class="btn btn-primary mt-2">Sign up</a>
  </div>
</div>
<?php include("footer.php"); ?>