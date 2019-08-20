function JVMUserInterface() {
    var obj = this;
    
    obj.initialize = function() {

        $(".nav-tabs a").click(function () {
            $(this).tab('show');
        });
        $('.btn').button();

        // Resizeable dividers.
        obj.horizontalSplit = Split(["#stack-area", "#instruction-area", "#heap-area"], {
            elementStyle: function (dimension, size, gutterSize) {
                $(window).trigger('resize'); // Optional
                return {'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'}
            },
            gutterStyle: function (dimension, gutterSize) {
                return {'flex-basis': gutterSize + 'px'}
            },
            sizes: [20, 60, 20],
            minSize: 50,
            gutterSize: 6,
            direction: 'horizontal',
            cursor: 'row-resize'
        });
        
        obj.verticalSplit = Split(["#instructions", "#output-panel"], {
            elementStyle: function (dimension, size, gutterSize) {
                $(window).trigger('resize'); // Optional
                return {'flex-basis': 'calc(' + size + '% - ' + gutterSize + 'px)'}
            },
            gutterStyle: function (dimension, gutterSize) {
                return {'flex-basis': gutterSize + 'px'}
            },
            sizes: [80, 20],
            minSize: 50,
            gutterSize: 6,
            direction: 'vertical',
            cursor: 'col-resize'
        });  
    };

    return obj;
}

