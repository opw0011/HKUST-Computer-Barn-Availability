<!DOCTYPE html>
<html lang="" ng-app="barnApp">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Title Page</title>
		<link rel="stylesheet" type="text/css" href="<?=base_url('assets/css/main.css') ?>">

		<!-- Bootstrap CSS -->
		<link href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body ng-controller="BarnEditCtrl">
		<!-- <h1 class="text-center">Hello World {{test}}</h1> -->

		<?php 

		?>

		<div class="container-fluid" ng-repeat="barn in barn_info| filter: {barn_code: 'a'}">
			<h3>Barn Name:{{barn.barn_name}} [{{barn.barn_code}}]</h3>
			<a href="" ng-click="showMapView=!showMapView">Show/Hide Map</a>

			<!-- map graphic preview -->
			<div class="container-fluid" ng-show="showMapView">
				<div class="row map-grid-y" ng-repeat="y in [] | range:10">
					<div class="col-sm-1 map-grid-x" ng-repeat="x in [] | range:10">
						<!-- map coordinate -->
						<small class="text-muted">[{{x}},{{y}}]</small>

						<div class="map-grid-comp" ng-repeat="comp in barn.compsLoc| filter: { cor_x: x, cor_y: y } :true" >
							<!-- only show mapped computer -->
							<div class="icon_comp" ng-show="comp.avail=='0'" ng-include="'<?=base_url('assets/imgs/comp_red.svg')?>'" uib-tooltip="In Use"></div>
							<div class="icon_comp" ng-show="comp.avail=='1'" ng-include="'<?=base_url('assets/imgs/comp_green.svg')?>'" uib-tooltip="Available"></div>
							<span>{{comp.id}}</span>		
						</div> 
						
					</div>
				</div>				
			</div>
			<!-- map graphic preview end-->

				<div class="row">
					<div class="col-xs-6">
						<table class="table table-hover table-bordered table-condensed" >							
							<thead>
								<tr>
									<th>Computer Id</th>
									<th>Coordinate X</th>
									<th>Coordinate Y</th>
								</tr>
							</thead>
							<tbody>
									<tr ng-repeat="comp in barn.compsLoc">
										<td><input type="text" ng-model="comp.id"/></td>
										<td><input type="number" ng-model="comp.cor_x"  min="0" max="9" title="dd"/></td>
										<td><input type="number" ng-model="comp.cor_y" min="0" max="9"/></td>
									</tr>
									<tr>
										<td colspan="3">
											<input type="submit" class="btn btn-success pull-right" value="Save" ng-click="updateJson()"/>
										</td>
									</tr>
							</tbody>
						</table>

					</div>

					<div class="col-xs-6">
							<a href="" ng-click="showJsonView=!showJsonView">Show/Hide JSON</a>
							<pre style="word-wrap: break-word;" ng-show="showJsonView">{{barn_info | json}}</pre>
					</div>
				</div>

		</div>




		

		<script type="text/javascript">
			 var base_url = "<?php echo base_url() ?>";
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
		<script src="<?php echo base_url('assets/js/filter.js') ?>"></script>
	</body>
</html>