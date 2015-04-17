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
     this.model;
     this.models = [];
     this.modelsType = [];
     
     
     
     
     
     /* ------------------------------------- */
     
     

     /**
      * Initialize the constructor
      *
      */
     
     this.init = function(container, options){
         
         // Initialize params
         this.$container = container;
         if(options['color']){
             this.color = options['color'];
         if(options['radiusMagnetism']){
         }
             this.radiusMagnetism = options['radiusMagnetism'];
         }
         
         // Fix height of container
         this.$container.css('height', (parseInt(this.$container.css('height')) + 230 ) + 'px');
         
         // Create some models
         // Square #1
         this.modelsType[0] = 'square';
         this.models[0] = [];
         this.models[0][0] = '0 60, 180 120, 60 180';
         this.models[0][1] = '0 60, 120 0, 180 120';
         // Octagon #1
         this.modelsType[1] = 'octagon';
         this.models[1] = [];
         this.models[1][0] = '120 0, 180 60, 180 120, 100 80';
         this.models[1][1] = '0 60, 60 0, 120 0, 100 80, 0 120'
         this.models[1][2] = '100 80, 180 120, 120 180, 60 180, 0 120';
         // Octagon #1
         this.modelsType[2] = 'hexagon';
         this.models[2] = [];
         this.models[2][0] = '80 40, 160 80, 100 160, 60 160';
         this.models[2][1] = '80 40, 60 0, 100 0, 160 80';
         this.models[2][2] = '80 40, 60 160, 0 80, 60 0';
         // Pentagon #1
         this.modelsType[3] = 'pentagon';
         this.models[3] = [];
         this.models[3][0] = '0 80, 60 80, 100 160, 60 160';
         this.models[3][1] = '80 0, 100 40, 60 80, 0 80';
         this.models[3][2] = '80 0, 160 80, 100 160, 60 80, 100 40';
         
         //this.model = Math.floor(Math.random() * this.models.length);
         this.model = 3;
         
         
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
         
         // TODO
         
     }
     

     
     
     /* ------------------------------------- */
     
     

     /**
      * Cut the shap
      *
      */
     
     this.cutShape = function(){
         
         // Create shapes
         this.$container.find('.Shapes__main').remove();
         this.$container.append('<div class="Shapes__cut" style="height:' +  this.$container.css('height') + '">');
                                
         for(var i=0 in this.models[this.model]){
             $('.Shapes__cut').append('<svg class="Shape__cut" height="180" width="180"><polygon fill="' + this.color + '" points="' + this.models[this.model][i]  + '"/></svg>');
         }

         // Save each shape in tab
         var shapes = this.shapes;
         
         $('.Shape__cut').each(function(index){
             $(this).css({
                'left': 0,
                'top': 0,
             });
             shapes[index] = [];
             shapes[index]['points'] = $(this).find('polygon').attr('points').split(', ');
             shapes[index]['coordinates'] = $(this).offset().left + ';' + $(this).offset().top;
             shapes[index]['position'] = $(this).offset().left + ';' + $(this).offset().top;
         });
         
         // Save shapes
         this.shapes = shapes;
         
          
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