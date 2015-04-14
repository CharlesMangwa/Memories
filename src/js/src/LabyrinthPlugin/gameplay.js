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
     
     this.$player;
     this.sizePlayer;
     this.sizeCell;
     this.startingCell;
     this.currentCell;
     this.endingCell;
     this.cells;
     
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
         
         var addPixels = (parseInt(this.sizeCell) - parseInt(this.sizePlayer)) / 2;
         
         this.$player.css({
            left : Math.floor((x * this.sizeCell + addPixels)) - 1 + 'px',
            top : Math.floor((y * this.sizeCell + addPixels)) - 1 + 'px'
         });
         
         
     }
     
     this.move = function(e){
         
        var index = this.currentCell.lastIndexOf('_');
        var x = this.currentCell.substr(0, index);
        var y = this.currentCell.substring(index + 1);
        
        var state = this.cells[x][y].substring(1);
        console.log(state);
         
        var top = parseInt(this.$player.css('top'));
        var left = parseInt(this.$player.css('left'));
        this.sizeCell = parseInt(this.sizeCell);
        
        if(e.keyCode == 38){ //Top
            if(state.substring(0,1) == 0){
                top -= this.sizeCell;
                y -= 1;
            }
        }

        else if(e.keyCode == 39){ // Right
            if(state.substring(1,2) == 0){
                left += this.sizeCell;
                x += 1;
            }
        }
        
        else if(e.keyCode == 40){ // Bottom
            if(state.substring(2,3) == 0){
                top += this.sizeCell;
                y += 1;
            }
        }
        
        else if(e.keyCode == 37){ // Left
            if(state.substring(3,4) == 0){
                left -= this.sizeCell;
                x -= 1;
            }
        }
         
        this.currentCell = x + '_' + y;
         
        this.$player.css({
            top : top + 'px',
            left : left + 'px'
        });
         
     }
     
     
     
 }
 
 module.exports = Gameplay;