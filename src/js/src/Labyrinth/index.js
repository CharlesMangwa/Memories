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
        Labyrinth.init(options['grid'], options['sizeCell'], options['borderWidthCell'], options['borderColorCell'], options['level']);
        Labyrinth.build();
     

     

        /* ------------------------------------- */



        /**
         * Import and initialize the gameplay
         * 
         */
        
        // Get options for the gameplay
        var color = options['colorPlayer'];
        var size = options['sizePlayer'];
        var options = Labyrinth.getInformations();
        
        // Create the player element
        $(this).append('<svg class="labyrinth__player" height="' + size + '" width="' + size + '"><circle cy="' + size / 2 + '" cx="' + size / 2 + '" r="' + size / 2  + '" fill="' + color + '" /></svg>');
        $(this).find('.labyrinth__player').css({
            'position' : 'absolute',
            'top' : 0,
            'left' : 0
        });
        
        // Create the player
        var Gameplay = require('./gameplay.js');
        var Gameplay = new Gameplay();
        Gameplay.init($('.labyrinth__player'), size,options);
       
        // On keydown, move the player
        $(document).keydown(function(e){
            Gameplay.move(e);  
        });
        
        
     

        /* ------------------------------------- */
     
        
        
    };

    module.exports = $.fn.labyrinth;

 }(jQuery));