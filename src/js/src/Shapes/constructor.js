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