<!DOCTYPE html>
<html lang="" ng-app="barnApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Platform</title>
    <base href="<?php echo base_url() ?>">

    <!-- Bootstrap CSS -->
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body >

<!-- navbar start -->

<!-- navbar end -->

<!-- main-container start -->
<div ng-view></div>
<!-- main-container end -->


<script type="text/javascript">
    var base_url = "<?php echo base_url() ?>";
//    var barn_id = "<?//=$barn_id?>//";
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
<!-- stacktable.js -->
<!--<script src="--><?php //echo base_url('assets/js/lib/stacktable.js') ?><!--"></script>-->
<!-- imageMapResizer -->
<!--<script src="--><?php //echo base_url('assets/js/lib/imageMapResizer.min.js') ?><!--"></script>-->
<!-- qtip -->
<script src="<?php echo base_url('assets/js/lib/jquery.qtip.min.js') ?>"></script>
<!-- map highlight -->
<script src="<?php echo base_url('assets/js/lib/jquery.imagemapster.min.js') ?>"></script>

<script src="<?php echo base_url('assets/js/main.js') ?>"></script>
<script src="<?php echo base_url('assets/js/mapResize.js') ?>"></script>

<!--xeditable-->
<script src="<?php echo base_url('assets/js/lib/xeditable.min.js') ?>"></script>
<link rel="stylesheet" href="<?php echo base_url('assets/css/xeditable.css') ?>">

<!--ng-route-->
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular-route.js"></script>
</body>
</html>
