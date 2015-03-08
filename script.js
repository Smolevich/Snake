tbl="";
currentCell="";
var endGame;
var GameField;
var tableSize=0;
var currentDir;
var currentOrient;
var isTurned;
var cellsTurn=[];
fireCellX=0;
fireCellY=0;
var nodeTurn={}
var snake;
var arrayCells=[];
while(tableSize==0){
var userEnteredDigit=prompt("Введите размер игрового поля");
tableSize=parseInt(userEnteredDigit,10);
}

function generate_table(){
tbl="";
var body=document.getElementsByTagName("body")[0];

var table     = document.createElement("table");
var tableBody = document.createElement("tbody");
	for (var j = 0; j < tableSize; j++){
	    // Создать строку
	    var row = document.createElement("tr");

	    for (var i = 0; i < tableSize; i++) {
	        var cell = document.createElement("td");
	        var cellText = document.createTextNode("");
	        
	        cell.setAttribute("onClick","getCell(this)");
	        var cellText = document.createTextNode("");

	        cell.appendChild(cellText);
	        row.appendChild(cell);
	    }	    
	    tableBody.appendChild(row);
	}
	table.setAttribute("border", "2");
	table.appendChild(tableBody);
	body.appendChild(table);
	tbl=document.getElementsByTagName("table");
	initFireCell();
	currentCell=tbl[0].rows[0].cells[0];
	Snakes.headSnake=currentCell;
	Snakes.tailSnake=currentCell;
	Snakes.addnode(cell);
	currentCell.style.background = 'blue';
}

function initFireCell(){
fireCellX=Math.floor(Math.random(tableSize)*10);
fireCellY=Math.floor(Math.random(tableSize)*10);
if (tbl!=null){
cell=tbl[0].rows[fireCellX].cells[fireCellY];
cell.style.background ="red";
}

}
var Snakes={
	 headSnake:{},
	 tailSnake:{},
	 nodeSnake:[],
	 addnode:function(cell){
	 	this.nodeSnake[this.nodeSnake.length]=cell;
	 }
}
//если змея увеличивается
 function snake(cell,row,col,dir) {
  var newheadSnake=tbl[0].rows[row].cells[col];
  if (row==fireCellX && col==fireCellY){
  	switch(dir){
	  	 case 'up':
	        headSnake=tbl[0].rows[row-1].cells[col];
	     break;
	     case 'down':
	        headSnake=tbl[0].rows[row+1].cells[col]; 
	     break;
	     case 'right':
	        headSnake=tbl[0].rows[row].cells[col+1];
	     break;
	     case 'left':
	        headSnake=tbl[0].rows[row].cells[col-1];
	     break;
	     	
  	}
  	        currentCell.style.background='#f0f0f0';
  	        headSnake.style.background = 'blue';
  	        Snakes.addnode(newheadSnake);
	     	moveSnake(headSnake,true); 
	     	initFireCell();
  }else{
	  //движение змеи
	  moveSnake(newheadSnake,false);
  	  
  }
}


 
function moveSnake(newheadSnake,isFood){
	if (!isFood){
		Snakes.addnode(newheadSnake);
		console.log('Перемещение головы змеи');
		Snakes.headSnake=newheadSnake;
		var deletedCell=Snakes.tailSnake;
		Snakes.nodeSnake.splice(0,1);
		Snakes.tailSnake=Snakes.nodeSnake[0]
		deletedCell.style.background='#f0f0f0';
    }else{
    	Snakes.nodeSnake[0].style.background='#f0f0f0';
    	Snakes.nodeSnake.splice(0,1);
    	Snakes.addnode(newheadSnake);
	    Snakes.headSnake=newheadSnake;
	    Snakes.tailSnake=Snakes.nodeSnake[0];
    }

	for(var j=0;j<Snakes.nodeSnake.length;j++){
	  cellY=Snakes.nodeSnake[j].cellIndex;
	  cellX=gtRw(Snakes.nodeSnake[j], cellY);
	  console.log('X:'+cellX+'Y: '+cellX);
	  cell=tbl[0].rows[cellX].cells[cellY];
	  cell.style.background = 'blue';  
	}
	currentCell=Snakes.headSnake;
}


function gtRw(cll, c) {
	 for (i = 0; i < tableSize; i++){
		  rw = tbl[0].rows[i];
		  if (rw.cells[c] == cll) return i;
	 }
 }

function getCell(row,col){
	return tbl[0].rows[row].cells[col];
}

document.onkeydown=function(e){
        if (!endGame){
         e = e || event;
	        switch (event.keyCode){
	            case 38:                
	                move('up');
	                break;
	            case 40:              
	                move('down');
	                break;
	            case 37:
	                move('left');
	                break;
	            case 39:
	                move('right');
	                break;
	        }
    	}
    }

document.onload=function(){

}

function move(dir){
	if (arrayCells.length>1){
	currentCell=arrayCells[arrayCells.length-1];
	}
	switch (dir)
        {
            case 'up':
            	if (currentDir!='down'){
                c=currentCell.cellIndex;
                r=gtRw(currentCell,c)
	                if (CheckCell(r-1,c)){
	                	snake(currentCell,r-1,c,dir)
	                	currentDir='up';
	                	console.log('move up');
	                }
                }
                break;
            case 'down':
            	if (currentDir!='up'){
	                c=currentCell.cellIndex;
	                r=gtRw(currentCell,c)
	                if (CheckCell(r+1,c)){
	                	console.log('move down');
	                	currentDir='down';
                	snake(currentCell,r+1,c,dir)
                	}
            	}
                break;
             case 'right':

                if (currentDir!='left'){
                c=currentCell.cellIndex;
                r=gtRw(currentCell,c)
	                if (CheckCell(r,c+1)){
	                console.log('move right');
	                currentDir='right';
	                snake(currentCell,r,c+1,dir)
	                }
                }
                break;
              case 'left':
                if (currentDir!='right'){
                c=currentCell.cellIndex;
                r=gtRw(currentCell,c)
	                if (CheckCell(r,c-1)){
	                snake(currentCell,r,c-1,dir);
	                console.log('move left');
	                currentDir='left';
	                }
	             } 
                break;
            default:
                throw Error('WTF?');
        }



}


function CheckCell(r,c){
   if (r == -1 || c == -1 || r == tableSize || c == tableSize){
   		return false
   }else{
   	return true;
   }



}