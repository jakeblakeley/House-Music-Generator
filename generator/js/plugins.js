// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

//more accurate settimeout (compensates for sway via system time)
var start = new Date().getTime(),  
    time = 0,  
    elapsed = '0.0';

function instance(){  
    time += 100;  
    elapsed = Math.floor(time / 100) / 10;  
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }  
    var diff = (new Date().getTime() - start) - time;  
    window.setTimeout(instance, (100 - diff));  
}  
window.setTimeout(instance, 100); 

//more accurate setinterval
window.setInterval(function(){
    var time = new Date().getTime() - start;
    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }
}, 100);

//random bumber between range
function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

