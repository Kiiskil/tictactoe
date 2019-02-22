let charCount = 36;

function consoleLog(rawContent){
    //takes input, splits it to array of chars, loops through arrays and generates message per line
    // based how many char per line is wanted and prepends that line to pre-element
    //writes text in a pre-element in site.
    let theDiv=document.getElementById("logger");
    let strContent = rawContent.toString();
    let tmpArr = strContent.split('');

    for(let j = 0; j < tmpArr.length;j++){
        let tmpArrarr= [];
        for(let i = 0; i <= charCount; i++){
            let ind = i+j;
            tmpArrarr.push(tmpArr[ind]);
        }
        j = j+tmpArrarr.length-1;
        let content=tmpArrarr.join('');
        let log = document.createTextNode(content+"\n");
        theDiv.appendChild(log);
    }
    draw();
}
function consolePlayLog(rawContent){
    //takes input, splits it to array of chars, loops through arrays and generates message per line
    // based how many char per line is wanted and prepends that line to pre-element
    //writes text in a pre-element in site.
    let theDiv=document.getElementById("playLogger");
    theDiv.innerHTML = "";
    rawContent.forEach(note => {
        let log = document.createTextNode(note+"\n");
        theDiv.appendChild(log);
    });
    draw();
}