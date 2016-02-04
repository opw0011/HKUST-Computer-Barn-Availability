
var resizeTime = 200;     // total duration of the resize effect, 0 is instant
var resizeDelay = 500;    // time to wait before checking the window size again
                          // the shorter the time, the more reactive it will be.
                          // short or 0 times could cause problems with old browsers.
                          

// Resize the map to fit within the boundaries provided

function resize(maxWidth,maxHeight) {
     var image =  $('img'),
        imgWidth = image.width(),
        imgHeight = image.height(),
        newWidth=0,
        newHeight=0;

    if (imgWidth/maxWidth>imgHeight/maxHeight) {
        newWidth = maxWidth;
    } else {
        newHeight = maxHeight;
    }
    image.mapster('resize',newWidth,newHeight,resizeTime);   
}

// Track window resizing events, but only actually call the map resize when the
// window isn't being resized any more

function onWindowResize() {
    
    var curWidth = $(window).width(),
        curHeight = $(window).height(),
        checking=false;
    if (checking) {
        return;
            }
    checking = true;
    window.setTimeout(function() {
        var newWidth = $(window).width(),
           newHeight = $(window).height();
        if (newWidth === curWidth &&
            newHeight === curHeight) {
            resize(newWidth,newHeight); 
        }
        checking=false;
    },resizeDelay );
}

$(window).bind('resize',onWindowResize);