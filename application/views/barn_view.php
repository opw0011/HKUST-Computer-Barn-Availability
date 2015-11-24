<div id="main-container" class="container-fluid" ng-controller="BarnViewCtrl">
	<!-- <comp-avail></comp-avail> -->
	<div class="table-responsive">		
		<table class="table table-hover">
			<tbody>
				<tr ng-repeat="comps in barnAComps">
					<td ng-repeat="comp in comps">
						<div class="icon_comp" ng-hide="comp.avail" ng-include="'<?=base_url('assets/imgs/comp_red.svg')?>'" uib-tooltip="In Use"></div>
						<div class="icon_comp" ng-show="comp.avail" ng-include="'<?=base_url('assets/imgs/comp_green.svg')?>'" uib-tooltip="Available"></div>
						<span>{{comp.id}}</span>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
