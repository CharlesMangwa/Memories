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
  * Update : 2015-04-14
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

     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the player
      * @params : the element, the size and options of the labyrinth
      *
      */
     
     this.init = function(element, size, options){
         
         this.$player = element;
         this.sizePlayer = size;
         this.sizeCell = options['sizeCell'];
         this.startingCell = options['startingCell'];
         this.endingCell = options['endingCell'];
         this.cells = options['cells'];
         this.currentCell = this.startingCell;
         
         var index = this.startingCell.lastIndexOf('_');
         var x = this.startingCell.substr(0, index);
         var y = this.startingCell.substring(index + 1);
         
         var addPixels = (options['borderWidthCell']) + ((parseInt(this.sizeCell)) - parseInt(this.sizePlayer)) / 2;
          
         this.$player.css({
            left : Math.floor((x * this.sizeCell + addPixels)) - 1 + 'px',
            top : Math.floor((y * this.sizeCell + addPixels)) - 1 + 'px'
         });
         
         
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
         
        // Check if the player has winned
        if(this.win()){
            console.log('Win !!');
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
     

     
     
     /* ------------------------------------- */
     
     
    }
 }
 
 module.exports = Gameplay;