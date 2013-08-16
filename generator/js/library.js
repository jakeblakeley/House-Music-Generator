  //==================================//
 // Samples
//==================================//
//kicks
var kicksample  		=	["samples/kicks/bouncy",
				  			"samples/kicks/dancekick",
				  			"samples/kicks/dancekick2",
				  			"samples/kicks/dirty",
				  			"samples/kicks/kick",
				  			"samples/kicks/quick",
				  			"samples/kicks/simple",
				  			"samples/kicks/subtleanddeep",
				 			"samples/kicks/trance"];
var kicklength = (kicksample.length)-1;

//snare
var snaresample 		=	["samples/snares/airy", 
							"samples/snares/attack",
							"samples/snares/clap",
							"samples/snares/full",
							"samples/snares/mediumclap",
							"samples/snares/noise",
							"samples/snares/quick",
							"samples/snares/reverb",
							"samples/snares/smallclap",
							"samples/snares/smallsnare",
				 			"samples/snares/snare",
				 			"samples/snares/snare2",
				 			"samples/snares/snare3"];
var snarelength = (snaresample.length)-1;

//hat
var hatsample  		    =	["samples/hats/airy", 
							"samples/hats/noise", 
							"samples/hats/simple", 
							"samples/hats/tiny", 
							"samples/hats/wide"];
var hatlength = (hatsample.length)-1;

/*//single instrument synth
var singlesynthsample  =	["samples/singlesynth/", 
				 			"samples/singlesynth/",
				 			"samples/singlesynth/"];

//high synth
var highsynthsample    =	["samples/highsynth/", 
				 			"samples/highsynth/",
				 			"samples/highsynth/"];  
//mid-high synth
var midhighsynthsample =	["samples/midhighsynth/", 
				 			"samples/midhighsynth/",
				 			"samples/midhighsynth/"];  
//mid synth
var midsynthsample     =	["samples/midsynth/", 
				 			"samples/midsynth/",
				 			"samples/midsynth/"];  
//mid-low synth
var midlowsynthsample  =	["samples/midlowsynth/", 
				 			"samples/midlowsynth/",
				 			"samples/midlowsynth/"];  
//low synth
var lowsynthsample     =	["samples/lowsynth/", 
				 			"samples/lowsynth/",
				 			"samples/lowsynth/"];  

//transitions
var transitionssample  =	["samples/transition/", 
				 			"samples/transition/",
				 			"samples/transition/"];  

//noise
var noisesample        =	["samples/noise/", 
				 			"samples/noise/",
				 			"samples/noise/"];  

//ambience
var ambiencesample     =	["samples/ambience/", 
				 			"samples/ambience/",
				 			"samples/ambience/"]; */ 

  //==================================//
 // Library Arrays to call pattern functions
//==================================//
//drums, first is main pattern (bar 1-3), second is secondary pattern (bar 4)
var drumlibraries = [[dance1, dance1, dance1b2, dance1b3], 
					[dance1, dance1, dance1b2, dance1b3], 
					[dance2, dance2b1, dance2b2, dance2b3], 
					[tech1, tech1b1, tech1b2, tech1b3], 
					[tech2, tech2b1, tech2b2, tech2b3], 
					[tech3, tech3b1, tech3b2, tech3b3]];
var drumlibrarieslength = (drumlibraries.length)-1;


  //==================================//
 // Functions for patterns
//==================================//
//4 spaces = quarter note

//=== Drums ===//
//dance1
function dance1(){
	note("kick", 0, quarter, function() {
		note("kick", 0, quarter, function() {
		});
	});
}
	function dance1b2(){
		note("kick", 0, sixteenth*3, function() {
		   note("kick", 0, sixteenth*3, function() {
		   	 note("kick", 0, eighth, function() {
		     });
		   });
		});
	}
	function dance1b3(){
		note("kick", 0, quarter, function() {
			note("kick", 0, eighth, function() {
			  note("kick", 0, eighth, function() {
			  });
			});
		});
	}

//dance2
function dance2(){
	note("kick", 0, quarter, function() {
		note("kick", "snare", quarter, function() {
			//
		});
	});
}
	function dance2b1(){
		note("kick", 0, quarter, function() {
			note("kick", "snare", sixteenth, function() {
			  note("snare", 0, sixteenth, function() {
				//
			  });
			});
		});
	}
	function dance2b2(){
		note("kick", 0, sixteenth*3, function() {
		   note("snare", 0, sixteenth, function() {
			note("kick", "snare", eighth, function() {
			  note("snare", 0, sixteenth, function() {
			   note("snare", 0, sixteenth, function() {
				//
		       });
		      });
		    });
		   });
		});
	}
	function dance2b3(){
		note("kick", 0, eighth, function() {
		  note("snare", 0, eighth, function() {
		  	note("kick", "snare", eighth, function() {
		  	  note("snare", 0, sixteenth, function() {
		  	   note("snare", 0, sixteenth, function() {
		  	  	//
		       });
		      });
		    });
		  });
		});
	}

