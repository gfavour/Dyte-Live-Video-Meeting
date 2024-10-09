<script type="text/javascript">var ROOTHTTP = '<?php echo $ROOTHTTP; ?>';</script>
<script src="../assets/resources/js/jq.min.js"></script>
    <script src="../assets/resources/js/popper.js"></script>
    <script src="../assets/resources/js/bootstrap.min.js"></script>
    <script src="../assets/resources/js/main.js"></script>
	<script src="../fxn/psjquery.js"></script>
	<script>
			$(function() {			
				$('[data-toggle="tooltip"]').tooltip({"placement": "right","trigger": "click" }).click(function(e) {$(body).tooltip('toggle');	e.preventDefault();  });		  		
			});
			
			function ShowGlobalModal(m,hd){   
				$('.hintmodalbody').html(atob(m)); 
				$('.hintmodaltitle').html(hd); 
				$('.myhintModal').modal('show'); 
			}			
		</script>
		
		<?php include('../modals.php'); ?>
</body></html>