$(document).ready(function() {
    //by default draw grid of size 20*20 if user doesn't select the size of grid
    var rowsData=table(20);
    var delay=$("#delayOptions").val();    //delay between iterations 
    var previousState=[];                  //array to save previous iterations
    var interval1=null;                   //variable of setInterval function
    
//select size from select options
$("#sizeOptions").on("change",function(){
    var sizeValue=$(this).val(); //the selected value of size
	$("#div").find("table").remove(); //remove the old grid 
    rowsData=table(sizeValue);        //draw new grid with selected size
});
    
//select delay between iterations
$("#delayOptions").on("change",function(){
     delay=$(this).val();     //the selected value of delay
	//check if delay changed when started the game
    if(interval1 !=null){ 
     clearInterval(interval1);    //clear the current interval
     interval1=setInterval(nextStates,delay);  //set new interval with the selected delay value
    }
});
    
//click reset button     
$("#resetBtn").on("click",function(){
    $("td").on("click",triggerTile);    //add click action when click on the cells
    //reset the start button
    if($("#startBtn").html()=="Pause"){
         $("#startBtn").html("Start");
    }
    //reset the next button
    if($("#nextBtn").attr("disabled")){
      $("#nextBtn").removeAttr("disabled");  
    } 
    //reset the previous button
    if($("#previousBtn").attr("disabled")){
      $("#previousBtn").removeAttr("disabled");  
    }
    //reset the select option of the grid size
	if($("#sizeOptions").attr("disabled")){
      $("#sizeOptions").removeAttr("disabled");  
    } 	
     clearInterval(interval1); //clear the current interval
     resetStates();           //call the reset function
	
});     

//click Start Button
$("#startBtn").on("click",function(){
    $("td").off("click");   //remove the click event when click on the grid's cells
    //check if game stated or paused
	 if($(this).html()=="Start"){
          $(this).html("Pause");
          interval1=setInterval(nextStates,delay);   
        //disable the next button & previous button & select option of grid size       
          $("#nextBtn").attr("disabled","disabled");
          $("#previousBtn").attr("disabled","disabled");
          $("#sizeOptions").attr("disabled","disabled"); 
      }
      else{  //the game paused
          //enable the next & previous button
          $("#nextBtn").removeAttr("disabled");
          $("#previousBtn").removeAttr("disabled");
          $(this).html("Start"); 
          clearInterval(interval1);   
      } 
});
//click next button 
$("#nextBtn").on("click",nextStates);  
    
//click previous button
$("#previousBtn").on("click",function(){
    //check if there are previous iterations or not 
    if(previousState.length!=0){
        resetStates();                                                      //reset the grid 
        var prevState=previousState.pop();                                 //get the last previous iteration saved in the array
        for(var j=0;j<prevState.length;j++){
            rowsData[prevState[j]].css("backgroundColor","blue");           //draw the previous iteration 
        }
    }else{
        $(this).attr("disabled","disabled");        //if there is not previous iteration in the array disable the previous button
    }    
}); 
    
                            /********************* Functions ***********************/  
//draw grid function take the size of grid as a parameter
 function table(size){
	var div=document.getElementById("div");             //select the div to draw grid on it
	var createTable=document.createElement("table");    
	div.appendChild(createTable);                       
	var rows=[];
	var rowsData=[];
	for(var i=0;i<size;i++)
	{
		 rows[i]=$("<tr></tr>");
		 createTable.appendChild(rows[i][0]);
		 for(var j=0;j<size;j++)
		 {
             var tdEle=$("<td></td>");
             tdEle.css("width","35px");
             tdEle.css("height","15px");
             rowsData.push(tdEle);
			 rows[i].append(tdEle);  
		 }  
	}
    createTable.setAttribute("border","1");
	createTable.style.width="80%";
	$("td").on("click",triggerTile);                //set click event on the cells of the grid
	return rowsData;                                //return array of cells
}

//function trigger cell to change background color of cell to blue and when click again on it set the background color to white     
function triggerTile(){
    if($(this).css("backgroundColor")==="rgb(0, 0, 255)"){
	$(this).css("background-color","white");
    }else{
      $(this).css("background-color","blue");  
    }
}

//function get neighbors of the cell take cell as parameter    
function getNeighbors(tile){
    var indexofTile=tile.index();                 //get the index of the cell on the grid
    var neighbors=[];  
    checknextNeigbor(tile);                      //call the function to check if there is next neighbor and push it in the array 
    checkpreviousNeigbor(tile);                 //call the function to check if there is previous neighbor and push it in the array 
    //check if cell has up neighbor
    if(tile.parent().prev().children().eq(indexofTile).length) { 
            var upTile=tile.parent().prev().children().eq(indexofTile);
            neighbors.push(upTile);
            checknextNeigbor(upTile);
            checkpreviousNeigbor(upTile);
     }
    //check if cell has down neighbor
     if(tile.parent().next().children().eq(indexofTile).length){
         var downTile=tile.parent().next().children().eq(indexofTile);
         neighbors.push(downTile);
         checknextNeigbor(downTile);
         checkpreviousNeigbor(downTile);
         
     }
    function checknextNeigbor(cell){             //the function to check if there is next neighbor and push it in the array 
        if(cell.next().length){                  //check if cell has next neighbor
         neighbors.push(cell.next());  
     }}
    function checkpreviousNeigbor(cell){         //the function to check if there is previous neighbor and push it in the array 
        if(cell.prev().length){                  //check if cell has next neighbor
         neighbors.push(cell.prev());  
     }}
    return neighbors;      //return neighbors of certain cell
} 

// function to get number of active neighbors of each cell take array store cells on it as a parameter
 function getNumOfActiveNeighbors(activeTiles) {
     var activetilesNum=[];
	 for(var i=0;i<activeTiles.length;i++){
         var numofActives=0;
         var neighborsOfTile=getNeighbors(activeTiles[i]);
         for(var j=0;j<neighborsOfTile.length;j++){
             if(neighborsOfTile[j].css("backgroundColor")==="rgb(0, 0, 255)"){
             numofActives++;
              }
         }  
         activetilesNum.push(numofActives);
     }
     return activetilesNum;          //return array of numbers of active neighbors of each cell
 }    

//function to get next iteration     
function nextStates(){
     var actives=getNumOfActiveNeighbors(rowsData);
    var activeCells=[];
    for(var i=0;i<rowsData.length;i++){
         if(rowsData[i].css("backgroundColor")==="rgb(0, 0, 255)"){
            activeCells.push(i);
         }
     }
    previousState.push(activeCells);   //save the current iteration 
    //check the game rules
    for(var i=0;i<actives.length;i++){
        if(rowsData[i].css("backgroundColor")==="rgb(0, 0, 255)"){  //check the rules of active cell
                if(actives[i]<2){
                 rowsData[i].css("backgroundColor","white");        
                }else if(actives[i]==2 || actives[i]==3){
                 rowsData[i].css("backgroundColor","blue");
                }
                else if(actives[i]>3)
               {
                rowsData[i].css("backgroundColor","white");
               }
        }
        else{                              //check the rules of inactive cell
                if(actives[i]==3){
                 rowsData[i].css("backgroundColor","blue");
                }
        }
        
    } 
}
    
//function reset to reset the grid to the initial state    
function resetStates(){
    for(var i=0;i<rowsData.length;i++){
         if(rowsData[i].css("backgroundColor")==="rgb(0, 0, 255)"){
            rowsData[i].css("backgroundColor","white"); 
         }
     }
}
});
    
   