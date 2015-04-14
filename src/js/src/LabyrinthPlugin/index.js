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
        
        $(this).prepend('<canvas class="labyrinth__canvas" width="200" height="200"></canvas>');
        $(this).css('position', 'relative');
        
        var Constructor = require('./constructor.js');
        var Labyrinth = new Constructor();
        
        Labyrinth.init(options['size']);
        Labyrinth.build();
     

     

        /* ------------------------------------- */



        /**
         * Import and initialize the gameplay
         * 
         */
     
        var options = Labyrinth.getInformations();
        var size = options['sizeCell'] * .25;
            
        $(this).append('<svg class="labyrinth__player" height="' + size * 2 + '" width="' + size * 2 + '"><circle cy="' + size + '" cx="' + size + '" r="' + size + '" fill="red" /></svg>');
        $(this).find('.labyrinth__player').css({
            'position' : 'absolute',
            'top' : 0,
            'left' : 0
        });
        
        var Gameplay = require('./gameplay.js');
        var Gameplay = new Gameplay();
        
        Gameplay.init($('.labyrinth__player'), size, options);
     
        $(document).keydown(function(e){
            Gameplay.move(e);  
        });
        
        
     

        /* ------------------------------------- */
     
        
        
    };

    module.exports = $.fn.labyrinth;

 }(jQuery));