angular.module('barnNameFilters', []).filter('barnName', function() {
  return function(input) {  	
    return "Barn " + angular.uppercase(input);
  };
});