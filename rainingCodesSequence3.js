var debugLogInd = false;
function debugLog(...messages) {
    if(debugLogInd) {
        console.log(messages);
    }
}

const randomWithinRange = (minDuration,maxDuration) => {
    var validDuration = 0;
    var lix = 0;
    while(validDuration <= minDuration) {
       validDuration = parseInt(Math.random()*maxDuration);
        lix+=1;

        if(lix > 4){
            //console.log(`lix @ ${lix}`);
        }
    }
    return validDuration;
}




function getKeyIndexOfPropertyOfObject(obj,property) {

        var classkeys = Reflect.ownKeys(obj);
        for(var i=0; i< classkeys.length; i++) {
            if(classkeys[i] === property){
                return i;
            }
        }

        throw new Error("invalid object property");
        
}


function removeFrom(mainArr, targetObj, targetObjEquatingProperty) {

    if(mainArr === undefined || targetObj === undefined || targetObjEquatingProperty === undefined){
        throw new Error("invalid parameters");
    }


    if(targetObj instanceof Map) {
        
    } else {
        var keyIndex = getKeyIndexOfPropertyOfObject(targetObj, targetObjEquatingProperty);
    }

    var finalArr = [];
    for(var currentObj of mainArr) {

        if(targetObj instanceof Map) {

            if(currentObj.get(targetObjEquatingProperty) !== targetObj.get(targetObjEquatingProperty)) {
                finalArr.push(currentObj);
            }

        } else {
            
            if(Object.values(currentObj)[keyIndex] !== Object.values(targetObj)[keyIndex]){
                finalArr.push(currentObj);
            }
            
        }

    }

    return finalArr;
}

function update(mainArr, targetObj, targetObjEquatingProperty) {

    if(mainArr === undefined || targetObj === undefined || targetObjEquatingProperty === undefined){
        throw new Error("invalid parameters");
    }


    if(targetObj instanceof Map) {
        
    } else {
        var keyIndex = getKeyIndexOfPropertyOfObject(targetObj, targetObjEquatingProperty);
    }
    

    var finalArr = [];
    for(var currentObj of mainArr) {

        if(currentObj instanceof Map) {

            if(currentObj.get(targetObjEquatingProperty) === targetObj.get(targetObjEquatingProperty)) {
                finalArr.push(targetObj);
            } else {
                finalArr.push(currentObj);
            }
            
        } else {
            
            if(Object.values(currentObj)[keyIndex] === Object.values(targetObj)[keyIndex]){
                finalArr.push(targetObj);
            } else {
                finalArr.push(currentObj);
            }
        }
        
    }

    return finalArr;
    
}


const delay = (delayDuration) => new Promise(r => {
    timerInfo.addFn(delayDuration);
    timerInfo.timechase+=delayDuration;
    setTimeout(r,delayDuration); 
    
});

const delayWithinRange = (minDuration,maxDuration) => new Promise(r => {
    var validDuration = randomWithinRange(minDuration,maxDuration);
    this.timechase+=validDuration;
    setTimeout(r,validDuration);
    
});

const renderNow = (component) => new Promise(r => {component.offsetHeight; setTimeout(r,0)});

class TimerInfo {

    //orasyncnonrealtimeduration
    tempID;
    timechase = 0;
    delayChase = 0;
    startedAt = 0;
    breakingAt = [];
    //endedAt;

    timeChaseFnSet = new Set();
    timeChaseFnArr = [];

    constructor(id){
        this.id = id;
        this.timechase = 0;
        this.startedAt = Date.now();
    }

    initFn() {
        this.tempID = randomText(10);
    }

    addFn() {
        if(!this.timeChaseFnSet.has(this.tempID)) {
            this.timeChaseFnSet.add(this.tempID);
            this.timeChaseFnArr.push(this.tempID);
        }
    }

}


class SequenceInfo {
    
    sectionInitSequenceArr = [];
    sectionInitSeqIxSet = new Set();
    runningFunctionsArr = [];
    rfClearImmediateInd;

    sequenceDuration;
    endOfSequence;
    maxSentenceLen;
    maxWordsPerSentence;
    maxLettersPerWord;
    
    wordsLoadDelay;
    wordsFadeDelay;
    
    beginToFadeAfterDuration;
    beginToFadeAfterWordCountLen;
    pourType;
    maxSectionsPerRow;
    maxEntityAnimationCount;
    rowFullIx;
    continueAnimationInd = false;

