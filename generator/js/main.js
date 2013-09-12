  //==================================//
 // global variables
//==================================//
//find out supported file type
if (Modernizr.audio.mp3) {
    //have to use mp3 as default because safari states it has OGG support when it does not     
    var extension = '.mp3';
} else if (Modernizr.audio.ogg) {
    //ogg fallback 
    var extension = '.ogg';
}

//main audio context to plug into
var context;
var drumproperties = {};

// tempo variables
var bpm = 120;
var beat = (60 / bpm); //beats per second in milliseconds

// note lengths
var sixteenbars  = beat * 64, //16 bars
    eightbars    = beat * 32, //8 bars
    fourbars     = beat * 16, //4 bars
    triplewhole  = beat * 12, //3 bars
    doublewhole  = beat * 8, //2 bars
    whole        = beat * 4, //1 bar
    half         = beat * 2,
    quarter      = beat,
    eighth       = beat / 2,
    sixteenth    = beat / 4,
    thirtysecond = beat / 8,
    wholecut     = beat * 3.75,
    halfcut      = beat * 1.75,
    quartercut   = beat * 0.75,
    cutrest      = beat * 0.25;

//instrument variables
var drumproperties = {}, synthproperties = {}, transitionproperties = {}, miscproperties = {};
var kicksource = null, snaresource = null, hatsource = null, synthonesource = null, synthtwosource = null, synththreesource = null, synthfoursource = null, buildsource = null, ambiencesource = null, transitionsource = null;
var kick = null, snare = null, hat = null, synthone = null, synthtwo = null, synththree = null, synthfour = null, build = null, ambience = null, transition = null;

  //==================================//
 // Setup
//==================================//
window.onload = init;

function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) { alert('Web Audio API is not supported in this browser'); }
    preloaddrums();
}

  //==================================//
 // Main code
//==================================//
setTimeout(function() {
    phrase();
}, half * 1000);

    function phrase(){ //8 bars

        loaddrums();
        maindrums();
        setTimeout(function() {
            maindrums();
        }, half * 1000);
        setTimeout(function() {
            maindrums();
        }, whole * 1000);
        setTimeout(function() {
            secondarydrums();
        }, half * 3000);

        setTimeout(function() {
            maindrums();
            //choose drum samples and patterns ahead of time
            preloaddrums();
        }, doublewhole * 1000);
        setTimeout(function() {
            maindrums();
        }, (doublewhole + half) * 1000);
        setTimeout(function() {
            maindrums();
        }, triplewhole * 1000);
        setTimeout(function() {
            secondarydrums();
        }, (triplewhole + half) * 1000);

                setTimeout(function() {
                    loaddrums();
                    maindrums();
                }, fourbars * 1000);
                setTimeout(function() {
                    maindrums();
                }, (fourbars + half) * 1000);
                setTimeout(function() {
                    maindrums();
                }, (fourbars + whole) * 1000);
                setTimeout(function() {
                    secondarydrums();
                }, (fourbars + half*3) * 1000);

                setTimeout(function() {
                    //main synth secondary
                    maindrums();
                    //choose drum samples and patterns ahead of time
                    preloaddrums();
                }, (fourbars + doublewhole) * 1000);
                setTimeout(function() {
                    maindrums();
                }, (fourbars + doublewhole + half) * 1000);
                setTimeout(function() {
                    maindrums();
                }, (fourbars + triplewhole) * 1000);
                setTimeout(function() {
                    //if transition = bridge, or something, then no secondarydrums
                    secondarydrums();
                }, (fourbars + triplewhole + half) * 1000);
        //run again
        setTimeout(function() {
            phrase();
        }, eightbars * 1000);

    }



  //==================================//
 // Drums
//==================================//
function preloaddrums() {
    preloadSound(kicksample[getRandomInt(0, kicklength)] + extension, "kicksource");
    preloadSound(snaresample[getRandomInt(0, snarelength)] + extension, "snaresource");
    preloadSound(hatsample[getRandomInt(0, hatlength)] + extension, "hatsource");
    var chosendrumlibrary = drumlibraries[getRandomInt(0, drumlibrarieslength)];
    //main pattern (bar 1-3)
    drumproperties.chosenmaindrums = chosendrumlibrary[0];
    //secondary pattern (bar 4) - chosen from 3 at random
    drumproperties.chosensecondarydrums = chosendrumlibrary[getRandomInt(1, 3)];
}

function loaddrums(){
    loadSound("kick", "kicksource");
    loadSound("snare", "snaresource");
    loadSound("hat", "hatsource");
    //main pattern (bar 1-3)
    window.maindrums = drumproperties.chosenmaindrums;
    //secondary pattern (bar 4) - chosen from 3 at random
    window.secondarydrums = drumproperties.chosensecondarydrums;
}

  //==================================//
 // Synths
//==================================//

  //==================================//
 // Transitions
//==================================//

  //==================================//
 // Note Functions
//==================================//

  //==================================//
 // Play Functions
//==================================//

function preloadSound(url, sourceName) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = function() {
        // Asynchronously decode the audio file data
        context.decodeAudioData(
            request.response,
            function(buffer) {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                }
                window[sourceName] = buffer;
            },
            function(error) {
                console.error('decodeAudioData error', error);
            }
        );
    }
    request.onerror = function() {
        console.log('error loading file data: ' + url);
    }
    request.send();
}

function loadSound(sourceSound, sourceName) {
    window[sourceSound] = window[sourceName];
    console.log(window[sourceName]);
}

function note(sourceSound, sourceSound2, time, callback) {
    // Create source
    var source = context.createBufferSource();
    source.buffer = window[sourceSound];
    // Connect source to main audio context
    source.connect(context.destination);
    // Play source sound
    source.currentTime = 0;
    source.start(window.context.currentTime + time);
    if (sourceSound2 !== 0){
        // Create source
        var source2 = context.createBufferSource();
        source2.buffer = window[sourceSound2];
        // Connect source to main audio context
        source2.connect(context.destination);
        // Play source sound
        source2.currentTime = 0;
        source2.start(window.context.currentTime + time);
    }
}


