  //==================================//
 // global variables and setup
//==================================//
//globals to attach instrument properties to
var drumproperties = {}, synthproperties = {}, transitionproperties = {}, miscproperties = {};
//instruments
var kick = new Audio(), snare = new Audio(), hat = new Audio(), synthone = new Audio(), synthtwo = new Audio(), synththree = new Audio(),synthfour = new Audio(),build = new Audio(),ambience = new Audio(),transition = new Audio();

//find out supported file type
if (Modernizr.audio.mp3){
	//have to use mp3 as default because safari states it has OGG support when it does not     
	extension 		= '.mp3';
} else if (Modernizr.audio.ogg){
	//ogg fallback 
	extension 		= '.ogg';
}

// tempo variables
var bpm = 120;
var beat = (60/bpm)*1000; //beats per second in milliseconds

// note lengths
var sixteenbars  = beat * 64, //16 bars
	eightbars	 = beat * 32, //8 bars
	fourbars	 = beat * 16, //4 bars
	triplewhole  = beat * 12, //3 bars
	doublewhole  = beat * 8, //2 bars
	whole        = beat * 4, //1 bar
	half         = beat * 2,
	quarter      = beat ,
	eighth       = beat / 2,
	sixteenth    = beat / 4,
	thirtysecond = beat / 8,
	wholecut     = beat * 3.75,
	halfcut		 = beat * 1.75,
	quartercut	 = beat * 0.75,
	cutrest		 = beat * 0.25;


  //==================================//
 // Main code
//==================================//
//load initial patterns and samples
setTimeout(function(){
	choosedrumsamples();
	choosedrumpatterns();
	phrase();
}, quarter);

//main timing and execution of patterns

	function phrase(){ //8 bars

		//ambience
		//main synth
		loaddrumsamples();
		loaddrumpatterns();
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
			//main synth secondary
			maindrums();
			//choose drum samples and patterns ahead of time
			choosedrumsamples();
			choosedrumpatterns();
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
					//ambience if only 8 bars
					loaddrumpatterns();
					loaddrumsamples();
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
					choosedrumsamples();
					choosedrumpatterns();
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
//choose pattern for drums
function choosedrumpatterns(){
	var chosendrumlibrary = drumlibraries[getRandomInt(0, drumlibrarieslength)];
	//main pattern (bar 1-3)
	drumproperties.chosenmaindrums = chosendrumlibrary[0];
	//secondary pattern (bar 4) - chosen from 3 at random
	drumproperties.chosensecondarydrums = chosendrumlibrary[getRandomInt(1, 3)];
}
//load patterns for the samples, and store as global vars
function loaddrumpatterns(){
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

//play the defined note, and for how long
function note(instrument, instrument2, length, callback){
	//call next sound
	setTimeout(function(){
		callback();
	},length);
	//stop sound so no overlap by changing source
	instrument.pause();
	instrument.src = instrument.src;
	//play the sound
	instrument.play();
	if (instrument2 !== 0){
		instrument2.pause();
		instrument2.src = instrument2.src;
		instrument2.play();
	}
}

//rest and what instrument to stop
function rest(instrument, length, callback){
	//call next sound
	setTimeout(function(){
		callback();
	},length);
	//stop last played sound
	instrument.pause();
	instrument.src = instrument.src;
}