//tech1
function tech1(){
	note("kick", 0, eighth, function() {
	  note("hat", 0, eighth, function() {
		note("kick", "snare", eighth, function() {
		  note("hat", 0, eighth, function() {
			//
		  });
		});
	  });
	});
}
	function tech1b1(){
		note("kick", 0, sixteenth, function() {
		 note("hat", 0, eighth, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", "snare", sixteenth, function() {
			 note("hat", 0, sixteenth, function() {
			  note("hat", 0, sixteenth, function() {
			   note("hat", 0, sixteenth, function() {
				//
			   });
			  });
			 });
			});
		   });
		 });
		});
	}
	function tech1b2(){
		note("kick", 0, eighth, function() {
		  note("hat", 0, eighth, function() {
			note("kick", "snare", sixteenth, function() {
			 note("hat", 0, sixteenth, function() {
			  note("snare", 0, sixteenth, function() {
			   note("hat", 0, sixteenth, function() {
				//
			   });
			  });
			 });
			});
		  });
		});
	}
	function tech1b3(){
		note("kick", 0, eighth, function() {
		  note("hat", 0, eighth, function() {
			note("kick", "snare", eighth, function() {
			  note("hat", 0, eighth, function() {
			  });
			});
		  });
		});
	}

//tech2
function tech2(){
	note("kick", 0, sixteenth*3, function() {
	   note("hat", 0, sixteenth, function() {
		note("kick", 0, eighth, function() {
		   note("hat", 0, eighth, function() {
		   });
		});
	   });
	});
}
	function tech2b1(){
		note("kick", 0, eighth, function() {
		  note("hat", 0, eighth, function() {
			note("kick", 0, sixteenth, function() {
			 note("hat", 0, sixteenth, function() {
			  note("hat", 0, sixteenth, function() {
			   note("hat", 0, sixteenth, function() {
				//
			   });
			  });
			 });
			});
		   });
		});
	}
	function tech2b2(){
		note("kick", 0, sixteenth*3, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", 0, eighth, function() {
			  note("hat", 0, sixteenth, function() {
			   note("hat", 0, sixteenth, function() {
				//
			   });
			  });
			});
		   });
		});
	}
	function tech2b3(){
		note("kick", 0, sixteenth*3, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", 0, eighth, function() {
			   note("kick", "hat", eighth, function() {
			   });
			});
		   });
		});
	}

//tech3
function tech3(){
	note("kick", 0, sixteenth, function() {
	 note("hat", 0, sixteenth, function() {
	  note("hat", 0, sixteenth, function() {
	   note("hat", 0, sixteenth, function() {
		note("kick", "snare", sixteenth, function() {
		 note("hat", 0, sixteenth, function() {
		  note("hat", 0, sixteenth, function() {
		   note("hat", 0, sixteenth, function() {
		   	//
		   });
	      });	
	     });	
	    });	
	   });	
	  });	
	 });
	});	
}
	function tech3b1(){
		note("kick", 0, sixteenth, function() {
		 note("hat", 0, sixteenth, function() {
		  note("hat", 0, sixteenth, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", "snare", sixteenth, function() {
			 note("hat", 0, sixteenth, function() {
			  note("snare", "hat", sixteenth, function() {
			   note("hat", 0, sixteenth, function() {
			   	//
			   });
		      });	
		     });	
		    });	
		   });	
		  });	
		 });
		});	
	}
	function tech3b2(){
		note("kick", 0, sixteenth, function() {
		 note("hat", 0, sixteenth, function() {
		  note("hat", 0, sixteenth, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", "snare", sixteenth, function() {
			 note("hat", 0, sixteenth, function() {
			  note("snare", "hat", sixteenth, function() {
			   note("snare", "hat", sixteenth, function() {
			   	//
			   });
		      });	
		     });	
		    });	
		   });	
		  });	
		 });
		});	
	}
	function tech3b3(){
		note("kick", 0, sixteenth, function() {
		 note("hat", 0, sixteenth, function() {
		  note("hat", 0, sixteenth, function() {
		   note("hat", 0, sixteenth, function() {
			note("kick", "snare", eighth, function() {
			  note("snare", "hat", eighth, function() {
				//
		      });		
		    });	
		   });	
		  });	
		 });
		});	
	}



