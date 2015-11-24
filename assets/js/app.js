var app = angular.module('barnApp', ['ui.bootstrap','barnNameFilters']);


app.controller('BarnAvailCtrl', function($scope, $http) {
	$scope.base_url = function(url) {
		// console.log(url);
		return base_url+url;
	}

	$http.get("barn/data/all").success(function(response) {
		// console.log(response);

		var total_avail = 0, total_comp = 0;
		// sum up the total num
		angular.forEach(response, function(value, key){
			// console.log(value.num_avail);
			total_avail += parseInt(value.num_avail);
			total_comp += parseInt(value.num_comp);
		});

		$scope.barns = response;
		$scope.total_avail = total_avail;
		$scope.total_comp = total_comp;
	});

	// // customize the progress bar color according to the percentage
	// $scope.showBarColor = function(cur, max) {

	// 	console.log('show color');
	// 	$scope.bar_type = '';

	// 	var percetage = (cur/max)*100;
	// 	var type;
	// 	console.log(percetage);
	// 	if (percetage >= 80)
	// 		type = 'success';
	// 	else if (percetage >= 50)
	// 		type = 'info';
	// 	else if (percetage >= 30)
	// 		type = 'warning';
	// 	else {type = 'danger';}

	// 	console.log(type);
	// 	$scope.bar_type = type;

	// }
});

app.controller('BarnViewCtrl', function($scope, $http, $location) {
	$scope.base_url = function(url) {
		console.log(url);
		return base_url+url;
	}
	 /*$http.get('path/to/json').then(function(data) {
    $scope.languages = data;
  });*/
  //inputting json directly for this example
  // $scope.barnAComps = [
  //   {id:"compa001", avail:0},
  //   {id:"compa002", avail:1},
  //   {id:"compa003", avail:0},
  //   {id:"compa004", avail:0},
  //   {id:"compa005", avail:1},
  //   {id:"compa006", avail:0},
  //   {id:"compa007", avail:0},
  //   {id:"compa008", avail:0},
  //   {id:"compa009", avail:1},
  // ];
  $scope.barnAComps = [
  	[
	    {id:"compa001", avail:0},
	    {id:"compa002", avail:1},
	    {id:"compa003", avail:0},
	    {id:"compa004", avail:0},
	    {id:"compa005", avail:1},
	    {id:"compa006", avail:0},
	    {id:"compa007", avail:0},
	    {id:"compa008", avail:0},
	    {id:"compa009", avail:1},
	  ],
  	[
	    {id:"compa010", avail:0},
	    {id:"compa011", avail:1},
	    {id:"compa012", avail:0},
	    {id:"compa013", avail:1},
	    {id:"compa014", avail:0},
	    {id:"compa015", avail:0},
	    {id:"compa016", avail:1},
	    {id:"compa017", avail:0},
	    {id:"compa018", avail:0},
	  ],
  	[
	    {id:"compa019", avail:1},
	    {id:"compa020", avail:0},
	    {id:"compa021", avail:0},
	    {id:"compa022", avail:0},
	    {id:"compa023", avail:0},
	    {id:"compa024", avail:0},
	    {id:"compa025", avail:0},
	    {id:"compa026", avail:0},
	    {id:"compa027", avail:1},
	  ],
  	[
	    {id:"compa028", avail:0},
	    {id:"compa029", avail:0},
	    {id:"compa030", avail:0},
	    {id:"compa031", avail:1},
	    {id:"compa032", avail:0},
	    {id:"compa033", avail:0},
	    {id:"compa034", avail:1},
	    {id:"compa035", avail:0},
	    {id:"compa036", avail:0},
	  ]

  ];

  $scope.test = "dd";

  $scope.barnBComps = [
    {id:"compa001", avail:0},
    {id:"compa002", avail:1},
    {id:"compa003", avail:0},
    {id:"compa004", avail:0},
    {id:"compa005", avail:1},
    {id:"compa006", avail:0},
    {id:"compa007", avail:0},
    {id:"compa008", avail:0},
    {id:"compa009", avail:1},
  ];

  // $scope.save = function() {
  //   $http.post('assets/data/barn_loc.json', $scope.languages).then(function(data) {
  //     $scope.msg = 'Data saved';
  //   });
  //   $scope.msg = 'Data sent: '+ JSON.stringify($scope.languages);
  // };
})
.directive('compAvail', function() {
  return {
  	restrict: 'E',
    templateUrl: base_url+'assets/templates/comp_avail.html'
  };
});
