 (function ($){

    /**
     * Labyrinth Plugin
     * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
     * HETIC P2019
     *
     * Copyright 2015
     * Released under the MIT license
     * http://opensource.org/licenses/MIT
     *b
     * Date : 2015-04-14
     */


    $.fn.labyrinth = function(options){
        
        
        /**
         * Import and initialize the constructor
         * 
         */
        
        // Create the canvas element
        $(this).prepend('<canvas class="labyrinth__canvas" width="200" height="200"></canvas>');
        $(this).css('position', 'relative');
        
        // Import the constructor
        var Constructor = require('./constructor.js');
        var Labyrinth = new Constructor();
        
        // Build the labyrinth
        Labyrinth.init(options['grid'], options['sizeCell'], options['borderColorCell'], options['level']);
        Labyrinth.build();
     

     

        /* ------------------------------------- */



        /**
         * Import and initialize the gameplay
         * 
         */
        
        // Get options for the gameplay
        var color = options['colorPlayer'];
        var size = options['sizePlayer'];
        var level = options['level'];
        var options = Labyrinth.getInformations();
        
        // Create the player element
        $(this).append('<svg class="labyrinth__player" height="' + size + '" width="' + size + '"><circle cy="' + size / 2 + '" cx="' + size / 2 + '" r="' + size / 2  + '" fill="' + color + '" stroke="' + $('html').css('backgroundColor') + '"/></svg>');
        $(this).find('.labyrinth__player').css({
            'position' : 'absolute',
            'top' : 0,
            'left' : 0
        });
        
        if(level==3){
            // Create the cache element
            $(this).append('<svg class="labyrinth__cache" height="' + $('.labyrinth__area').width() * 2.6 + '" width="' + $('.labyrinth__area').width() * 2.6 + '"><circle cy="' + $('.labyrinth__area').width() * 1.3 + '" cx="' + $('.labyrinth__area').width() * 1.3 + '" r="' + $('.labyrinth__area').width() * .95  + '" fill="transparent" stroke-width="' + (( (parseInt($('.labyrinth__area').width()) )) + size + options['sizeCell'] * 2) + '" stroke="' + $('html').css('backgroundColor') + '"/></svg>');
            $(this).find('.labyrinth__cache').css({
                'position' : 'absolute',
                'top' : 0,
                'left' : 0
            });
            
        }
        
        // Timer
        $(this).after('<div class="labyrinth__timer">0s</di>');
        
        // Create the player
        var Gameplay = require('./gameplay.js');
        var Gameplay = new Gameplay();
        if(level == 3){
            Gameplay.init($('.labyrinth__player'), size,options, level, $('.labyrinth__cache'));
        }
        else{
            Gameplay.init($('.labyrinth__player'), size,options, level);
        }
       
        // On keydown, move the player and start the timer
        var timer = false;
        
        $(document).keydown(function(e){
            if(!timer){
                timer = 1;
                if(!run){
                    var run = 1;
                }
                $('.labyrinth__timer').text(timer + 's');
                var timerI = setInterval(function(){
                    run++;
                    console.log(run);
                    timer++;
                    $('.labyrinth__timer').text(timer + 's');
                },1000);
            }
            
            if(!Gameplay.win()){
                Gameplay.move(e);  
            }
        });
        
        
        
     

        /* ------------------------------------- */
     
        
        
    };

    module.exports = $.fn.labyrinth;

 }(jQuery));