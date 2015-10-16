function getRidOfCurve(str){
    var arr = [];
    var start = 0;
    var buffer = "";
    for(var i = 0; i < str.length; i++){
        if(str[i] == "c"){
            buffer = str.substring(start,i);
            arr.push(buffer);
            start = i;
        }else if(str[i] == "l"){
            buffer = str.substring(start,i + 1);
            arr.push(buffer);
            start = i + 1;
        }else if(i == str.length - 1){
            buffer = str.substring(start,i + 1);
            arr.push(buffer);
        }
    }
    for(var i = 0; i < arr.length; i++){
        if(arr[i][0] == "c"){
            arr[i] = sanitize(arr[i]);
            // console.log(arr[i]);
        }
    }
    return arr.join("");
}

function sanitize(str){
    str = str.replace(/c ?/g,"");
    str = str.replace(/ ?l/g,"");
    var arr = str.split(" ");
    var arr2 = [];
    for(var i = 2; i < arr.length; i+= 3){
        arr2.push(arr[i]);
    }
    return arr2.join(" ");
}
