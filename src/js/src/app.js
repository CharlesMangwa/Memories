 
 /**
  * Create a labyrinth
  *
  */

 var labyrinth = require('./Labyrinth/index.js');

 $('.labyrinth').labyrinth({
     grid: 15,
     sizeCell: 60,
     borderWidthCell: 4, // TODO
     borderColorCell: '#b45252',
     sizePlayer: 10,
     colorPlayer: '#9d5e82'
 });