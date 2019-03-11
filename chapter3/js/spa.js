/*
 * spa.js
 * root namespace module
 * 
 */

var spa = (function() {
    var initModule = function($container) {
        spa.shell.initModule($container);
    };

    return { initModule: initModule };
})();

/*
var spa2 = (function() {
    var initModule = function($container) {
        var btn = document.createElement('button');
        var toggleBackColor = true;
        btn.appendChild(document.createTextNode('colorChange'));
        $container.appendChild(btn);
        btn.style.background = 'lightgray';
        btn.style.padding = '10px';
        btn.style.borderRadius = '10px';
        btn.onmouseover = function(e) {
            var target = e.target;
            target.style.backgroundColor = 'gray';
            e.stopPropagation();
        };
        btn.onmouseout = function(e) {
            var target = e.target;
            target.style.backgroundColor = 'lightgray';
            e.stopPropagation();
        };
        btn.onclick = function(e) {
            if (toggleBackColor) {
                $container.style.backgroundColor = 'rgb(100%, 30.8%, 85.2%)';
                $container.style.color = 'rgb(100%, 50.8%, 90%)';
                toggleBackColor = false;
                console.log(toggleBackColor);
            } else {
                $container.style.backgroundColor = '#fff';
                $container.style.color = '#444';
                toggleBackColor = true;
                console.log(toggleBackColor);
            }
        };
    };

    return {initModule: initModule};
})()
*/