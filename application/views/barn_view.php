<div id="main-container" ng-controller="BarnViewCtrl">
	<div class="container-fluid text-center">
		<h2>{{barn.barn_name}} Availability</h2>
		<small>last updated: 15 minutes ago</small>
	</div>
	<img id="barn-map" ng-src="<?=base_url('assets/imgs/barn_map')?>/{{barn.barn_id}}.PNG" alt="{{barn.barn_name}} Map" usemap="#Map" style="width:100%"/>
	<map name="Map" id="Map">
    <area ng-repeat="comp in barn.compsLoc" id="" avail="{{comp.avail}}" alt="" title="" href="#" shape="circle" coords="{{comp.coords}}" data-qtip="{{comp.id}}: {{comp.avail|compAvailibility}}"/>
	    <!-- <area id="" avail="{{testState}}" alt="" title="" href="#" shape="poly" coords="117,424,116,447,146,447,147,424" data-qtip="SHDIFSDFI"/> -->
	    <!-- <area id="" avail="1" alt="" title="" href="#" shape="poly" coords="44,469,44,495,71,496,73,472" data-qtip="TTEST"/> -->
	</map>


<!-- 	<div ng-repeat="n in [] | range:10">

    do something number {{$index}}
	</div> -->
<!-- 	<input type="text" name="" id="input" class="form-control" value="" required="required" pattern="" title="" ng-model="inputSize">
	{{inputSize}} -->

<?php
/*
	<div class="row map-grid-y" ng-repeat="y in [] | range:10">
		<div class="col-sm-1 map-grid-x" ng-repeat="x in [] | range:10">
			<!-- map coordinate -->
			<!-- <small class="text-muted">[{{x}},{{y}}]</small> -->

			<div class="map-grid-comp" ng-repeat="comp in barn_info| filter: { cor_x: x, cor_y: y } :true" >
				<!-- only show mapped computer -->
				<div class="icon_comp" ng-show="comp.avail=='0'" ng-include="'<?=base_url('assets/imgs/comp_red.svg')?>'" uib-tooltip="In Use"></div>
				<div class="icon_comp" ng-show="comp.avail=='1'" ng-include="'<?=base_url('assets/imgs/comp_green.svg')?>'" uib-tooltip="Available"></div>
				<span>{{comp.id}}</span>		
			</div> 
			
		</div>
	</div>*/
?>
</div>
