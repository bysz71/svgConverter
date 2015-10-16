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

//find the shortest link between 2 areas, return the dots of this shortest link
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