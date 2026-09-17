

// import {timer} from "timer.js";

var debugLogInd = false;
function debugLog(...messages) {
    if(debugLogInd) {
        console.log(messages);
    }
}

// class NestedSqrsRevStat {
//     var nestedSqrAddCount;
//     scaleDir = "up";
//     var scaleOpCount = 0;
//     var maxPulsateCount = 10;
// }

var nestedSqrAddCount = 0;
var scaleDir = "up";
var scaleOpCount = 0;
var maxPulsateCount = 10;


function nestedSqrs(outerSqrSize, outerSqrInsetFrom_x, outerSqrInsetFrom_y, 
                    innerSqrSizePercWRTOuter, outerComponentID, nestedSqrAddIndex) {
    try { 

        if(innerSqrSizePercWRTOuter > 2 || innerSqrSizePercWRTOuter < 0.1){
            //throw new Error("invalid innerSqrSizePercWRTOuter");
        }

        //nestedSqrAddCount += 1;
        const innerSqrSize = outerSqrSize * innerSqrSizePercWRTOuter;
        
        var nestedSqrOuterDiv = document.createElement("div");
        //nestedSqrOuterDiv.id = `${outerComponentID}_nestedSqrs_${nestedSqrAddCount}`;
        nestedSqrOuterDiv.id = `${outerComponentID}_nestedSqrs_${nestedSqrAddIndex}`;
        nestedSqrOuterDiv.className = `nestedSqrs`;
        nestedSqrOuterDiv.style = `border: ${outerSqrSize/10}px solid red;
                    background: transparent;
                    width: ${outerSqrSize}px;
                    height: ${outerSqrSize}px;
                    position: relative;
                    inset: ${outerSqrInsetFrom_x}% ${outerSqrInsetFrom_y}%`;
        //console.log(containerDiv);
    
        // var insetPerc = ((outerSqrSize - innerSqrSize) / 2)/outerSqrSize * 100; 
        // var insetPerc = (outerSqrSize - innerSqrSize) * 100 / (2 * outerSqrSize); 
        var insetPerc = 50 * (1 - (innerSqrSize/outerSqrSize));
        //debugLog("innerSqrSizePercWRTOuter", innerSqrSizePercWRTOuter, " , ", "insetPerc", insetPerc, " , ", "Round:", Math.round(insetPerc));
        
        var n1Div = document.createElement("div");
        n1Div.style = `border: none;
                    // opacity: 0.7;
                    background: red;
                    width: ${outerSqrSize * innerSqrSizePercWRTOuter}px;
                    height: ${outerSqrSize * innerSqrSizePercWRTOuter}px;
                    position: absolute;
                    inset: ${insetPerc}% ${insetPerc}%`;
    
        nestedSqrOuterDiv.append(n1Div);
        //document.body.append(nestedSqrOuterDiv);
        return nestedSqrOuterDiv;
        
    } catch(error) {
        console.log(error)
    }
}

function removeNestedSqrs() {

    var nestedSqrsDivs = document.getElementsByClassName('nestedSqrs');

    var idsList = [];
    for(var i=0; i<nestedSqrsDivs.length; i++){
        idsList.push(nestedSqrsDivs[i].id); 
    };
    
    debugLog(nestedSqrsDivs.length, idsList.length);
    
    for(var i=idsList.length - 2; i>=0; i--){
        var cdiv = document.getElementById(idsList[i]);
        document.body.removeChild(cdiv);
    };

    debugLog(nestedSqrsDivs.length, idsList.length);
    
}

function updateNestedSqrs(updatedComponent, outerComponentID){


    if(updatedComponent == null || updatedComponent == undefined) {
        return;
    } 
    
    var outerComponentDiv = document.getElementById(outerComponentID);
    var prevComponent = document.getElementById(updatedComponent.id);

    if(prevComponent == null || prevComponent == undefined) {
        return;
    } 
    
    // var childNodesArr = outerComponentDiv.childNodes;
    // for(var i=0; i<childNodesArr.length; i++) {
    //     outerComponentDiv.removeChild(childNodesArr[i]);
    // }

    outerComponentDiv.removeChild(prevComponent); 
    outerComponentDiv.append(updatedComponent);
    
}


function execFrames(outerSqrSize, outerSqrInsetFrom_x, outerSqrInsetFrom_y,
                    innerSqrSizePercWRTOuter, outerComponentID, nestedSqrAddIndex, startVal) {

    scaleOpCount+=1;

    var updatedComponent = nestedSqrs(outerSqrSize, outerSqrInsetFrom_x, outerSqrInsetFrom_y, 
                               innerSqrSizePercWRTOuter, outerComponentID,
                               nestedSqrAddIndex, startVal);
    updateNestedSqrs(updatedComponent, outerComponentID);
    //removeNestedSqrs();

    if(scaleOpCount > maxPulsateCount) {
        //clearInterval(1);
        // console.log("upscale ends");
        // removeNestedSqrs();
    }

    if(scaleOpCount > 2*maxPulsateCount) {
        clearInterval(1);
    }
   
    if(scaleDir.includes("up")) {
         if(startVal > 1) {
            //clearInterval(1);
             scaleDir = "down";
             return startVal--;
          } else {
             return startVal+0.1;
          }
        
    } else if(scaleDir.includes("down")) {
         if(startVal < 0.1) {
            //clearInterval(1);
            scaleDir = "up";
            return startVal++;
        } else {
             return startVal-0.1;
        }
        
    }
    
    
}




const delay = (delayDuration) => new Promise(r => setTimeout(r,delayDuration));

const renderNow = (component) => new Promise(r => {component.offsetHeight; setTimeout(r,0)});

