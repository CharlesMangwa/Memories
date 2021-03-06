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
         if(level == 1 || level == 2 || level == 3){
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