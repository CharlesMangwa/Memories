 (function ($){

    /**
     * Shapes Plugin
     * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
     * HETIC P2019
     *
     * Copyright 2015
     * Released under the MIT license
     * http://opensource.org/licenses/MIT
     *b
     * Date : 2015-04-14
     */


    $.fn.shapes = function(options){
        
        
        /**
         * Import and initialize the constructor
         * 
         */
                
        // Import the constructor
        var Constructor = require('./constructor.js');
        var Shapes = new Constructor();
        Shapes.init($(this), options);
        Shapes.run();

        /* ------------------------------------- */
        
        
        
        
        
        /**
         * Import and initialize the gameplay
         * 
         */
                
        // Import the constructor
        var Gameplay = require('./gameplay.js');
        var Gameplay = new Gameplay();
        Gameplay.init($(this), Shapes.getOptions());
        Gameplay.run();
        
        /* ------------------------------------- */
     
        
        
    };

    module.exports = $.fn.shapes;

 }(jQuery));