    constructor(name){
		this.name = name;
	}

    getRunningFunctionsByName(fnName) {

        var finalArr = [];
        for(rfn of this.runningFunctionsArr) {
            if(rfn.name === fnName) {
                finalArr.push(rfn);
            }
        }

        return finalArr;
    }

    getRunningFunctionBySecondaryID(secondaryID) {

        for(var rfn of this.runningFunctionsArr) {
            if(rfn.secondaryID === secondaryID) {
                return rfn;
            }
        }

    }


    addToRunningFunctionsArr(fnInfo) {
        //validations?
        if(fnInfo.status !== 1){
            throw new Error("invalid addition to running fn arr");
        }
        this.runningFunctionsArr.push(fnInfo);

        if(debugLogInd){
            console.log(`adding to RFuncArr(${this.runningFunctionsArr.length}) : ${fnInfo.name} : ${fnInfo.secondaryID}`);
        }
        
        return true;
    }

    updateFunctionStatusBySecondaryID(secondaryID, updateStatus) {

        var currFn = this.getRunningFunctionBySecondaryID(secondaryID);
        if(currFn !== undefined) {
            currFn.status = updateStatus;
            if(updateStatus === 2){
                currFn.markedForDeletion = 1;

                if(this.rfClearImmediateInd == 1){

                  this.runningFunctionsArr = removeFrom(this.runningFunctionsArr, currFn, "secondaryID");
                    
                }
                //not for primaryID
                
            }
            return true;
        } else {
            return false;
        }
        
    }

    getInProgressFunctionCount(fnName) {

        var inProgressfnCount = 0;
        for(var rfn of this.runningFunctionsArr) {
            if(rfn.name === fnName) {
                inProgressfnCount+=1;
            }
        }

        return inProgressfnCount;
    }

    hasAnInProgressFunction(fnName) {
        
        var inprgsCount = 0;
        if((inprgsCount = this.getInProgressFunctionCount(fnName)) > 0){
            if(debugLogInd){
                console.log(`hasAnInProgressFunction ${fnName} ${inprgsCount}`);
            }
            return true;
        } else {
            return false;
        }
        
    }


    getDistinctFunctionsFromRunningFunctionsArr(obj,property) {

        var keyIndex = getKeyIndexOfPropertyOfObject(obj,property);
        var distFnNameSet = new Set();
        for(var rfn of this.runningFunctionsArr) {
            distFnNameSet.add(Object.values(rfn)[keyIndex]);
        }

        return distFnNameSet;

    }

    getCountByPropertyFromFromRunningFunctionsArr(obj,property,value) {

        var keyIndex = getKeyIndexOfPropertyOfObject(obj,property); 

        var count = 0;
        for(var rfn of sequenceInfo.runningFunctionsArr) {

            if(Object.values(rfn)[keyIndex] === value) {
                count+=1;
            }
        
        }

        return count;
    }

       

    getSequenceInfoStats() {

        if(this.runningFunctionsArr.length < 1){
            console.log("no running functions");
        }

        var currentProperty = "name";
        var distFnNames = this.getDistinctFunctionsFromRunningFunctionsArr(this.runningFunctionsArr[0], currentProperty);
        
        var fnInfoMapArr = []
        for(var fnname of distFnNames){
            var fnInfoMap = new Map();
            fnInfoMap.set("name", fnname);
            fnInfoMap.set("count", this.getCountByPropertyFromFromRunningFunctionsArr(this.runningFunctionsArr[0], currentProperty, fnname));

            fnInfoMapArr.push(fnInfoMap);
        }


        console.log(fnInfoMapArr);
        console.log(sequenceInfo);
        console.log("timechase:",timechase);
        console.log("delayChase:",delayChase);
        
    }

    findASectionInitSequenceItemValidForFadeOut() {

        var maxStartedAt = 0;
        var validSection;
        for(var currentSection of this.sectionInitSequenceArr){
            var currentSectionStartedAt = currentSection.get("startedAt");
            if(currentSectionStartedAt > maxStartedAt && currentSection.get("fadeOutInitiated") === false){
                maxStartedAt = currentSectionStartedAt;
                validSection = currentSection;
            }
        }

        return validSection;

    }

    getSectionInitSequenceItemBySectionID(sectionID) {
        for(var currentSection of this.sectionInitSequenceArr){

            if(currentSection.get("sectionID") === sectionID) {
                return currentSection;
            }

        }
    }

    
    
}

