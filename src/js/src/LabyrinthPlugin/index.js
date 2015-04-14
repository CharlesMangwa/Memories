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
        
        // We construct the labyrinth
        $(this).prepend('<canvas class="labyrinth__canvas" width="200" height="200"></canvas>');
        var Constructor = require('./constructor.js');
        var Labyrinth = new Constructor();
        Labyrinth.init(options['size']);
        Labyrinth.build();
        
        // Start the gameplau
        
        
         // this.$container.append('<svg height="100" width="100"><circle cx="' + startPointX * this.size + '" cy="' + startPointY * this.size + '" r="' + this.sizeUser / 2 + '" fill="red" /></svg>');
    };

    module.exports = $.fn.labyrinth;

 }(jQuery));