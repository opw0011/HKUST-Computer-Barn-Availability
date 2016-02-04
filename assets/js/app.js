var app = angular.module('barnApp', ['ui.bootstrap','barnNameFilters']);


/*
====================
CONTROLLERS
====================
*/

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




	// $http.get(base_url+'assets/data/barn_info.json').then(function(response) {
	// 	// alert(data);
 //    $scope.barn_info = response.data[0];
 //  });

  $http.get(base_url+'assets/data/barn_info.json').then(function(response) {
    // alert(data);
    barn_data = response.data;
    // alert(data);
    for(var key in barn_data) {
      barn = barn_data[key]
      // 'barn_id' is passed by CI using url param e.g. /barn-avail/barn/a -> barn_id = a
      // retrieve the wanted barn data
      if(barn.barn_id == barn_id)
        $scope.barn = barn;
    }
    if(!$scope.barn) 
      alert('ERROR: barn not found');

  });

  // $scope.isAvail = function(comp) {
  // 	// if avail ==1, return true; otherwise return false
  // 	return comp.avail == '1';
  // }

  // $scope.matchCoordinate = function(comp, x, y) {
  // 	// if avail ==1, return true; otherwise return false
  // 	console.log(comp);
  // 	console.log("x="+x+" y="+y);
  // 	return (comp.cor_x == x) && (comp.cor_y == y) ;
  // }

  // to be removed
  $scope.testState = '0';

})
.directive('compAvail', function() {
	return {
		restrict: 'E',
		templateUrl: base_url+'assets/templates/comp_avail.html'
	};
});

app.controller('BarnEditCtrl', function($scope, $http, $location) {
	$scope.test = 'hi';
  $scope.testdata = '123,542,50';

	$http.get(base_url+'assets/data/barn_info.json').then(function(response) {
		// alert(data);
    barn_data = response.data;
    // alert(data);
    for(var key in barn_data) {
      barn = barn_data[key]
      // 'barn_id' is passed by CI using url param e.g. /barn-avail/admin/edit/a -> barn_id = a
      // retrieve the wanted barn data
      if(barn.barn_id == barn_id)
        $scope.barn = barn;
    }
    if(!$scope.barn) 
      alert('ERROR: barn not found');

  });

  $scope.updateJson = function() {
    alert('updated');
	  var data = $scope.barn_info;
	  $http.post(base_url+"barn/update", data, {headers: {'Content-Type': 'application/json'}}).success(function(data, status) {
	      // $scope.hello = data;
	  })
  }

  $scope.updateCoord = function() {
    alert(document.getElementById("1").coords);
    document.getElementById("1").coords = $scope.testdata;
  }

});



/*
====================
FILTERS
====================
*/

app.filter('range', function() {
	return function(input, total) {
		total = parseInt(total);

		for (var i=0; i<total; i++) {
			input.push(i);
		}

		return input;
	};
});

app.filter("compsMap", function() { // register new filter

  return function(input, x, y) { // filter arguments

    return input.replace(RegExp(searchRegex), replaceRegex); // implementation

  };
});


app.filter("compAvailibility", function() { // register new filter

  return function(input) { // filter arguments
    if(input == '1')
      return 'Available';
    else
      return 'Unavailable';

  };
});