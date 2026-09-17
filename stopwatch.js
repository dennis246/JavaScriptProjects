
var debugLogInd = false;
function debugLog(...messages) {
    if(debugLogInd) {
        console.log(messages);
    }
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


var timerMap = new Map();
var completionSequenceArr = [];
var endOfTime = 0;
var msecsDelay = 8;
var secsDelay = 1000;
var minsDelay = 1000 * 60;
var hrsDelay = 1000 * 60 * 60;

function resetTimer() {
    timerMap.set("hrsFnInCount", 0);
    timerMap.set("hrsFnOutCount", 0);
    
    timerMap.set("minsFnInCount", 0);
    timerMap.set("minsFnOutCount", 0);
    
    timerMap.set("secsFnInCount", 0);
    timerMap.set("secsFnOutCount", 0);
    
    timerMap.set("msecsFnInCount", 0);
    timerMap.set("msecsFnOutCount", 0);

    timerMap.set("atomic", false); 

    endOfTime = 0;
    toggleState = 0;
    completionSequenceArr = [];
}

// assumes breakingCondtion will remain same for all invoking functions
// next: to handle for multiple conditions
function breakingCondtion() {
    if(endOfTime === 1){
            return true;
        }

    if(toggleState === 0) {
        if(endOfTime != 1) {
          return true;
        }
    }
}

// msecsDelay = 0;
// secsDelay = 0;
// minsDelay = 8;
// hrsDelay = 1000;

// causes dom update
const delay = (delayDuration) => new Promise(r => setTimeout(r,delayDuration));
// not tested
const renderNow = (component) => new Promise(r => {component.offsetHeight; setTimeout(r,0)});

var toggleState = 0;
function defineTimerPanel() {
    
    var firstPanelDiv = document.createElement("div");
    firstPanelDiv.id = `firstPanelDiv`;
    firstPanelDiv.style = `margin:20% auto 0 auto;width:60%;
                      position:sticky;top:0; display: block;
                      font-family: Arial; padding: 5px 10px;
                      font-size:24px; background: inherit;
                      border: 2px dotted white;`;

    var timerArrayDiv = document.createElement("div");
    timerArrayDiv.id = `timerArrayDiv`;
    timerArrayDiv.style = `margin:auto;color:white;
                      background: black;
                      display:ruby-text;
                      font-family: Arial; 
                      font-size:24px;`;
    
    var hrsDiv = document.createElement("div");
    hrsDiv.id = `hrsDiv`;
    hrsDiv.style = `padding: 2px;`;
    hrsDiv.innerHTML = "00";
    timerArrayDiv.append(hrsDiv);

    var sptr1Div = document.createElement("div");
    sptr1Div.id = `sp1Div`;
    sptr1Div.style = `padding: 2px;`;
    sptr1Div.innerHTML = ":";
    timerArrayDiv.append(sptr1Div);

    var minsDiv = document.createElement("div");
    minsDiv.id = `minsDiv`;
    minsDiv.style = `padding: 2px;`;
    minsDiv.innerHTML = "00";
    timerArrayDiv.append(minsDiv);
    
    var sptr2Div = document.createElement("div");
    sptr2Div.id = `sptr2Div`;
    sptr2Div.style = `padding: 2px;`;
    sptr2Div.innerHTML = ":";
    timerArrayDiv.append(sptr2Div);

    var secsDiv = document.createElement("div");
    secsDiv.id = `secsDiv`;
    secsDiv.style = `padding: 2px;`;
    secsDiv.innerHTML = "00";
    timerArrayDiv.append(secsDiv);

    var sptr3Div = document.createElement("div");
    sptr3Div.id = `sptr3Div`;
    sptr3Div.style = `padding: 2px;`;
    sptr3Div.innerHTML = ":";
    timerArrayDiv.append(sptr3Div);

    var msecsDiv = document.createElement("div");
    msecsDiv.id = `msecsDiv`;
    msecsDiv.style = `padding: 2px;`;
    msecsDiv.innerHTML = "00";
    timerArrayDiv.append(msecsDiv);


    var sptr4Div = document.createElement("div");
    sptr4Div.id = `sptr3Div`;
    sptr4Div.style = `padding: 2px;`;
    sptr4Div.innerHTML = " ";
    timerArrayDiv.append(sptr4Div);


    var toggleDiv = document.createElement("div");
    toggleDiv.id = `toggleDiv`;
    toggleDiv.style = `margin: auto 2%; padding: 0 5px; background:red; color:white;
                      border: 2px dotted transparent;
                      `;
    //toggleDiv.innerHTML = "Toggle";
    toggleDiv.innerHTML = toggleState == 1 ? "Stop" : "Start";
    toggleDiv.onclick = (e) => { 
        
        if(toggleState == 1) { 
            toggleState = 0;
        } else {
            toggleState = 1 
        }; 
        toggleDiv.innerHTML = toggleState === 1 ? "Stop" : "Start"; 
        // console.log("toggleState: ",toggleState);
        if(toggleState === 1) {
            startTimer();
        } else {
            stopTimer();
        }
        
    };

    //<p>fast-forward-version</p>
    var ffv = document.createElement("p");
    ffv.style = `font-size:4px;color:white;text-align:center;`;
    ffv.innerHTML = `fast-forward-version`;
    
    timerArrayDiv.append(toggleDiv);
    firstPanelDiv.append(timerArrayDiv);
    firstPanelDiv.append(ffv);
    document.body.append(firstPanelDiv);

    var secondPanelDiv = document.createElement("div");
    secondPanelDiv.id = `secondPanelDiv`;
    secondPanelDiv.style = `margin:auto;width:60%;
                      color:white; display:ruby-text;
                      font-family: Arial;
                      padding: 5px 10px;
                      font-size:20px; font-weight:100;
                      border-width: 1px solid white;`;
    document.body.append(secondPanelDiv);
    
    
}


async function startMSecsTimer() {

    completionSequenceArr.push(`startMSecsTimer_start_${Date.now()}`);
    timerMap.set("msecsFnInCount", timerMap.get("msecsFnInCount") + 1);
    timerMap.set("atomic", false);
    
    var msecsDiv = document.getElementById("msecsDiv");
    //for(var i=0; i<100; i++){

    var i=0;
    while(i < 100) {

        if(breakingCondtion()){
            break;
        }
        
        msecsDiv.innerHTML = i < 10 ? "0"+i : i;

        if(i != 99) {
           await delay(msecsDelay);
        }

        i+=1;
       
    }

    timerMap.set("msecsFnOutCount", timerMap.get("msecsFnOutCount") + 1);
    timerMap.set("atomic", true);
    completionSequenceArr.push(`startMSecsTimer_end_${Date.now()}`);
}


async function startSecsTimer() {
    completionSequenceArr.push(`startSecsTimer_start_${Date.now()}`); 
    timerMap.set("secsFnInCount", timerMap.get("secsFnInCount") + 1);
    timerMap.set("atomic", false);

    var secsDiv = document.getElementById("secsDiv");
    //for(var i=0; i<60; i++){
    var i = 0;
    while(i < 60) {

        if(breakingCondtion()){
            break;
        }

        if(timerMap.get("msecsFnInCount") != timerMap.get("msecsFnOutCount")) {
            var diff = timerMap.get("msecsFnInCount") - timerMap.get("msecsFnOutCount");
            var delayDuration = msecsDelay * diff;
            setTimeout(()=> {
                //console.log(`delayDuration:${delayDuration}`,`diff: ${diff}`,timerMap);
            }, delayDuration);
        }

        startMSecsTimer();
        secsDiv.innerHTML = i < 10 ? "0"+i : i;

        if(i != 59) {
            await delay(secsDelay);
        }

        i += 1;
    }

    timerMap.set("secsFnOutCount", timerMap.get("secsFnOutCount") + 1);
    timerMap.set("atomic", true);
    completionSequenceArr.push(`startSecsTimer_end_${Date.now()}`);
}

async function startMinsTimer() {

    timerMap.set("minsFnInCount", timerMap.get("minsFnInCount") + 1);
    timerMap.set("atomic", false);
    
    var secsDiv = document.getElementById("secsDiv");
    var minsDiv = document.getElementById("minsDiv");
    //for(var i=0; i<60; i++){
    var i = 0;
    while(i < 60) {

        if(breakingCondtion()){
            break;
        }

        if(timerMap.get("secsFnInCount") != timerMap.get("secsFnOutCount")) {
            var diff = timerMap.get("secsFnInCount") - timerMap.get("secsFnOutCount");
            var delayDuration = secsDelay * diff;
            setTimeout(()=> { 
             //   console.log(`delayDuration:${delayDuration}`,`diff: ${diff}`,timerMap);
            }, delayDuration);
        }
        
        startSecsTimer();
        minsDiv.innerHTML = i < 10 ? "0"+i : i;

        if(i != 59) {
            await delay(minsDelay + (60 - secsDiv.innerHTML));
        }

        i+=1;
        
    }

    timerMap.set("minsFnOutCount", timerMap.get("minsFnOutCount") + 1);
    timerMap.set("atomic", true);

}

async function startHrsTimer() {

    timerMap.set("hrsFnInCount", timerMap.get("hrsFnInCount") + 1);
    timerMap.set("atomic", false);
    
    var minsDiv = document.getElementById("minsDiv");
    var hrsDiv = document.getElementById("hrsDiv");
    //for(var i=0; i<24; i++){

    var i = 0;
    while(i <= 24) {

       if(breakingCondtion()){
            break;
        }


        if(timerMap.get("minsFnInCount") != timerMap.get("minsFnInCount")) {
            var diff = timerMap.get("minsFnInCount") - timerMap.get("minsFnInCount");
            var delayDuration = minsDelay * diff;
            setTimeout(()=> { 
                //console.log(`delayDuration:${delayDuration}`,`diff: ${diff}`,timerMap);
            }, delayDuration);
        }
        startMinsTimer();
        
        
        hrsDiv.innerHTML = i < 10 ? "0"+i : i;
        if(i !=23) { 
            await delay(hrsDelay + (60 - secsDiv.innerHTML));
        }

        console.log(`${i} :: ${hrsDiv.innerHTML}:${minsDiv.innerHTML}:${secsDiv.innerHTML}:${msecsDiv.innerHTML}`);
        i+=1;
    }

    markEndOfTime();
    timerMap.set("hrsFnOutCount", timerMap.get("hrsFnOutCount") + 1);
    timerMap.set("atomic", true);
}


async function markEndOfTime() {
    
    if(toggleState == 1) { 
        toggleState = 0;
    } else {
        toggleState = 1;
    }; 
    toggleDiv.innerHTML = toggleState === 1 ? "Stop" : "Start"; 
    endOfTime = 1;

    resetTimer();

    hrsDiv.innerHTML = "00";
    minsDiv.innerHTML = "00";
    secsDiv.innerHTML = "00";
    msecsDiv.innerHTML = "00";
    console.log("end of time");
}


async function startTimer() {
    var msecsDiv = document.getElementById("msecsDiv");
    var secsDiv = document.getElementById("secsDiv");
    var minsDiv = document.getElementById("minsDiv");
    var hrsDiv = document.getElementById("hrsDiv");

    await startHrsTimer();

}


async function stopTimer() {
    console.log("stop timer: ");
    console.log(timerMap);

    var msecsDiv = document.getElementById("msecsDiv");
    var secsDiv = document.getElementById("secsDiv");
    var minsDiv = document.getElementById("minsDiv");
    var hrsDiv = document.getElementById("hrsDiv");

    var secondPanelDiv = document.getElementById("secondPanelDiv");
    var secondPanelDivNodesLen = secondPanelDiv.childNodes.length;


    var panelRow = document.createElement("div");
    panelRow.style = `margin:auto; width:400px; display:flex;padding: 5px 10px;`;
    
    var panelRowCountDiv = document.createElement("div");
    panelRowCountDiv.style = `width:100%;width:10%;display:flex;font-size:16px;vertical-align:middle;padding:inherit;`;
    panelRowCountDiv.innerHTML = (secondPanelDivNodesLen + 1) + ". ";
    

    var timeCoveredDiv = document.createElement("div");
    timeCoveredDiv.id = `timeCoveredDiv_${randomText(8)}`;
    timeCoveredDiv.style = `width:100%; height:50px; color:white; display:flex
                            border: 2px dotted transparent;`;

    
    timeCoveredDiv.innerHTML = hrsDiv.innerHTML+":"+minsDiv.innerHTML+":"+secsDiv.innerHTML+":"+msecsDiv.innerHTML;
    

    panelRow.append(panelRowCountDiv);
    panelRow.append(timeCoveredDiv);
    
    secondPanelDiv.append(panelRow);

    hrsDiv.innerHTML = "00";
    minsDiv.innerHTML = "00";
    secsDiv.innerHTML = "00";
    msecsDiv.innerHTML = "00";
    toggleDiv.innerHTML = "Start"; 
    resetTimer();

    
}

debugLogInd = true;
defineTimerPanel();
