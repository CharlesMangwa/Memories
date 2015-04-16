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
                            $(this).animate({
                                top : parseInt($(this).css('top')) + (y2 - y1),
                                left : parseInt($(this).css('left')) + (x2 - x1),
                            },{
                                duration : 150,
                                complete : function(){
                                    
                                    // Gather the two elements
                                    $(this).css('opacity', 0);
                                    
                                    console.log(shapes[$(this).index()]['points']);
                                    console.log(shapes[i]['points']);
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