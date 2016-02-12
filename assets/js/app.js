var app = angular.module('barnApp', ['ui.bootstrap','barnNameFilters', 'xeditable', 'ngRoute']);


// xeditable config
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/barns', {
            templateUrl: base_url+'assets/templates/barn_admin.html',
            controller: 'BarnAdminCtrl'
        }).
        when('/barn/:barn_uid', {
            templateUrl: base_url+'assets/templates/barn_comp_admin.html',
            controller: 'BarnCompAdminCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

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

app.controller('BarnAdminCtrl', function($scope, $http, $location, BarnServices) {
    BarnServices.getBarns().success(function(data) {
        $scope.barns = data;
        console.log($scope.barns);
    });

    // update/create barn
    $scope.saveBarn = function(data, id) {
        if(id == 'New') {
            BarnServices.createBarn(data);
            window.location.reload();
        }
        else {
            angular.extend(data, {id: id});
            BarnServices.updateBarn(data);
        }
    };

    // remove barn
    $scope.removeBarn = function(index) {
        $scope.barns.splice(index, 1);
    };

    // add barn
    $scope.addBarn = function() {
        $scope.inserted = {
            barn_uid: 'New',
            barn_name: '',
            barn_code: '',
            barn_desc: ''
        };
        $scope.barns.push($scope.inserted);
    };

    $scope.viewBarnComp = function(id) {
      // alert(id);
      $location.path('barn/' + id);
    };

});

app.controller('BarnCompAdminCtrl', function($scope, $http, $log, $location, $routeParams, $uibModal, BarnServices, BarnCompServices) {
    var bid = $routeParams.barn_uid;

    BarnCompServices.getBarnComp(bid).success(function(data) {
        $scope.comps = data;
        console.log($scope.comps);
        $scope.bindMap();
    });

    $scope.bindMap = function() {
        console.log("binding map..");
        var default_option = {
            areas: [
                {
                    // when a computer is full
                    key: '0',
                    fill:true,
                    fillColor: 'DA3418',
                    staticState: true,
                },
                {
                    // when a computer is available
                    key: '1',
                    fill:true,
                    fillColor: '34DA18',
                    staticState: true,
                },
                {
                    key: 'e',
                    fill:true,
                    fillColor: '2A61E6',
                    staticState: true,
                }
            ],
            fill: false,
            fillOpacity: 0.5,
            stroke: true,
            mapKey: 'avail'
        }
        $('#barn-map-admin').mapster(default_option);
    }

    $scope.unbindMap = function() {
        console.log("unbinding map..");
        $('#barn-map-admin').mapster('unbind');
    }

    $scope.updateMap = function() {
        console.log("updating map..");
        $scope.unbindMap();
        setTimeout(function(){
            $scope.bindMap();
        },2000);

    }

    $scope.onClickMap = function(event) {
        console.log(event.offsetX + " " + event.offsetY);
    }

    // avail status select
    $scope.avail_statuses = [
        {value: 0, text: 'Unavailable'},
        {value: 1, text: 'Available'}
    ];

    // add computer
    $scope.addComp = function() {
        $scope.inserted = {
            comp_uid: 'New',
            barn_uid: bid,
            barn_name: '',
            barn_code: '',
            barn_desc: ''
        };
        $scope.comps.push($scope.inserted);
    };

    // update/create comp
    $scope.saveComp = function(data, comp) {
        var id = comp.comp_uid,
            x = comp.loc_x,
            y = comp.loc_y,
            r = comp.loc_r;
        if(id == 'New') {
            // append the barn id in the url
            angular.extend(data, {bid: bid});
            BarnCompServices.createBarnComp(data);
            window.location.reload();
        }
        else {
            angular.extend(data, {id: id});
            angular.extend(data, {bid: bid});
            // append the comp which is not in the eform
            angular.extend(data, {x: x});
            angular.extend(data, {y: y});
            angular.extend(data, {r: r});
            BarnCompServices.updateBarnComp(data);
        }
    };

    // remove comp
    $scope.removeComp = function(index, id) {
        if( confirm("Confirm delete?") ){
            BarnCompServices.deleteBarnComp(id);;
            $scope.comps.splice(index, 1);
        }
    };

    // back to barn main page
    $scope.back = function() {
      $location.path('barns');
    }

    // make a copy for comp loc so that it can be restore when cancel
    $scope.copyLoc = function(comp) {
        comp.loc_x_cpy = comp.loc_x;
        comp.loc_y_cpy = comp.loc_y;
        comp.loc_r_cpy = comp.loc_r;
    }

    // restore loc when cancel
    $scope.restoreLoc = function(comp) {
        comp.loc_x = comp.loc_x_cpy;
        comp.loc_y = comp.loc_y_cpy;
        comp.loc_r = comp.loc_r_cpy;
    }

    // MODAL

    // when btn click to open the modal
    $scope.open = function (comp) {
        $log.debug(comp);
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                // pass the comp id to modal instance
                comp: function() {
                    return comp;
                }
            }
        });

        // after the modal instance click ok, pass the loc data back
        modalInstance.result.then(function (canvas) {
            // store back to the modified comp
            comp.loc_x = canvas.x;
            comp.loc_y = canvas.y;
            comp.loc_r = canvas.r;
            $log.info(comp);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

});

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, comp) {
    $scope.comp = comp;
    $scope.canvas = {};
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.ok = function () {
        // pass back the modified coordinate
        if($scope.canvas.r < 0) {
            alert("ERROR: invalid circle")
            return;
        }
        $uibModalInstance.close($scope.canvas);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.onClickMap = function(event) {
        console.log(event.offsetX + " " + event.offsetY);
        var cx = event.offsetX;
        var cy = event.offsetY;
        $scope.comp.loc_x = cx;
        $scope.comp.loc_y = cy;
    }

    // canvas
    $scope.initCanvas = function() {
        // init bg canvas

        var canvas = document.getElementById("bgCanvas");
        var ctx = canvas.getContext("2d");
        var image = document.getElementById("barn");

        image.onload = function() {
            // set the bg canvas dimension to img dimension
            var imgWidth = this.width;
            var imgHeight = this.height;
            ctx.canvas.width  = imgWidth;
            ctx.canvas.height = imgHeight;
            // draw img on canvas
            ctx.drawImage(image, 0, 0);

            initDrawCanvas(imgWidth, imgHeight);
        }
        // drawing layer
        function initDrawCanvas(width, height ) {
            var dCanvas = document.getElementById("drawCanvas");
            var dCtx = dCanvas.getContext("2d");
            // set canvas dimension
            dCtx.canvas.width  = width;
            dCtx.canvas.height = height;
            var w = width,
                h = height,
                x1,                 /// start points
                y1,
                x2,                 /// end points
                y2,
                isDown = false;     /// if mouse button is down

            /// handle mouse down
            dCanvas.onmousedown = function(e) {
                /// get corrected mouse position and store as first point
                var rect = dCanvas.getBoundingClientRect();
                x1 = e.clientX - rect.left;
                y1 = e.clientY - rect.top;
                isDown = true;
                console.log(x1 + " " + y1);
                $scope.canvas.x = x1;
                $scope.canvas.y = y1;
            }

            /// clear isDown flag to stop drawing
            dCanvas.onmouseup = function() {
                isDown = false;
                var radius = x2-x1;
                console.log(radius);
                $scope.canvas.r = radius;
                $scope.$digest();   // important: update the update the scope var
            }

            /// draw ellipse from start point
            dCanvas.onmousemove = function(e) {

                if (!isDown) return;

                var rect = dCanvas.getBoundingClientRect();
                x2 = e.clientX - rect.left,
                y2 = e.clientY - rect.top;

                /// clear canvas
                dCtx.clearRect(0, 0, w, h);

                /// draw ellipse
                drawEllipse(x1, y1, x2, y2);
            }

            function drawEllipse(x1, y1, x2, y2) {
                var radiusX = (x2 - x1),   /// radius for x based on input
                    radiusY = radiusX,   /// radius for y based on input
                    centerX = x1,      /// calc center
                    centerY = y1,
                    step = 0.01,                 /// resolution of ellipse
                    a = step,                    /// counter
                    pi2 = Math.PI * 2 - step;    /// end angle

                //var radiusX = (x2 - x1) * 0.5,   /// radius for x based on input
                //    radiusY = (y2 - y1) * 0.5,   /// radius for y based on input
                //    centerX = x1 + radiusX,      /// calc center
                //    centerY = y1 + radiusY,

                /// start a new path
                dCtx.beginPath();

                /// set start point at angle 0
                dCtx.moveTo(centerX + radiusX * Math.cos(0),
                    centerY + radiusY * Math.sin(0));

                /// create the ellipse
                for(; a < pi2; a += step) {
                    dCtx.lineTo(centerX + radiusX * Math.cos(a),
                        centerY + radiusY * Math.sin(a));
                }

                /// close it and stroke it for demo
                dCtx.closePath();
                dCtx.strokeStyle = '#F00';
                dCtx.stroke();
            }
        }
    }




});

/*
 ====================
 SERVICES
 ====================
 */
app.service('compLocServices', function() {
    var stringValue = 'test string value';
    var objectValue = {
        data: 'test object value'
    };
    var locObj = {
        loc_x : 0,
        loc_y : 0,
        loc_r : 0
    }


    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getLocObj: function() {
            return locObj;
        },
        setLocObj: function(obj) {
            locObj = obj;
        }
    }
});


/*
 ====================
 FACTORIES
 ====================
 */
app.factory('BarnServices', function($http){
    //alert(base_url+"api/barns");
    return {
        getBarn:function(id) {
            return $http.get(base_url+"api/barn", {
                params: {id: id}
            });
        },
        getBarns: function() {
            return $http.get(base_url+"api/barns");
        },
        updateBarn: function(data) {
            return $http.post(base_url+'api/updateBarn', data);
        },
        createBarn: function(data) {
            return $http.post(base_url+'api/createBarn', data);
        }
    };
});

app.factory('BarnCompServices', function($http){
    return {
        getBarnComp:function(bid) {
            return $http.get(base_url+"api/comp", {
                params: {bid: bid}
            });
        },
        updateBarnComp: function(data) {
            return $http.post(base_url+'api/updateComp', data);
        },
        createBarnComp: function(data) {
            return $http.post(base_url+'api/createComp', data);
        },
        deleteBarnComp: function(id) {
            var data = {id: id}
            return $http.post(base_url+'api/deleteComp', data);
        }

    };
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