class AsyncFunctionInfo {

    status = 0;
    startedAt;
    enabledAt = [];
    disabledAt = [];
    stateChangeCount;
    name;
    primaryID;
    secondaryID;
    description;
    markedForDeletion = 0;
    
    constructor(name, primaryID, secondaryID, fnStat){
        this.name = name;
		this.primaryID = primaryID;
        this.secondaryID = secondaryID;
        this.status = fnStat;
        this.stateChangeCount+=1;
        this.startedAt = Date.now();
        this.stateChangeCount = 0;
	}

    equals(primaryID) {

        if(this.primaryID === primaryID){
            return true;
        } else {
            return true;
        }
        
    }

    enable() {
        //validations?
        this.status = 1;
        this.enabledAt.push(Date.now());
        this.stateChangeCount+=1;
    }

    disable() {
        //validations?
        this.status = 0;
        this.disabledAt.push(Date.now());
        this.stateChangeCount+=1;
    }

    markForDeletion() {
        //validations?
        this.status = 2;
    }

}


//initiate variables
function initiateSequenceInfo() {

    sequenceInfo = new SequenceInfo(randomText(5));
    sequenceInfo.rfClearImmediateInd = 1;
    
    sequenceInfo.sequenceDuration = 3000;
    sequenceInfo.endOfSequence = false;
    sequenceInfo.maxSentenceLen = 1; 
    sequenceInfo.maxWordsPerSentence = 7;
    sequenceInfo.maxLettersPerWord = 20;
    
    sequenceInfo.wordsLoadDelay = randomWithinRange(100,500);
    sequenceInfo.wordsFadeDelay = parseInt(sequenceInfo.wordsLoadDelay*2);
    
    sequenceInfo.beginToFadeAfterDuration = 1000;
    sequenceInfo.beginToFadeAfterWordCountLen = 15; 
    sequenceInfo.pourType = "";
    sequenceInfo.maxSectionsPerRow = 200;
    sequenceInfo.maxEntityAnimationCount = sequenceInfo.maxSectionsPerRow * 2;
    sequenceInfo.totalEntityAnimationCount = 0;
    
}

initiateSequenceInfo();
var timerInfo = new TimerInfo(randomText(12));


