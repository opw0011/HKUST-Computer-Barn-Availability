var app = angular.module('barnAppAdmin', ['ui.bootstrap','barnNameFilters', 'xeditable', 'ngRoute', 'googlechart', 'ngCookies']);


// xeditable config
app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
});

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: base_url+'assets/templates/admin_login.html',
            controller: 'AdminLoginCtrl'
        }).
        when('/barns', {
            templateUrl: base_url+'assets/templates/barn_admin.html',
            controller: 'BarnAdminCtrl'
        }).
        when('/map/:barn_uid', {
            templateUrl: base_url+'assets/templates/barn_map.html',
            controller: 'BarnMapCtrl'
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

app.controller('AdminLoginCtrl', function($scope, $http, $location, $routeParams, LoginServices, $cookies){
    console.log("inside AdminLoginCtrl");

    $scope.submit = function(){
        //alert('h');
        LoginServices.login($scope.username, $scope.password).success(function(response) {
            console.log(response);
            if(response.login == 'success') {
                $location.path('/barns');
                $cookies.put('loggedIn', 'true');
            }
            else {
                alert("Wrong Password or username");
                $cookies.put('loggedIn', 'false');
            }
        });
    }


});

app.controller('BarnMapCtrl', function($scope, $http, $location, $routeParams, BarnCompServices, BarnServices){
    console.log("inside BarnMapCtrl");
    var bid = $routeParams.barn_uid;

    BarnCompServices.getBarnComp(bid).success(function(data) {
        $scope.comps = data;
        console.log($scope.comps);
    });

    BarnServices.getBarn(bid).success(function(data) {
        $scope.barn = data[0];
        console.log($scope.barn);
    });
});

app.controller('BarnAdminCtrl', function($scope, $http, $location, BarnServices, $cookies) {
    //login verify
    if($cookies.get('loggedIn') != 'true') {
        $location.path('/');
        return;
    }

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

app.controller('BarnCompAdminCtrl', function($scope, $http, $log, $location, $routeParams, $uibModal, BarnServices, BarnCompServices, $cookies) {
    //login verify
    if($cookies.get('loggedIn') != 'true') {
        $location.path('/');
        return;
    }

    var bid = $routeParams.barn_uid;

    // get barn data
    BarnServices.getBarn(bid).success(function(data) {
        $scope.barn = data[0];
        console.log($scope.barn);
    });

    // get barn comp data
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
            // append the comp which is not in the eform
            angular.extend(data, {x: x});
            angular.extend(data, {y: y});
            angular.extend(data, {r: r});
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
                },
                barn: function() {
                    return $scope.barn;
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

app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,$routeParams, comp, barn) {
    $scope.barn = barn;
    $scope.comp = comp;
    $scope.canvas = {};

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
                var radiusX = Math.abs(x2 - x1),   /// radius for x based on input
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

                // console.log("drawing %d %s %d %d", centerX, centerY, radiusX, radiusY);

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

            $scope.updateCircleWithValue = function() {
                var x = parseInt($scope.canvas.x, 10)
                var y = parseInt($scope.canvas.y, 10);
                var r = parseInt($scope.canvas.r, 10);


                var rect = dCanvas.getBoundingClientRect();
                // x1 = e.clientX - rect.left;
                // y1 = e.clientY - rect.top;

                //x = x - rect.left,
                //    y = y- rect.top;

                /// clear canvas
                dCtx.clearRect(0, 0, w, h);
                // console.log("Update using value: " + x + ' ' + y + ' ' + r);

                /// draw ellipse
                drawEllipse(x, y, x+r, y+r);

            }
        }
    }
});

/*
 ====================
 SERVICES
 ====================
 */

app.service('loggedInStatus', function () {
    var loggedIn = '';
    return {
        getStatus: function () {
            return loggedIn;
        },
        setStatus: function (value) {
            loggedIn = value;
        }
    };
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

app.factory('LoginServices', function($http){
    return {
        login:function(username, password) {
            var data = {id:username, password: password}
            return $http.post(base_url+'api/auth', data);
        },


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


app.directive('ngMapster', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {
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

            setTimeout(function(){
                console.log("mapster directive is called");
                $(element).mapster(default_option);
            },1500);

        }
    };
});

app.directive('ngDataQtip', function() {
    return {
        // Restrict it to be an attribute in this case
        restrict: 'A',
        // responsible for registering DOM listeners as well as updating the DOM
        link: function(scope, element, attrs) {

            setTimeout(function(){
                console.log("qtip directive is called");
                $(element).qtip({
                    content: {
                         text: attrs.ngDataQtip
                        //attr: 'data-qtip'
                    },
                    position: {
                        my: 'top left',
                        at: 'bottom right'
                    }
                });
            },1500);

        }
    };
});

