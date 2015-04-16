(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
 /**
  * Labyrinth Plugin - Constructor Module
  * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
  * HETIC P2019
  *
  * Copyright 2015
  * Released under the MIT license
  * http://opensource.org/licenses/MIT
  *
  * Date of creative : 2015-04-14
  */


 var Constructor = function(){
     
     
     /**
      * Variables
      *
      */
     
     this.$canvas = $('.labyrinth__canvas')[0];
     this.canvas = this.$canvas.getContext('2d');
     
     this.rows;
     this.cols;
     
     this.cells = [];
     this.currentCell;
     this.startingCell = '0_0';
     this.endingCell = false;
     
     this.level = 1;
     
     this.sizeCell = 20;
     this.borderWidth = 4;
     this.borderColor = '#00';
     
     this.cache = [];
     this.count = 0;
     this.indexGoBack = 0;

     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the labyrinth
      * @params : the sizeCell of the labyrinth 
      *
      */
     
     this.init = function(grid, sizeCell, borderColorCell, level){
         
         // Initialize options of labyrinth
         if(borderColorCell){
            this.borderColor = borderColorCell;
         }
         if(sizeCell){
            this.sizeCell = sizeCell;
         }
         if(level == 1 && this.level == 2){
             this.level = level;
         }
         
         // Initialize the array  
         if(grid){
             this.rows = grid;
             this.cols = grid;
         }
         for(var col = 0; col < this.cols; col++){
             this.cells[col] = [];
             for (var row = 0; row < this.rows; row++) {
                 this.cells[col][row] = '1111'; // State of each cell at the beginning
             }
         }
         
         // Initialize the dimensions of the canvas  
         $('.labyrinth__canvas').prop({
             width: this.sizeCell * this.cols + 5,
             height: this.sizeCell * this.rows + 5,
         });

         // Draw the labyrinth
         var c = this.canvas;
         for(col = 0; col < this.cols; col++){
             for(row = 0; row < this.rows; row++){
                 c.lineWidth = this.borderWidth;
                 c.strokeStyle = this.borderColor;
                 c.strokeRect(row * this.sizeCell + 2, col * this.sizeCell + 2, this.sizeCell, this.sizeCell);
             }
         }
         
         // Choose the starting point
         this.startingCell = Math.floor(Math.random() * this.rows) + '_' + Math.floor(Math.random() * this.cols);
         
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Build the labyrinth
      *
      */
     
     this.build = function(){
         
         // Take the position of the starting point
         var index = this.startingCell.lastIndexOf('_');
         var x = this.startingCell.substr(0, index);
         var y = this.startingCell.substring(index + 1);
         this.cache.push(x + '_' + y);
         
         // Begin with the first cell
         this.jump(x, y);
         
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Jump to an another cell to transpierce a door by recursion
      * @params : the coordinates of the current cell
      * 
      */
     
     this.jump = function (x, y) {
         
         // ParseInt the coordinates 
         x = parseInt(x);
         y = parseInt(y);

         // Find cells around the current cell
         var cellsAround = [];
         for(var z = 1; z < 5; z++){
             switch (z) {
             case 1:
                 if(this.check(x, (y - 1))){ //
                     cellsAround.push(x + '_' + (y - 1));
                 }
                 break;
             case 2:
                 if(this.check(x, (y + 1))){
                     cellsAround.push(x + '_' + (y + 1));
                 }
                 break;
             case 3:
                 if(this.check((x - 1), y)){
                     cellsAround.push((x - 1) + '_' + y);
                 }
                 break;

             case 4:
                 if(this.check((x + 1), y)) {
                     cellsAround.push((x + 1) + '_' + y);
                 }
                 break;
             }
         }

         // If there are no new cells around
         if(cellsAround.length == 0){
             
             // Create the ending point if it has not been created before
             if(!this.endingCell && this.level == 1){
                 this.endingCell = this.currentCell;
             }

             // Come back
             if(this.currentCell != this.startingCell){
                 this.goBack();
             }
         }
         
         // Else we jump to an another cell   
         else{
             this.count++;
             
             // Randomly, we select an another cell
             var nextCell = cellsAround[Math.floor(Math.random() * cellsAround.length)];
             
             // Move to this new cell
             this.currentCell = nextCell;
             
             // Transpierce a door
             this.transpierce((x + '_' + y), nextCell);
             
             // Save the passage on this cell 
             this.cache.push(x + '_' + y);
             this.indexGoBack = this.count - 1;
             
             // Jump by recursion to an another cell
             this.jump(nextCell.substr(0, nextCell.lastIndexOf('_')), nextCell.substring(nextCell.lastIndexOf('_') + 1));
         }
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Check if a cell has been visited before
      * @params : the coordinates of the testing cell
      * 
      */
     
     this.check = function(x, y){
            
         // We are on the border
         if(x == -1 || y == -1 || x == this.cols || y == this.rows){
             return false;
         }
         
         // The cell has been visited before
         else if(this.cells[x][y].substring(0, 1) == 'c') {
             return false;
         }
         
         // Else it's correct !
         else{
             return true;
         }

     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Change the state of a cell
      * @params : the current state of the cell and the direction to transpierce
      * @return : new state of cell
      * 
      */
     
     this.setState = function (state, direction) {

         // Delete the letter c
         if(state.substring(0, 1) == 'c'){
             state = state.substring(1);
         }
         
         // 1111 => top, right, bottom and left
         var position = [];
         position['top'] = 1;
         position['right'] = 2;
         position['bottom'] = 3;
         position['left'] = 4;

         // Create the new state
         var stateBefore = state.substr(0, position[direction] - 1);
         var stateAfter = state.substring(position[direction]);
         var state = stateBefore + '0' + stateAfter;

         return state;
         
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Transpierce a door
      * @params : the coordinates of 2 points
      * 
      */
     
     this.transpierce = function(point1, point2){

         // Extract the coordinates of each points
         p1Index = point1.lastIndexOf('_');
         p2Index = point2.lastIndexOf('_');
         p1 = [];
         p2 = [];
         p1['x'] = parseInt(point1.substr(0, p1Index));
         p2['x'] = parseInt(point2.substr(0, p2Index))
         p1['y'] = parseInt(point1.substring(p1Index + 1));
         p2['y'] = parseInt(point2.substring(p2Index + 1));

         // Initialize the coordonate of the door to break
         var x = p1['x'] * this.sizeCell + this.borderWidth;
         var y = p1['y'] * this.sizeCell + this.borderWidth;

         // Establish the position of the door to break
         if (p1['x'] == p2['x']) {
             if (p2['y'] < p1['y']) { // Top
                 p1Direction = 'top';
                 p2Direction = 'bottom';
                 y -= (this.sizeCell / 2);
             }
             else{ // Bottom
                 p1Direction = 'bottom';
                 p2Direction = 'top';
                 y += (this.sizeCell / 2);
             }
         } else {
             if(p2['x'] < p1['x']){ // Left
                 p1Direction = 'left';
                 p2Direction = 'right';
                 x -= (this.sizeCell / 2);
             }
             else{ // Right
                 p1Direction = 'right';
                 p2Direction = 'left';
                 x += (this.sizeCell / 2);
             }
         }

         // Change the state of cells
         this.cells[p1['x']][p1['y']] = 'c' + this.setState(this.cells[p1['x']][p1['y']], p1Direction);
         this.cells[p2['x']][p2['y']] = 'c' + this.setState(this.cells[p2['x']][p2['y']], p2Direction);

         // Break the door
         this.canvas.clearRect(x, y, this.sizeCell - (this.borderWidth), this.sizeCell - (this.borderWidth));
         
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Go back to find a new cell and create the ending cell
      * 
      */
     
     this.goBack = function(){
         
         // If we are not come back at the starting point
         if(!this.indexGoBack == 0){
             
             // Take the index of our course
             this.indexGoBack = this.indexGoBack - 1;
             
             // Establish the coordonate of the next cell to visit
             var cell = this.cache[this.indexGoBack];
             var index = cell.lastIndexOf('_');
             var x = cell.substr(0, index);
             var y = cell.substring(index + 1);
             
             // Jump to this cell
             this.jump(x, y);
             
         }  
         
         else{
             if(this.level == 2 || this.level==3){
                 this.endingCell = this.cache[this.cache.length - 1];
             }
             
             // Create the ending cell
             var c = this.canvas;
             c.fillStyle = 'rgb(250, 250, 250)';
             c.fillRect(this.endingCell.substr(0, this.endingCell.lastIndexOf('_')) * this.sizeCell + 2 + (this.sizeCell - 10) / 2, this.endingCell.substring(this.endingCell.lastIndexOf('_') + 1) * this.sizeCell + 2 + (this.sizeCell - 10) / 2, 10, 10);
         }
         
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Get informations about the labyrinth for the gameplay module
      * 
      */
     
     this.getInformations = function(){
         
         var informations = {
             'startingCell' : this.startingCell,
             'endingCell' : this.endingCell,
             'cells' : this.cells,
             'sizeCell' : this.sizeCell,
             'borderWidthCell' : this.borderWidth,
         }
         
         return informations;
         
     }
     

     
     
     /* ------------------------------------- */
     
     
 }

 module.exports = Constructor;
},{}],2:[function(require,module,exports){
 /**
  * Labyrinth Plugin - Gameplay Module
  * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
  * HETIC P2019
  *
  * Copyright 2015
  * Released under the MIT license
  * http://opensource.org/licenses/MIT
  *
  * Date of creative : 2015-04-14
  */

 var Gameplay = function(){
     
     
     /**
      * Variables
      *
      */
     
     this.$player;
     this.sizePlayer;
     this.sizeCell;
     this.startingCell;
     this.currentCell;
     this.endingCell;
     this.cells;
     this.level = 1;
     this.$cache = false;

     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the player
      * @params : the element, the size and options of the labyrinth
      *
      */
     
     this.init = function(element, size, options, level, cache){
         
         this.$player = element;
         this.sizePlayer = size;
         this.sizeCell = options['sizeCell'];
         this.startingCell = options['startingCell'];
         this.endingCell = options['endingCell'];
         this.cells = options['cells'];
         this.currentCell = this.startingCell;
         this.level = level;
         
         var index = this.startingCell.lastIndexOf('_');
         var x = this.startingCell.substr(0, index);
         var y = this.startingCell.substring(index + 1);
         
         var addPixels = (options['borderWidthCell']) + ((parseInt(this.sizeCell)) - parseInt(this.sizePlayer)) / 2;
          
         this.$player.css({
            left : Math.floor((x * this.sizeCell + addPixels)) - 1 + 'px',
            top : Math.floor((y * this.sizeCell + addPixels)) - 1 + 'px'
         });
         
         if(cache && this.level ==3){
            this.$cache = cache;   
             
            this.$cache.css({
                left : ((Math.floor((x * this.sizeCell + addPixels)) - 1) - (this.$cache.width() / 2)) + 'px',
                top : ((Math.floor((y * this.sizeCell + addPixels)) - 1) - (this.$cache.height() / 2)) + 'px'
            });
         }
         
         
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Mode the player
      * @params : event of keydown 
      *
      */
     
     this.move = function(e){
         
        // Establish the state of the current cell
        var index = this.currentCell.lastIndexOf('_');
        var x = parseInt(this.currentCell.substr(0, index));
        var y = parseInt(this.currentCell.substring(index + 1));
        var state = this.cells[x][y].substring(1);
        
        // Initial position of the player 
        var top = parseInt(this.$player.css('top'));
        var left = parseInt(this.$player.css('left'));
        
        // Move the player by keypress
        if(e.keyCode == 38){ //Top
            if(state.substring(0,1) == 0){
                top -= this.sizeCell;
                y = (y - 1);
            }
        }
        else if(e.keyCode == 39){ // Right
            if(state.substring(1,2) == 0){
                left += this.sizeCell;
                x = (x + 1);
            }
        }
        else if(e.keyCode == 40){ // Bottom
            if(state.substring(2,3) == 0){
                top += this.sizeCell;
                y = (y + 1);
            }
        }
        else if(e.keyCode == 37){ // Left
            if(state.substring(3,4) == 0){
                left -= this.sizeCell;
                x = (x - 1);
            }
        }
         
        // Set the new current cell
        this.currentCell = parseInt(x) + '_' + parseInt(y);
         
        // Mode on the canvas the player
        this.$player.css({
            top : top + 'px',
            left : left + 'px'
        });
         
         
         if(this.level == 3){
            this.$cache.css({
                left : (left - (this.$cache.width() / 2)) + 'px',
                top : (top - (this.$cache.height() / 2)) + 'px'
            });
         }
         
        // Check if the player has winned
        if(this.win()){
            $('.labyrinth__timer').removeClass('labyrinth__timer').addClass('labyrinth__message').text('Gagné !');
            if(this.level == 3){
                this.$cache.remove();
            }
        }
     }

     
     
     /* ------------------------------------- */
     
     

     /**
      * Check if the player has winned
      * @return true if the player has winned, else false
      *
      */
     
     this.win = function(){
         
         // Check if the currentCell is the same that the ending Cell
         if(this.currentCell == this.endingCell){
            return true;
         }
         return false;
    
     }
     
     
     
     /* ------------------------------------- */
     
     
     
 }
 
 module.exports = Gameplay;
},{}],3:[function(require,module,exports){
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
},{"./constructor.js":1,"./gameplay.js":2}],4:[function(require,module,exports){
 /**
  * Shapes Plugin - Constructor Module
  * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
  * HETIC P2019
  *
  * Copyright 2015
  * Released under the MIT license
  * http://opensource.org/licenses/MIT
  *
  * Date of creative : 2015-04-14
  */


 var Constructor = function(){
     
     
     /**
      * Variables
      *
      */
     
     this.$container;
     this.color = '#000';
     this.shapes = [];
     this.vectors = [];
     this.radiusMagnetism;
     
     
     
     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the constructor
      *
      */
     
     this.init = function(container, options){
        
         this.$container = container;
        
         if(options['color']){
             this.color = options['color'];
         }
         
         if(options['radiusMagnetism']){
             this.radiusMagnetism = options['radiusMagnetism'];
         }
    
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Run the constructor
      *
      */
     
     this.run = function(){
         
         this.createShape();
         this.cutShape();
         
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Create the main shape
      *
      */
     
     this.createShape = function(){
         
         this.$container.append('<svg class="Shapes__main" data-id="0" height="180" width="180"><polygon fill="' + this.color + '" points="60 180, 180 120, 120 0, 0 60"/></svg>');
         this.$container.css('height', (parseInt(this.$container.css('height')) + 130 ));
         
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Cut the shap
      *
      */
     
     this.cutShape = function(){
         
         // Create shapes
         this.$container.find('.Shapes__main').remove();
         this.$container.append('<div class="Shapes__cut"><svg class="Shape__cut" height="180" width="180"><polygon fill="' + this.color + '" points="0 60, 180 120, 60 180"/></svg><svg class="Shape__cut" data-id="0" height="180" width="180"><polygon fill="' + this.color + '" points="0 60, 120 0, 180 120"/></svg></div>');
          
         // Save each shape in tab
         var shapes = this.shapes;
         
         $('.Shape__cut').each(function(index){
             shapes[index] = [];
             shapes[index]['points'] = $(this).find('polygon').attr('points').split(', ');
             shapes[index]['coordinates'] = $(this).offset().left + ';' + $(this).offset().top;
             shapes[index]['position'] = $(this).offset().left + ';' + $(this).offset().top;
         });
         
         this.shapes = shapes;
         
         console.log(shapes);
          
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Get options
      *
      */
     
     this.getOptions = function(){
         
         var options = [];
         options['$shapes'] = $('.Shape__cut');
         options['shapes'] = this.shapes;
         options['radiusMagnetism'] = this.radiusMagnetism;
         
         return options;
         
     }
     
     

     
     
     /* ------------------------------------- */
     
     
 }

 module.exports = Constructor;
},{}],5:[function(require,module,exports){
 /**
  * Shapes Plugin - Gameplay Module
  * By Charles MANGWA, Clément VION, Aymeric CHAPPUY, Alexandre DALLOT and Léo LE BRAS
  * HETIC P2019
  *
  * Copyright 2015
  * Released under the MIT license
  * http://opensource.org/licenses/MIT
  *
  * Date of creative : 2015-04-16
  */


 var Constructor = function(){
     
     
     /**
      * Variables
      *
      */
     
     this.$container;
     this.$shapes;
     this.shapes;
     this.vectors;
     this.radiusMagnetism = 40;
     
     
     
     
     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the gameplay
      *
      */
     
     this.init = function(element, options){
        
         this.$container = element;
         this.$shapes = options['$shapes'];
         this.shapes = options['shapes'];
         this.vectors = options['vectors'];
         
         if(options['radiusMagnetism']){
            this.radiusMagnetism = options['radiusMagnetism'];
         }
         
         
     }
     
     

     /**
      * Run the gameplay
      *
      */
     
     this.run = function(){
         
         var $shapes = this.$shapes;
         var shapes = this.shapes;
         var radiusMagnetism = this.radiusMagnetism;
         var x;
         var y;
         var coordinates;
         var position;
         
          
         this.$shapes.draggable({
            containment : this.$container,
            drag : function(){
                
                // Change coordonates of element on dragging
                position = shapes[$(this).index()]['position'];
                x = parseInt(position.substring(0,position.lastIndexOf(';')));
                y = parseInt(position.substring(position.lastIndexOf(';') + 1));
                x = (x + parseInt($(this).css('left')));
                y = (y + parseInt($(this).css('top')));
                coordinates = x + ';' + y;
                shapes[$(this).index()]['coordinates'] = coordinates;
                
                // Check the position of all other shapes
                for(var i in shapes){
                    if(i != $(this).index()){
                        shape1 = coordinates;
                        shape2 = shapes[i]['coordinates'];
                        x1 = parseInt(shape1.substring(0,shape1.lastIndexOf(';')));
                        y1 = parseInt(shape1.substring(shape1.lastIndexOf(';') + 1));
                        x2 = parseInt(shape2.substring(0,shape2.lastIndexOf(';')));
                        y2 = parseInt(shape2.substring(shape2.lastIndexOf(';') + 1));
                        
                        // Create the magnetism effect between element if two shapes are nearby
                        if(Math.abs(x2 - x1) < parseInt(radiusMagnetism) && Math.abs(y2 - y1) < parseInt(radiusMagnetism)){
                            $(this).draggable('destroy'); 
                            
                            shape1 = $(this).index();
                            shape2 = i;
                            
                            $(this).animate({
                                top : parseInt($(this).css('top')) + (y2 - y1),
                                left : parseInt($(this).css('left')) + (x2 - x1),
                            },{
                                duration : 150,
                                complete : function(){
                                    
                                    // Gather the two elements
                                    $(this).css('opacity', 0);
                                    
                                    var cache = [];
                                    for(var z=0; z < 2;z++){
                                        
                                        var index = shape1;
                                        if(z == 1){
                                            index = shape2;
                                        }
                                        for(var y in shapes[index]['points']){
                                            if(cache[shapes[index]['points'][y]]){
                                                cache[shapes[index]['points'][y]]++;
                                            }
                                            else{
                                                cache[shapes[index]['points'][y]] = 0;   
                                            }
                                        }
                                    }
                                    
                                    var points = '';
                                    var cacheCount = 0;
                                    
                                    for(var w in cache){
                                        cacheCount++;
                                        points = points + w;
                                    }
                                    console.log(points);
                                }
                            });
                        }
                    }
                }
            }
         });
     }
     
     

     
     
     /* ------------------------------------- */
     
     
 }

 module.exports = Constructor;
},{}],6:[function(require,module,exports){
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
},{"./constructor.js":4,"./gameplay.js":5}],7:[function(require,module,exports){
 
 /**
  * Import dependencies
  *
  */

 var labyrinth = require('./Labyrinth/index.js');
 var shapes = require('./Shapes/index.js');


 
},{"./Labyrinth/index.js":3,"./Shapes/index.js":6}]},{},[7])