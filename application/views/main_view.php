<!DOCTYPE html>
<html lang="" ng-app="barnApp">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Barn Availability</title>
		<base href="<?php echo base_url() ?>">

		<!-- Bootstrap CSS -->
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<link rel="stylesheet" type="text/css" href="<?=base_url('assets/css/main.css') ?>">
		<link rel="stylesheet" type="text/css" href="<?=base_url('assets/css/stacktable.css') ?>">
		<link rel="stylesheet" type="text/css" href="<?=base_url('assets/css/jquery.qtip.min.css') ?>">
		<!-- d3js -->
		<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	</head>
	<body >

		<!-- navbar start -->

		<nav class="navbar navbar-default" role="navigation">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="barn/">Barn Availability</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav">
					<li><a href="barn#/map/1000">Barn A</a></li>
					<li><a href="barn#/map/1001">Barn B</a></li>
					<li><a href="barn#/map/1002">Barn C</a></li>
					<li><a href="barn#/map/1003">Barn D</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<!-- <li><a href="#">Link</a></li> -->
					<li uib-dropdown on-toggle="toggled(open)">
						<a href="#" id="simple-dropdown" uib-dropdown-toggle>Settings <b class="caret"></b></a>
						<ul class="uib-dropdown-menu" aria-labelledby="simple-dropdown">
							<li><a href="#" target="_blank">Edit (coming soon...)</a></li>
					<!-- 		<li><a href="#">Action2</a></li> -->
						</ul>
					</li>
				</ul>
			</div><!-- /.navbar-collapse -->
		</nav>

		<!-- navbar end -->

		<!-- main-container start -->

		<?php
//			if($barn_id == 'all')
//		  	$this->load->view('barn_all_view');
//		  else
//		  	$this->load->view('barn_view');
		?>

		<div ng-view></div>

		<!-- main-container end -->


		<script type="text/javascript">
			 var base_url = "<?php echo base_url() ?>";
			 var barn_id = "<?=$barn_id?>";
		</script>
		<!-- angularjs -->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
		<!--ng-route-->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-route.js"></script>
		<!-- angularjs barnApp module -->
		<script src="<?php echo base_url('assets/js/app.js') ?>"></script>
		<!-- jQuery -->
		<script src="//code.jquery.com/jquery.js"></script>
		<!-- Bootstrap JavaScript -->
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<!-- Angular-ui JavaScript-->
		<script src="<?php echo base_url('assets/js/lib/ui-bootstrap-tpls-0.14.3.min.js') ?>"></script>
		<script src="<?php echo base_url('assets/js/filter.js') ?>"></script>
		<!-- stacktable.js -->
		<script src="<?php echo base_url('assets/js/lib/stacktable.js') ?>"></script>
		<!-- imageMapResizer -->
		<script src="<?php echo base_url('assets/js/lib/imageMapResizer.min.js') ?>"></script>
		<!-- qtip -->
		<script src="<?php echo base_url('assets/js/lib/jquery.qtip.min.js') ?>"></script>
		<!-- map highlight -->
		<script src="<?php echo base_url('assets/js/lib/jquery.imagemapster.min.js') ?>"></script>

		<script src="<?php echo base_url('assets/js/main.js') ?>"></script>
		<script src="<?php echo base_url('assets/js/mapResize.js') ?>"></script>

		<!--xeditable-->
		<script src="<?php echo base_url('assets/js/lib/xeditable.min.js') ?>"></script>
		<link rel="stylesheet" src="<?php echo base_url('assets/css/xeditable.css') ?>">
		<!--ng-google-chart-->
		<script src="assets/js/lib/ng-google-chart.min.js"></script>



	</body>
</html>
