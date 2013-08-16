  //==================================//
 // global variables
//==================================//
//find out supported file type
if (Modernizr.audio.mp3){
    //have to use mp3 as default because safari states it has OGG support when it does not     
    extension = '.mp3';
} else if (Modernizr.audio.ogg){
    //ogg fallback 
    extension = '.ogg';
}

//main audio context to plug into
var context;
var drumproperties = {};

// tempo variables
var bpm = 120;
var beat = (60/bpm)*1000; //beats per second in milliseconds

// note lengths
var sixteenbars  = beat * 64, //16 bars
    eightbars    = beat * 32, //8 bars
    fourbars     = beat * 16, //4 bars
    triplewhole  = beat * 12, //3 bars
    doublewhole  = beat * 8, //2 bars
    whole        = beat * 4, //1 bar
    half         = beat * 2,
    quarter      = beat ,
    eighth       = beat / 2,
    sixteenth    = beat / 4,
    thirtysecond = beat / 8,
    wholecut     = beat * 3.75,
    halfcut      = beat * 1.75,
    quartercut   = beat * 0.75,
    cutrest      = beat * 0.25;

//instrument variables
var drumproperties = {}, synthproperties = {}, transitionproperties = {}, miscproperties = {};
var kicksource = null, snaresource = null, hatsource = null, synthonesource = null, synthtwosource = null, synththreesource = null,synthfoursource = null,buildsource = null,ambiencesource = null,transitionsource = null;
var kick = null, snare = null, hat = null, synthone = null, synthtwo = null, synththree = null,synthfour = null,build = null,ambience = null,transition = null;

  //==================================//
 // Setup
//==================================//
window.onload = init;

function init() {
    try {
        // Fix up for prefixing
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        context = new AudioContext();
    }
    catch(e) {
        alert('Web Audio API is not supported in this browser');
    }
    preloaddrums();
}

  //==================================//
 // Main code
//==================================//
setTimeout(function(){
    phrase();
}, half);

    function phrase(){ //8 bars

        loaddrums();
        maindrums();
        setTimeout(function(){
            maindrums();
        }, half);
        setTimeout(function(){
            maindrums();
        }, whole);
        setTimeout(function(){
            secondarydrums();
        }, half*3);

        setTimeout(function(){
            maindrums();
            //choose drum samples and patterns ahead of time
            preloaddrums();
        }, doublewhole);
        setTimeout(function(){
            maindrums();
        }, doublewhole + half);
        setTimeout(function(){
            maindrums();
        }, triplewhole);
        setTimeout(function(){
            secondarydrums();
        }, triplewhole + half);

                setTimeout(function(){
                    loaddrums();
                    maindrums();
                }, fourbars);
                setTimeout(function(){
                    maindrums();
                }, fourbars + half);
                setTimeout(function(){
                    maindrums();
                }, fourbars + whole);
                setTimeout(function(){
                    secondarydrums();
                }, fourbars + half*3);

                setTimeout(function(){
                    //main synth secondary
                    maindrums();
                    //choose drum samples and patterns ahead of time
                    preloaddrums();
                }, fourbars + doublewhole);
                setTimeout(function(){
                    maindrums();
                }, fourbars + doublewhole + half);
                setTimeout(function(){
                    maindrums();
                }, fourbars + triplewhole);
                setTimeout(function(){
                    //if transition = bridge, or something, then no secondarydrums
                    secondarydrums();
                }, fourbars + triplewhole + half);
        //run again
        setTimeout(function(){
            phrase();
        }, eightbars);

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
}

function note(sourceSound, sourceSound2, length, callback) {
    //call next sound
    if (callback) {  
        setTimeout(function(){
            callback();
        },length); 
    } 
    // Create source
    var source = context.createBufferSource();
    source.buffer = window[sourceSound];
    // Connect source to main audio context
    source.connect(context.destination);
    // Play source sound
    source.currentTime = 0;
    source.start(0);
    if (sourceSound2 !== 0){
        // Create source
        var source2 = context.createBufferSource();
        source2.buffer = window[sourceSound2];
        // Connect source to main audio context
        source2.connect(context.destination);
        // Play source sound
        source2.currentTime = 0;
        source2.start(0);
    }
}