async function pulsate2(outerSqrSize, outerSqrInsetFrom_x, outerSqrInsetFrom_y, innerSqrSizePercWRTOuter,
                        outerComponentID, nestedSqrAddIndex, maxIterations, delayInMilliSecs) {

    var startVal = 0.1;
    for(var i=0; i<maxIterations; i++) {
        startVal = execFrames(outerSqrSize, outerSqrInsetFrom_x, outerSqrInsetFrom_y, 
                              startVal, outerComponentID, nestedSqrAddIndex,
                              startVal); 
    	await delay(delayInMilliSecs);
        //debugLog("from pulsate2 current startVal:", startVal);
    }

    console.log("end of pulsate2 for :", outerComponentID);
    //return iteration+1;
}


function defineSections() {

    var gridDiv = document.createElement("div");
    gridDiv.id = `gridDiv`;
    gridDiv.style = `border: 4px dotted white;width:100%; height:100%;overflow:scroll;fontSize:4px;`;

    var rows = placeInRows(randomSections(4), 2);

    for(var i=0; i<rows.length; i++) {
        gridDiv.append(rows[i]);
    }
    
    document.body.append(gridDiv);
}


function placeInRows(itemsArr, maxColumns) {
    var rowsArr = [];
    var maxRows = parseInt(maxColumns > itemsArr.length ?  itemsArr.length /2 : (itemsArr.length / maxColumns) + 1);
    var itemsArrAddedCount = 0;
    for(var i=0; i<maxRows; i++) {

        var currentRowDiv = document.createElement("div");
        currentRowDiv.id = `row_${randomText(5)}_${i+1}`;
        currentRowDiv.style = `display:flex;columns:${maxColumns};`;

        if(itemsArrAddedCount >= itemsArr.length){
            break;
        }

        var addFrom = itemsArrAddedCount;
        for(var j=addFrom; j<addFrom + maxColumns; j++) {
            currentRowDiv.append(itemsArr[j]);
            itemsArrAddedCount += 1;
        }

        rowsArr.push(currentRowDiv);
        
    }

    return rowsArr;
    
}

function randomSections(sectionsCount) {

    var sectionsArr = [];
    for(var i=0; i<sectionsCount; i++) {
        var section1Div = document.createElement("div");
        section1Div.id = `section_${i+1}`;
        // section1Div.innerHTML = `section_${i+1}${" "}${randomParagraph(50,8,16)}`;
        section1Div.style = `width: 100%; padding:2%; border: 2px dotted grey;color:white;font-size:5px;`;
        //gridDiv.append(section1Div); 
        // var emptyDiv = document.createElement("div");
        // emptyDiv.style = `inset: auto; width:0; height:0; border: 0px dotted grey;color:white;fontSize:8px;overflow:hidden;`;
        // gridDiv.append(emptyDiv);
        sectionsArr.push(section1Div);
    }

    return sectionsArr;
}

function randomParagraph(maxSentences, maxWords, maxWordLen) {

    var paragraph = "";
    for(var i=0; i<maxSentences; i++) {
        paragraph += randomSentence(maxWords, maxWordLen);
    }

    return paragraph;
    
}

function randomSentence(maxWords, maxWordLen) {
    var sentence = "";
    for(var i=0; i<maxWords; i++) {
        sentence += randomText(maxWordLen);
        if(i < maxWords - 1) {
            sentence += " ";
        }
    }

    sentence += ". ";
    return sentence;
}

function randomText(textLen) {
    var chars = "qwertyuiopasdfghjklmnbvcxz";
    const numbers = "0987612345";
    const charsUpper = chars.toUpperCase();
    const charsSetStr = chars+numbers+charsUpper;
    const charsSetArr = Array.from(charsSetStr);
    var charFArr = [];

    const textLenN = parseInt(Math.random() * textLen);
    for(var i=0; i<textLenN; i++) {
        var currCharIx = parseInt(Math.random() * charsSetStr.length);
        charFArr.push(charsSetArr[currCharIx]);
    }

    return charFArr.join("");

}


function defineNestedSqrs() {

    var gridDiv = document.getElementById("gridDiv");
    
    var maxRowsLen = gridDiv.childNodes.length;
    var targetRowIx = parseInt(Math.random() * maxRowsLen);
    var maxColumnsLen = gridDiv.childNodes[targetRowIx].childNodes.length;
    var targetColumnIx = parseInt(Math.random() * maxColumnsLen);
    
    //var sectionX = document.getElementById("section_1");
    var sectionX = gridDiv.childNodes[targetRowIx].childNodes[targetColumnIx];
    var sqr1 = nestedSqrs(20, -20, 0, 0.1, sectionX.id, 1);
    sectionX.append(sqr1);
    var x1 = pulsate2(20, -20, 20, 0.1, sectionX.id, 1, 300,parseInt(Math.random() * 1500));

    var targetRowIx2 = targetRowIx; 
    while(targetRowIx2 === targetRowIx) {
        targetRowIx2 = parseInt(Math.random() * maxRowsLen);
    }

    maxColumnsLen = gridDiv.childNodes[targetRowIx].childNodes.length;
    targetColumnIx = parseInt(Math.random() * maxColumnsLen);
    
    //var sectionX = document.getElementById("section_1");
    var sectionY = gridDiv.childNodes[targetRowIx2].childNodes[targetColumnIx];
    var sqr2 = nestedSqrs(40, -40, 0, 0.6, sectionY.id, 1);
    sectionY.append(sqr2);
    var x2 = pulsate2(40, -40, 20, 0.1, sectionY.id, 1, 30,parseInt(Math.random() * 1500));
    
    debugLog("end of defineNestedSqrs ");

}







debugLogInd = true;

//console.log(randomParagraph(50,8,16));
//pulsate2(10,500);

defineSections();
defineNestedSqrs();
// console.log("END");
