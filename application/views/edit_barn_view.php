<!DOCTYPE html>
<html lang="" ng-app="barnApp">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Barn EDIT</title>

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
	</head>
	<body ng-controller="BarnEditCtrl">

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
				<a class="navbar-brand" href="<?=base_url() ?>">Barn Availability</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav">
					<li><a href="<?=base_url('barn/a') ?>">Barn A</a></li>
					<li><a href="#">Barn B</a></li>
					<li><a href="#">Barn C</a></li>
					<li><a href="#">Barn D</a></li>
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
		<!-- ng-repeat="barn in barn_info| filter: {barn_id: '<?=$barn_id?>'}" -->
		<div id="main-container">
			<h3>Barn Name:{{barn.barn_name}} [{{barn.barn_id}}]</h3>
			{{barn.compsLoc}}
			<img id="barn-map" src="<?=base_url('assets/imgs/map.PNG')?>" alt="" usemap="#Map" style="width:100%"/>
			<map name="Map" id="Map" >
		    <area ng-repeat="comp in barn.compsLoc" id="" avail="e" alt="" title="" href="#" shape="circle" coords="{{comp.coords}}" data-qtip="{{comp.id}}"/>
<!-- 		    <area id="" avail="e" alt="" title="" href="#" shape="circle" coords="117,424,30" data-qtip="SHDIFSDFI"/>
		    <area id="1" avail="e" alt="" title="" href="#" shape="circle" coords="{{testdata}}" data-qtip="TTEST"/> -->
				<area id="1" avail="e" alt="" title="" href="#" shape="circle" coords="{{testdata}}" data-qtip="TTEST"/>
			</map>
			<div class="container-fluid" >{{testdata}}
				<input id="coord" type="text" name="" ng-model="testdata" id="input" class="form-control" value="" required="required" pattern="" title="">
				<button id="refresh_btn" type="button" class="btn btn-default" ng-click="updateCoord()">button</button>

				

			</div>			
		</div>
		<!-- main-container end -->


		<script type="text/javascript">
			 var base_url = "<?php echo base_url() ?>";
			 var barn_id = "<?=$barn_id?>";
		</script>
		<!-- angularjs -->
		<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
		<!-- angularjs barnApp module -->
		<script src="<?php echo base_url('assets/js/app.js') ?>"></script>
		<!-- jQuery -->
		<script src="//code.jquery.com/jquery.js"></script>
		<!-- Bootstrap JavaScript -->
		<script src="//netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
		<!-- Angular-ui JavaScript-->
		<script src="<?php echo base_url('assets/js/lib/ui-bootstrap-tpls-0.14.3.min.js') ?>"></script>
		<script src="<?php echo base_url('assets/js/main.js') ?>"></script>
		<script src="<?php echo base_url('assets/js/mapResize.js') ?>"></script>
		<script src="<?php echo base_url('assets/js/filter.js') ?>"></script>
		<!-- stacktable.js -->
		<script src="<?php echo base_url('assets/js/lib/stacktable.js') ?>"></script>
		<!-- imageMapResizer -->
		<script src="<?php echo base_url('assets/js/lib/imageMapResizer.min.js') ?>"></script>
		<!-- qtip -->
		<script src="<?php echo base_url('assets/js/lib/jquery.qtip.min.js') ?>"></script>
		<!-- map highlight -->
		<script src="<?php echo base_url('assets/js/lib/jquery.imagemapster.min.js') ?>"></script>
	</body>
</html>
