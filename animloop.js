(function(window) {
    var animObjects = [],
        stopAnimation,
        started;
    
    // Paul Irish's helper function for requestAnimationFrame
    // see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
    
    function addObject(animObj) {
        var idx = animObjects.push(animObj) - 1;
        animObj.init && animObj.init();
        animObj.idx = idx;
        
        if (! started) {
            loop();
            started = true;
        }
        
        return idx;
    }
    
    function removeObject(idx) {
        if (idx.idx) {
            idx = idx.idx;
        }
        
        animObjects[idx] = null;
        
        // compute if we should stop animation
    }
    
    function execute(functionName) {
        var i = -1, l = animObjects.length, current;
        
        while (++i < l) {
            current = animObjects[i];
            if (current && current[functionName]) {
                current[functionName]();
            }
        }
    }
    
    function update() {
        execute("update");
    }
    function render() {
        execute("render");
    }
    
    function loop() {
        if (stopAnimation) {
            started = stopAnimation = false;
            return;
        }
        
        requestAnimFrame(loop);
        update();
        render();
    }
    
    window.anim = {
        add: addObject,
        remove: removeObject
    };
    
})(this);
