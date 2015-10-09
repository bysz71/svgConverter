function svgExecute(){
    var string;
    $("path").each(function(){
        string = $(this).attr("d");
        string = svgUpdate(string);
        $(this).attr("d",string);
    });
}

function svgUpdate(string){
    string = string.replace(/ ?c 0,0 ?/g, ' ');
    string = string.replace(/ ?l ?/g, ' ');
    var areas = string.split(/ ?z ?m ?/);
    if(areas.length == 1) return;
    var bufferArea;
    var bufferCoords;
    var coordinates = [];
    var firstCoos = [];
    
    //get rid of front and end m and z
    for(var i = 0; i < areas.length; i++){
        areas[i] = areas[i].replace(/ ?m ?/, '');
        areas[i] = areas[i].replace(/ ?z ?/, '');
    }
    
    //split each element by ",", numberize them
    for(var i = 0; i < areas.length; i++){
        coordinates[i] = [];
        areas[i] = areas[i].replace(/[a-zA-Z]/g,'');
        areas[i] = areas[i].replace(/  /g,' ');
        bufferArea = areas[i].split(' ');
        for(var j = 0; j < bufferArea.length; j++){
            bufferCoords = bufferArea[j].split(',');
            bufferCoords[0] = Number(bufferCoords[0]);
            bufferCoords[1] = Number(bufferCoords[1]);
            coordinates[i].push(bufferCoords);
        }
    }
    
    //convert svg vectors to coordinates    
    vectorsToCoordinates(coordinates);
    
    //find the shortest link nodes for 2 nearby ares
    var linkIndexes = [];
    for(var i = 0; i < coordinates.length - 1; i++){
        linkIndexes.push(findLinkIndex(coordinates[i], coordinates[i+1]));
    }
    
    //convert the coordinates array which representing multi-areas
    // to a continuous array that representing one area
    var array = reconstruct(coordinates, linkIndexes);
    
    //build the path information for svg to use
    var pathString = reconstructSvgPathString(array);
    
    return pathString;
    // $("#"+id).attr("d", pathString);
}




//convert vectors used in path to coordinates
function vectorsToCoordinates(vectorArray){
    var buffer = [0,0];
    for(var i = 0; i < vectorArray.length; i++){
        for(var j = 0; j < vectorArray[i].length; j++){
            vectorArray[i][j][0] += buffer[0];
            vectorArray[i][j][1] += buffer[1];
            buffer = vectorArray[i][j];
        }
    }
}

//find the shortest link between 2 areas, return the indexes of dots that belong to that shortest link
function findLinkIndex(left, right){
    var minLeft, minRight, minDistance;
    minDistance = 0;
    curDistance = 0;
    for(var i = 0; i < left.length; i++){
        for(var j = 0; j < right.length; j++){
            curDistance = Math.pow(left[i][0] - right[j][0], 2) + Math.pow(left[i][1] - right[j][1], 2);
            if(minDistance == 0 || minDistance > curDistance){
                minDistance = curDistance;
                minLeft = i;
                minRight = j;
            }
        }
    }
    return [minLeft, minRight];
}

//this function takes the existing coordinates of multi-areas, and the shortest 
//link between neighbours
//convert independent-multi-areas into one-continuous-area
function reconstruct(coordinates, indexes){
    var bufferArray1, bufferArray2, start, end;
    var arrayOfHalfs1 = [];
    var arrayOfHalfs2 = [];
    for(var i = 0; i < coordinates.length - 1 ; i++){
        if(i==0) start = 0;
        else start = indexes[i - 1][1];
        if(i== coordinates.length - 1) end = coordinates[i].length - 1;
        else end = indexes[i][0];
        
        bufferArray1 = [];
        bufferArray2 = [];
        
        if(start > end){
            for(var j = start; j < coordinates[i].length; j++)
                bufferArray1.push(coordinates[i][j]);                
            for(var j = 0; j <= end; j++)
                bufferArray1.push(coordinates[i][j]);
            
            for(var j = end; j <= start; j++)
                bufferArray2.push(coordinates[i][j]);            
        }else if(start < end){
            for(var j = start; j <= end; j++)
                bufferArray1.push(coordinates[i][j]);
            
            for(var j = end; j < coordinates[i].length; j++)
                bufferArray2.push(coordinates[i][j]);
            for(var j = 0; j <= start; j++)
                bufferArray2.push(coordinates[i][j]);
        }else{
            for(var j = start; j < coordinates[i].length; j++)
                bufferArray1.push(coordinates[i][j]);
            for(var j = 0; j < start; j++)
                bufferArray1.push(coordinates[i][j]);
                
            bufferArray2 = [coordinates[i][end]];
        }
        arrayOfHalfs1.push(bufferArray1);
        arrayOfHalfs2.push(bufferArray2);
    }
    
    //deal with the last area, which only has a start node
    lastArea = coordinates[coordinates.length - 1];
    lastIndex = indexes[indexes.length - 1];
    bufferArray1 = []
    for(var i = lastIndex[1]; i < lastArea.length; i++)
        bufferArray1.push(lastArea[i]);
    for(var i = 0; i < lastIndex[1]; i++)
        bufferArray1.push(lastArea[i]);
    bufferArray2 = [lastArea[lastIndex[1]]];
    arrayOfHalfs1.push(bufferArray1);
    arrayOfHalfs2.push(bufferArray2);
    
    //construct 2 results, one is forward traversal, the other is backward
    result1 = [];
    for(var arr in arrayOfHalfs1)
        result1 = result1.concat(arrayOfHalfs1[arr]);
    // result2 = [];
    for(var i = arrayOfHalfs2.length - 1; i >= 0 ; i--)
        result1 = result1.concat(arrayOfHalfs2[i]);
    
    //return result
    return result1;
}


function reconstructSvgPathString(whole){
    //get rid of neighbours with exactly same values
    //so vector 0,0 won't appear
    for(var i = 0; i < whole.length - 1; i++){
        if(arrayEqual(whole[i],whole[i+1])){
            whole.splice(i+1, 1);
        }
    }
    //convert coordinates to vectors
    coordinatesToVectors(whole);
    
    //construct the string
    var result = "m "
    for(var index in whole){
        whole[index] = whole[index].join(',');
    }
    whole.join(" ");
    result += whole;
    result += " z";
    
    return result;
}

function coordinatesToVectors(coords){
    for(var n = coords.length - 1; n > 0; n--)
        coords[n] = arrayMinus(coords[n],coords[n - 1]);
}

function arrayEqual(arr1, arr2){
    if(arr1[0] == arr2[0] && arr1[1] == arr2[1]) return true;
    else return false;
}

function arrayMinus(arr1,arr2){
    x = arr1[0] - arr2[0];
    y = arr1[1] - arr2[1];
    return [x,y];
}
