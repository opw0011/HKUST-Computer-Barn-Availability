<div id="main-container" class="container" ng-controller="BarnAvailCtrl">
	<div class="text-center">
		<h1 class="text-center">Barn Real-time Usage</h1>
		<small><i>Last updated: 1 hour ago</i></small>
	</div>


	<ul class="list-group">
	  <li class="list-group-item" ng-repeat="barn in barns">
			
			<div class="row">
				<div class="col-sm-2">							
					<h4>{{barn.barn_id | barnName}}</h4>
				</div>
				<div class="col-sm-9">
					<small>Available Seats</small>		
					<uib-progressbar max="barn.num_comp" value="barn.num_avail" type="success" uib-tooltip="{{barn.num_avail}} computers are currently available" tooltip-class="tooltip-custom">
						<span style="display: block; position: absolute; width: 90%;">{{barn.num_avail}} / {{barn.num_comp}}</span>
					</uib-progressbar>
				</div>
				<div class="col-sm-1">
					<a href="{{base_url('barn/')+barn.barn_id}}">Preview</a>
				</div>
			</div>
	  </li>
	  <li class="list-group-item">			  	
			<div class="row">
				<div class="col-sm-2">
					<h4>Overall</h4>
				</div>
				<div class="col-sm-9">
					<small>Available Seats</small>	
					<uib-progressbar max="total_comp" value="total_avail" type="success">
						<span style="display: block; position: absolute; width: 90%;">{{total_avail}} / {{total_comp}}</span>
					</uib-progressbar>
				</div>
				<div class="col-sm-1">
<!-- 					<a href="">Preview</a> -->
				</div>
			</div>
	  </li>
	</ul>
</div>
