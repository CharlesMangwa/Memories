
var Labyrinth = function(){
    
    this.$canvas = $('.labyrinth__canvas')[0];
    this.canvas = this.$canvas.getContext('2d');
    this.currentCell;
    this.cells = [];
    this.rows = 0;
    this.cols = 0;
    this.startPoint = '0_0';
    this.size = 30;
    this.borderWidth = 4;
    this.cache = [];
    this.count = 0;
    
     /**
      * Init the labyrinth
      * 1. Init the tab
      * 2. Create the starter point 
      *
      * @return this.cells, this.startPoint
      */
    
    this.init = function(rows, cols){
        
        
        // Init the tab  
        
        this.rows = rows;
        this.cols = cols;
        
        for(var col = 0; col < this.cols; col++){ 
            this.cells[col] = [];
            
            for(var row = 0; row < this.rows; row++){
                this.cells[col][row] = '1111';
            }    
        }
        
        
        // Init the canvas
        
        $('.labyrinth__canvas').prop({
            width: this.size * this.cols + 5,
            height: this.size * this.rows + 5,
        });
        
        
        
        // Draw the labyrinth
        
        var c = this.canvas;
        
        for(col = 0; col < this.cols; col++){ 
            for(row = 0; row < this.rows; row++){
                c.lineWidth = this.borderWidth;
                c.strokeRect(row * this.size + 2, col * this.size + 2, this.size,this.size);
            }    
        }
        
        
        // Random the start point
        
        var startPointX = Math.floor(Math.random() * this.rows);
        var startPointY = Math.floor(Math.random() * this.cols);
        this.startPoint = startPointX + '_' + startPointY;
        
        c.fillStyle = 'green';
        c.fillRect(startPointX * this.size + 2 + (this.size - 10) / 2, startPointY * this.size + 2 + (this.size - 10) / 2, 10, 10);
        c.fill();
        
    }
    
    this.start = function(){
        
        var index = this.startPoint.lastIndexOf('_');
        var x = this.startPoint.substr(0,index);
        var y = this.startPoint.substring(index + 1);
        
        this.jump(x,y);
    }
    
    
    this.jump = function(x, y){
        
        this.count++;
        console.log(this.count);
        
        var cellsAround = [];
        x = parseInt(x);
        y = parseInt(y);
        
        
        for(var z = 1 ; z < 5 ; z++){
            switch(z){
                case 1 :
                    if(this.check(x, (y - 1))){
                        cellsAround.push(x + '_' + (y - 1));
                    }
                    break;
                    
                case 2 :
                    if(this.check(x, (y + 1))){
                        cellsAround.push(x + '_' + (y + 1));
                    }
                    break;
                    
                case 3 :
                    if(this.check((x - 1), y)){
                        cellsAround.push((x - 1) + '_' + y);
                    }
                    break;
                    
                case 4 :
                    if(this.check((x + 1), y)){
                        cellsAround.push((x + 1) + '_' + y);
                    }
                    break;
            }
        }
        
        
        // If there are no non visited cells around the active cell
        if(cellsAround.length == 0){
            console.log('*****************');
            console.log('RETOUR EN ARRIERE');
            console.log('*****************');
            
            console.log(this.currentCell + ' ; ' + this.startPoint);
            
            
            /*var c = this.canvas;
            c.fillStyle = 'blue';
            c.fillRect(this.currentCell.substr(0,this.currentCell.lastIndexOf('_')) * this.size + 2 + (this.size - 10) / 2,                 this.currentCell.substring(this.currentCell.lastIndexOf('_') + 1) * this.size + 2 + (this.size - 10) / 2, 10, 10);*/
        }
        
        else{
            var next = cellsAround[Math.floor(Math.random() * cellsAround.length)];
            console.log('Cellule en cours : ' + x + '_' + y + ' en état ' + this.cells[x][y]);
            console.log('Nombre de cellules autour actives : ' + cellsAround.length);
            console.log('Cellule suivante : ' + next + ' en état ' + this.cells[next.substr(0,next.lastIndexOf('_'))][next.substring(next.lastIndexOf('_') + 1)]);
            this.transpierce((x + '_' + y), next);
            console.log('*****************');
            console.log('*****************');
            this.currentCell = next;
            this.jump(next.substr(0,next.lastIndexOf('_')),next.substring(next.lastIndexOf('_') + 1));
            
        }
        
    }
    

    this.check = function(x,y){

        if(x == -1 || y == -1 || x == this.cols || y == this.rows){
            return false;   
        }
        
        else if(this.cells[x][y].substring(0,1) == 'c'){
            return false;
        }
        
        else{
            return true;   
        }
        
    }
    
    this.setState = function(state, direction){
        
        if(state.substring(0,1) == 'c'){
            state = state.substring(1);   
        }
        
        var position = [];
        position['top'] = 1;
        position['right'] = 2;
        position['bottom'] = 3;
        position['left'] = 4;
        
        var stateBefore = state.substr(0,position[direction] - 1);
        var stateAfter = state.substring(position[direction]);
        
        var state = stateBefore + '0' + stateAfter;
        
        return state;
    }
     
    this.transpierce = function(point1, point2){
        
        // On extrait les coordonnées des points
        
        p1Index = point1.lastIndexOf('_');
        p2Index = point2.lastIndexOf('_');
            
        p1 = [];
        p2 = [];
        
        p1['x'] = parseInt(point1.substr(0,p1Index));
        p2['x'] = parseInt(point2.substr(0,p2Index))
        
        p1['y'] = parseInt(point1.substring(p1Index + 1));
        p2['y'] = parseInt(point2.substring(p2Index + 1));
        
        
        
        
        
        
            
        // On calcule la position du pétage de porte  
            
        var x = p1['x'] * this.size + this.borderWidth;
        var y = p1['y'] * this.size + this.borderWidth;
        
        
        if(p1['x'] == p2['x']){
            if(p2['y'] < p1['y']){
                console.log('On perce en haut');
                
                p1Direction = 'top';
                p2Direction = 'bottom';
                
                y -= (this.size / 2);
            }
            else{
                console.log('On perce en bas');
                
                p1Direction = 'bottom';
                p2Direction = 'top';
                
                
                y += (this.size / 2);
            }
        }
        else{
            if(p2['x'] < p1['x']){
                console.log('On perce à gauche');
                
                p1Direction = 'left';
                p2Direction = 'right';
                
                
                x -= (this.size / 2);
            }
            else{
                console.log('On perce à droite');
                
                p1Direction = 'right';
                p2Direction = 'left';
                
                
                x += (this.size / 2);
            }
        }
        
        
        // On modifie l'état des cellules
        this.cells[p1['x']][p1['y']] = 'c' + this.setState(this.cells[p1['x']][p1['y']],p1Direction);
        this.cells[p2['x']][p2['y']] = 'c' + this.setState(this.cells[p2['x']][p2['y']],p2Direction);
        
        console.log('Nouvel état de la cellule en cours : ' + this.cells[p1['x']][p1['y']]);
        console.log('Nouvel état de la cellule suivante : ' + this.cells[p2['x']][p2['y']]);
        
        
        // On pète la porte
        
        this.canvas.clearRect(x,y,this.size - (this.borderWidth),this.size  - (this.borderWidth));
        
    }
    
    this.goBack = function(){
       
    }
    
}

module.exports = Labyrinth;