function placeInRows(itemsArr, maxColumns) {
    var rowsArr = [];
    var maxRows = parseInt(maxColumns > itemsArr.length ?  itemsArr.length /2 : (itemsArr.length / maxColumns) + 1);
    var itemsArrAddedCount = 0;
    for(var i=0; i<maxRows; i++) {

        var currentRowDiv = document.createElement("div");
        currentRowDiv.id = `row_${randomText(5)}_${i+1}`;
        currentRowDiv.style = `display:flex;columns:${maxColumns};scrollbar-width:none;`;

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


function defineGrid() {
    var gridDiv = document.createElement("div");
    gridDiv.id = `gridDiv`;
    gridDiv.style = `border: 0px dotted white;width:100%;fontSize:4px;scrollbar-width:none;overflow:hidden;`;

    gridDiv.addEventListener("click", (e) => {

        if(debugLogInd){
            console.log("clkeongrid");
        }
        
        initiateSequenceInfo();
        rainingCodeSequence();
    });
    
    document.body.append(gridDiv);
}

function defineSections() {
    const gridDiv = document.getElementById("gridDiv");
    gridDiv.id = `gridDiv`;
    gridDiv.style = `border: 0px dotted white;width:100%;fontSize:4px;scrollbar-width:none;overflow:hidden;`;

    var rows = placeInRows(randomSections(sequenceInfo.maxSectionsPerRow), sequenceInfo.maxSectionsPerRow);

    for(var i=0; i<rows.length; i++) {
        gridDiv.append(rows[i]);
    }
    
    document.body.append(gridDiv);
}


async function loadWordsOnTargetDiv(targetDiv, words) {

    sequenceInfo.addToRunningFunctionsArr(
        new AsyncFunctionInfo("loadWordsOnTargetDiv", randomText(7), targetDiv.id, 1)
    ); 
    

    try {
            if(targetDiv === undefined){
                return;
            }

            var wordsArr = Array.from(words);
            var gridDiv = document.getElementById("gridDiv");
            targetDivHt = targetDiv.style.height.replace("px","");
            targetDivHt = 200;
            if(targetDivHt.length === 0 || targetDivHt === undefined || targetDivHt === null) {
                outerElementHt = window.screen.height;
            }
            var targetDivMaxHeight = targetDiv.style.height.replace("%","").replace("px","") / 100 * targetDivHt;
            
            for(var i=0; i<wordsArr.length; i++) {

                //break out if faded out
                var currentSectionInitSeqMap = sequenceInfo.getSectionInitSequenceItemBySectionID(targetDiv.id);
                if(currentSectionInitSeqMap !== undefined && currentSectionInitSeqMap.get("fadeOutComplete") !== undefined) {
                    sequenceInfo.sectionInitSeqIxSet.delete(currentSectionInitSeqMap.get("sectionIx"));
                    sequenceInfo.sectionInitSequenceArr = removeFrom(sequenceInfo.sectionInitSequenceArr, 
                                                                 currentSectionInitSeqMap, "sectionIx");
                    // can go for some more iter for effect 
                    break;
                }
                
                if(sequenceInfo.endOfSequence){
                    return;
                }

                if(targetDiv.childNodes[i] === undefined){
                    //console.log(targetDiv.childNodes[i]);
                    break; //fornow
                }

                targetDiv.childNodes[i].style.opacity = `1`;
                
                //mutate
                // for(var x=0; x<10; x++) {
                //     var ptag = document.createElement("p");
                //     ptag.style = `color:#19E842;
                //     text-shadow: white 0px -2px 2px;
                //     font-size:${targetDiv.style.fontSize};`;
                //     ptag.innerHTML = randomText(1)+"\n";
                //     await delay(0);
                // }

                var ptag = document.createElement("p");
                ptag.style = `color:#19E842;
                text-shadow: white 0px -2px 2px;
                font-size:${targetDiv.style.fontSize};`;
                ptag.innerHTML = randomTextByRange(1,100,1000)+"\n";
                targetDiv.append(ptag);
    
                if(i >= targetDiv.childNodes.length) {
                    break;
                }
            
                targetDiv.childNodes[i].append(ptag);
        
                await delay(111);
        
            }

        } catch (error) {
        console.log(error);
        endOfSequence = true;
    }

    sequenceInfo.updateFunctionStatusBySecondaryID(targetDiv.id,2);
    
}

function randomSections(sectionsCount) {

    var sectionsArr = [];
    for(var i=0; i<sectionsCount; i++) {
        var section1Div = document.createElement("div");
        section1Div.id = `section_${i+1}`;
        section1Div.style = `width: 1%; height:100%; padding:1%;
                             border: 0px solid grey;
                             color:white;font-size:${randomWithinRange(5,12)}px;scrollbar-width:none;`;
        
        var ww = window.innerWidth;
        var wh = window.innerHeight;
        var unitSize = 10;
        
        var maxLinearBoxes = parseInt(wh/unitSize);
        for(var j=0; j<maxLinearBoxes; j++){
            var boxDiv = document.createElement("div");
            boxDiv.id = `boxDiv_${j+1}`;
            boxDiv.style = `width:10px;height:10px;
            background: transparent;
            border:none;`
            section1Div.append(boxDiv);
        }
        
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

    //const textLenInst = parseInt(randomWithinRange(1,textLen)); 
    for(var i=0; i<textLen; i++) {
        var currCharIx = parseInt(randomWithinRange(parseInt(charsSetStr.length/3), charsSetStr.length));
        charFArr.push(charsSetArr[currCharIx]);
    }

    return charFArr.join("");

}

function randomTextJAP(textLen){

	var from = 11904;
	var to = 11904 + 116;
	var str = "";
	for(var i=0; i<textLen; i++) {
		str += String.fromCodePoint(randomWithinRange(from, to));
	}
	return str;
}

function randomTextByRange(textLen, from, to){

	if(from == undefined || to == undefined || from > to){
		throw new Error("invalid range values");
	}
	
	var str = "";
	for(var i=0; i<textLen; i++) {
		str += String.fromCodePoint(randomWithinRange(from, to));
	}
	return str;
}


async function loadWordsOnASection() {

    if(sequenceInfo.hasAnInProgressFunction("loadWordsOnASection")
      ){

        if(sequenceInfo.sectionInitSequenceArr.length >= parseInt(sequenceInfo.maxSectionsPerRow/2)){
            sequenceInfo.rowFullIx += 1;
            return; 
        } else {
            
        }

        await delayWithinRange(100);
         
    } else {
       sequenceInfo.addToRunningFunctionsArr(
        new AsyncFunctionInfo("loadWordsOnASection", randomText(7), "lwoas", 1)
        );  
    }

    if(sequenceInfo.rowFullIx > 0){
        console.log(`rowIx ${sequenceInfo.rowFullIx}`);
    }
    

    var gridDiv = document.getElementById("gridDiv");
    var currentRow = gridDiv.childNodes[0]; // only row expected;
    var sectionsCovered = 0;
    //var invalidIx = true;
    var currentSectionIx;
    //while(invalidIx) {
        
    currentSectionIx = parseInt(Math.random() * currentRow.childNodes.length);
    if(sequenceInfo.sectionInitSeqIxSet.has(currentSectionIx)){
        //invalidIx = true;
        return;
    } else {
        //sequenceInfo.sectionInitSeqIxSet.add(currentSectionIx);
        invalidIx = false;
    }
    //}

    if(currentRow.childNodes.length == 0 || currentSectionIx > sequenceInfo.maxSectionsPerRow - 1) {
        return;
    }

    var currentSection = currentRow.childNodes[currentSectionIx]; 
    loadWordsOnTargetDiv(currentSection, randomParagraph(sequenceInfo.maxSentenceLen,sequenceInfo.maxWordsPerSentence,sequenceInfo.maxLettersPerWord));
    
    currSectionInfoMap = new Map();
    currSectionInfoMap.set("startedAt", Date.now());
    currSectionInfoMap.set("sectionIx", currentSectionIx);
    currSectionInfoMap.set("sectionID", currentSection.id);
    currSectionInfoMap.set("fadeOutInitiated", false);
    
    sequenceInfo.sectionInitSequenceArr.push(currSectionInfoMap);
    sequenceInfo.sectionInitSeqIxSet.add(currentSectionIx); 

    sectionsCovered+=1;
    
    await delayWithinRange(400,600);
    if(sequenceInfo.endOfSequence){
        return;
    }
            
    sequenceInfo.updateFunctionStatusBySecondaryID("lwoas",2);
    
}

async function clearUIForTargetDiv(targetDiv) {
    for(var box of targetDiv.childNodes){
        var ptags = box.childNodes;
        for(var ptag of ptags){
            box.removeChild(ptag);
        }
        //await delay(10); shooterfx?
    }
    
    if(debugLogInd){
         console.log("clear ui for target:"+targetDiv.id);
    }
}


async function fadeOutWordsOnTargetDiv(targetDiv) {

     sequenceInfo.addToRunningFunctionsArr(
        new AsyncFunctionInfo("fadeOutWordsOnTargetDiv", randomText(7), targetDiv.id, 1)
    ); 

    var currentSectionInitSeqMap = sequenceInfo.getSectionInitSequenceItemBySectionID(targetDiv.id);

    try {
        
        var innerNodes = targetDiv.childNodes;    
        var currOpacity = 1;
        var innerNodesLen = innerNodes.length - 1;
        var i = innerNodes.length - 1;
        
        //while(!sequenceInfo.endOfSequence){
        //for(var i=0; i<innerNodes.length; i++) {
        while(currentSectionInitSeqMap !== undefined) {
            
            //for(var j=i; j>=0; j--){
            for(var j=innerNodes.length - 1; j>=0; j--){

                if(sequenceInfo.endOfSequence){
                    return;
                }

                if(innerNodes[j].childNodes.length < 1){
                    continue;
                }

                //mutate upwards
                // for(var x=0; x<5; x++) {
                //     innerNodes[j].childNodes[0].innerHTML = randomText(1)+"\n";
                //     await delay(200);
                // }

                //mutate random
                // for(var x=0; x<5; x++) {
                //     var cix = parseInt(Math.random() * j);
                //     innerNodes[cix].childNodes[0].innerHTML = randomTextByRange(1,100,1000)+"\n";
                //     //await delayWithinRange(111,222);
                //     await delayWithinRange(5);
                // }
   

                var currOpacity = innerNodes[j].style.opacity;
                if(currOpacity == "" || currOpacity === undefined || currOpacity == null){
                    currOpacity = 1;
                }

                if(currOpacity<=0) {
                    continue;
                }
                innerNodes[j].style.opacity = currOpacity - 0.1;
                await delay(0);
                
            }

            //await delay(5);
            await delayWithinRange(1,5);
            
            i--;
            if(i<0){
              break;
            }
            
        }
    } catch (error) {
        console.log(error);
    }

    // update fadeOutComplete
    if(currentSectionInitSeqMap !== undefined) {
        currentSectionInitSeqMap.set("fadeOutComplete", true);
        sequenceInfo.sectionInitSequenceArr = 
            update(sequenceInfo.sectionInitSequenceArr, currentSectionInitSeqMap, "sectionID");
        // sequenceInfo.sectionInitSeqIxSet.delete(currentSectionInitSeqMap.get("sectionIx"));
        // sequenceInfo.sectionInitSequenceArr = removeFrom(sequenceInfo.sectionInitSequenceArr, 
        //                                                  currentSectionInitSeqMap, "sectionIx");
    
        // clearUI
        clearUIForTargetDiv(targetDiv);

        sequenceInfo.totalEntityAnimationCount += 1;
        
    }
      
    sequenceInfo.updateFunctionStatusBySecondaryID(targetDiv.id,2);
       
}


async function fadeOutWordsOnASection() {

    if(sequenceInfo.hasAnInProgressFunction("fadeOutWordsOnASection")){

        if(sequenceInfo.sectionInitSequenceArr.length >= sequenceInfo.maxSectionsPerRow){
            //sequenceInfo.rowFullIx += 1;
            return; 
        } else {
            
        }

        //await delayWithinRange(0);
        
    } else {
       sequenceInfo.addToRunningFunctionsArr(
        new AsyncFunctionInfo("fadeOutWordsOnASection", randomText(7), "fowoas", 1)
        );  
    }


    if(sequenceInfo.sectionInitSeqIxSet.size < 1){
        return;
    }

    var gridDiv = document.getElementById("gridDiv");
    var currentRow = gridDiv.childNodes[0];

    var currentSectionInitSeqMap = sequenceInfo.findASectionInitSequenceItemValidForFadeOut();

    if(currentSectionInitSeqMap === undefined){
        return;
    }

    var currentSection = currentRow.childNodes[currentSectionInitSeqMap.get("sectionIx")];

    if(sequenceInfo.endOfSequence){
        return;
    }


    var validForFadeOutInd = false;
    while(!validForFadeOutInd) {

        var currentTime = Date.now();
        var diff = currentTime - currentSectionInitSeqMap.get("startedAt");
    
        var wordsLoadedCount = 0;
        for(divBox of currentSection.childNodes) {
    
            for(ptag of divBox.childNodes) {
    
                if(ptag.innerHTML.length > 0 && ptag.innerHTML !== undefined
                   && ptag.innerHTML !== null){
                    wordsLoadedCount+=1;
                }
            }
            
        }
        
       if(diff >= sequenceInfo.beginToFadeAfterDuration
          && wordsLoadedCount > sequenceInfo.beginToFadeAfterWordCountLen){
           validForFadeOutInd = true;
       } else {
           await delay(100);
       }

        if(sequenceInfo.endOfSequence){
            return;
        }
    }
    
    
    if(validForFadeOutInd) {
        
        fadeOutWordsOnTargetDiv(currentSection);

        // update fadeOutInitiated
        currentSectionInitSeqMap.set("fadeOutInitiated", true);
        sequenceInfo.sectionInitSequenceArr = update(sequenceInfo.sectionInitSequenceArr, currentSectionInitSeqMap, "sectionID");

        //await delay(1000);
        
    } 

    sequenceInfo.updateFunctionStatusBySecondaryID("fowoas",2);
}


async function rainingCodeSequence() {
    
    sequenceInfo.endOfSequence = false;
    var ix = 0;
    //while (ix <= maxCount) {
    while(!sequenceInfo.endOfSequence) {

        loadWordsOnASection();
        await delay(50);
        fadeOutWordsOnASection();
        await delay(50);

        if(sequenceInfo.totalEntityAnimationCount 
           >= sequenceInfo.maxEntityAnimationCount) {
            sequenceInfo.endOfSequence = true;
        }

        if(sequenceInfo.endOfSequence){
            console.log("rainingCodeSequence loop ends");
            if(sequenceInfo.continueAnimationInd){
                sequenceInfo.endOfSequence = false;
                sequenceInfo.continueAnimationInd = false;
            }
            return;
        }

        ix+=1;
    } 
   
}

debugLogInd = false;
defineGrid();
defineSections();
rainingCodeSequence();


