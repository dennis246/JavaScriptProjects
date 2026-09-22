// function randomRGB() {
// 	var red = Math.random() * 255;
// 	var green = Math.random() * 255;
// 	var blue = Math.random() * 255;

// 	return `rgb(${red},${green},${blue})`;
// }

const delay = (delayDuration) => new Promise(r => {
	// timerInfo.addFn(delayDuration);
	// timerInfo.timechase+=delayDuration;
	setTimeout(r,delayDuration);
});

const delayWithinRange = (minDuration,maxDuration) => new Promise(r => {
	var validDuration = randomWithinRange(minDuration,maxDuration);
	this.timechase+=validDuration;
	setTimeout(r,validDuration);
});

const renderNow = (component) => new Promise(r => {component.offsetHeight; setTimeout(r,0)});

function generateGrid(viewMaxWidth, viewMaxHeight, unitWidth, unitHeight, unitBdrOrBgr) {

	console.log("@generateGrid:");
	console.log("vwpw:",window.screen.width, "vwph:", window.screen.height);
	const maxRows = parseInt(viewMaxHeight / unitHeight);
	const maxColumns = parseInt(viewMaxWidth / unitWidth);

	console.log("maxRows: ",maxRows,"maxColumns:",maxColumns);

	var containerDiv = document.createElement("div");
	containerDiv.style.top = `20%`;
	containerDiv.style.minWidth = `100%`;
	containerDiv.style.minHeight = `100%`;
	containerDiv.style.border = `2px dotted black`;
	// containerDiv.style.position = `relative`;
	containerDiv.style.padding = `0%`;

	
	var boxGridDiv = document.createElement("div");
	boxGridDiv.id = "boxGrid"; 
	// boxGridDiv.style.position = `absolute`;
	boxGridDiv.style.background = `#f6f6f6`;
	boxGridDiv.style.width = `100%;`
	boxGridDiv.style.height = `100%;`


	var uqboxid = 0;
	for(var i=0; i<maxRows; i++) {

		
		var boxRowDiv = document.createElement("div");
		boxRowDiv.id = `boxRow_${i+1}`;
		boxRowDiv.style.display = `flex`;
		boxRowDiv.style.columns = maxColumns;
		// boxRowDiv.style.background = `red`;
		// boxRowDiv.style.position = `absolute`;
		// boxRowDiv.style.border = `1px solid grey`;
		
		
		for(var j=0; j<maxColumns; j++) {

			uqboxid+=1;
			var boxDiv = document.createElement("div");
			boxDiv.id = `box_${uqboxid}`;
			boxDiv.style.minWidth = `${unitWidth}px`;
			boxDiv.style.minHeight = `${unitHeight}px`;

			boxDiv.style.border = `1px solid black`;
			boxDiv.style.alignItems = `center`;
			boxDiv.style.justifyContent = `center`;
			boxDiv.style.textAlign = `center`;
			boxDiv.style.verticalAlign = `middle`;
			boxDiv.style.fontFamily = `Arial`;
			boxDiv.style.fontSize = `19px`;
			
			// boxDiv.onclick = (e) => {
			// 	console.log(`${e.id}:${boxDiv.id} onclick`);
			// }
			
			// boxDiv.onmouseover = (e) => {
			// 	console.log(`${e.id}:${boxDiv.id} onmouseover`);
			// }
	
			boxRowDiv.appendChild(boxDiv);
		}
		

		boxGridDiv.append(boxRowDiv);
	}
	

	containerDiv.append(boxGridDiv);
	document.body.append(containerDiv);

}

function fillBoxesAtRandom(fillRange) {

	console.log("@fillBoxesAtRandom:");
	const boxGrid = document.getElementById('boxGrid');
	const rows = boxGrid.childNodes;
	const columnsLen = boxGrid.childNodes[0].childNodes.length;

	//var rfSet = new Set();

	for(var i=0; i<rows.length; i++) {

		var rfSet = new Set();
		const columns = rows.childNodes;
		//const maxFls = 17;

		var filled = 0;
		while(rfSet.size < fillRange) {
			rfSet.add(parseInt(Math.random() * columnsLen));
		}

		const rfSetArr = Array.from(rfSet);

		for(var j=0; j<rfSetArr.length;j++) {
			var currboxDiv = boxGrid.childNodes[i].childNodes[rfSetArr[j]];
			currboxDiv.style.background = `#ED1C24`;
		}

		
	}
	
	
}


function defineGrid() {
	generateGrid(400,400,80,80,"blank");
	//generateGrid(400,400,80,80,"blank");
	//fillBoxesAtRandom(10);
	window.navigation.canGoBack = false;
	//msclkclkx10
	//notsopong
	//19092026 cloudywithachanceofpalakpaneer
}

async function plotNumbers() {
	console.log("@plotNumbers:");
	const boxGrid = document.getElementById('boxGrid');
	const rows = boxGrid.childNodes;
	const rowsLen = rows.length;
	const columnsLen = boxGrid.childNodes[0].childNodes.length;
	const totalBoxes = rowsLen * columnsLen;
	
	//var currPt = parseInt(Math.random() * totalBoxes);
	var currPt = 5;
	console.log("starting from box",currPt);
	var mapRes0 = currentPtReferences(currPt, rowsLen, columnsLen);
	var rowNum = mapRes0.get("rowNum");
	var columnNum = mapRes0.get("columnNum");
	var minOfRow = mapRes0.get("minOfRow");
	var maxOfRow = mapRes0.get("maxOfRow");

	var currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
	currDiv.style.background = `limegreen`;
	var currNum = 1;
	
	var pdiv = document.createElement("p");
	pdiv.innerHTML = `${currNum}`;
	pdiv.style = `color:white; font-size:25px;font-weight:700;`
	currDiv.append(pdiv);

	var ptSet = new Set();
	var ptSetPrevSize = ptSet.size;
	var ix = 1;

	var fillSeqArr = [];
	fillSeqArr.push(currPt);
	VacConsCrossPtsArr = [];
	
	while(ix != totalBoxes) {

		currNum += 1;
		var numSet = validBoxesAroundCurrent(boxGrid, currDiv, currPt, rowNum, 
					 columnNum, minOfRow, maxOfRow, rowsLen, columnsLen);
		
		if(numSet.size == 0){
			if(ix != totalBoxes) {
				console.log("dead end");
			}
			break;
		}

		var numSetArr = Array.from(numSet);

		var blockedPt;
		if(ix > 1){
			blockedPt = findABlockedPt(boxGrid, numSetArr, rowsLen, columnsLen);
		}
		
		if(blockedPt != null && blockedPt != undefined) {
			nextPt = blockedPt;
		} else {
			var resArr = shuffle(numSetArr);
			var nextPt = resArr[parseInt(resArr.length / 2)];
		}

		var mapRes = currentPtReferences(nextPt, rowsLen, columnsLen);
		rowNum = mapRes.get("rowNum");
		columnNum = mapRes.get("columnNum");
		minOfRow = mapRes.get("minOfRow"); 
		maxOfRow = mapRes.get("maxOfRow"); 
		
		currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
		currDiv.style.background = `${currNum == totalBoxes ? 'limegreen' : 'black'}`;
		currDiv.style.border = `1px solid ${currNum == totalBoxes ? 'none' : 'grey'}`;
		
		if(currDiv.childNodes.length > 0) {
			console.log("dead end");
			break;
		}
		var pdiv = document.createElement("p");
		pdiv.innerHTML = `${currNum}`;
		pdiv.style = `color:white; font-size:25px;font-weight:700;`
		currDiv.append(pdiv);

		currPt = nextPt;
		ix += 1;

		if(fillSeqArr.length > 1){

			var prevFilledPt = fillSeqArr[fillSeqArr.length - 1];
			var ptDist = Math.abs(prevFilledPt - currPt);
			if(ptDist != 1 && ptDist != columnsLen) {

				
				if(prevFilledPt > currPt) {
					//upward
					var prevPtAnc = currPt + columnsLen;
					var currPtAnc = prevFilledPt - columnsLen;
				
					VacConsCrossPtsArr.push(prevPtAnc);
					VacConsCrossPtsArr.push(currPtAnc);
					
				} else if(prevFilledPt < currPt) {
					//downward
					var prevPtAnc = currPt - columnsLen;
					var currPtAnc = prevFilledPt + columnsLen;
				
					VacConsCrossPtsArr.push(prevPtAnc);
					VacConsCrossPtsArr.push(currPtAnc);
					
				}
				
			}
		}
		
		fillSeqArr.push(currPt);
		await delay(55);
	}

	console.log("fillSeqArr:",fillSeqArr);

}

function findABlockedPt(boxGrid, ptsArr, rowsLen, columnsLen) {
	// find point that has maximum blockages ahead

	var ptBlkScArr = [];
	for(pt of ptsArr) {

		var mapRes0 = currentPtReferences(pt, rowsLen, columnsLen);
		var rowNum = mapRes0.get("rowNum");
		var columnNum = mapRes0.get("columnNum");
		var minOfRow = mapRes0.get("minOfRow");
		var maxOfRow = mapRes0.get("maxOfRow");
	
		var currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
		var innerPtSet = validBoxesAroundCurrent(boxGrid, currDiv, pt, rowNum, columnNum, minOfRow, maxOfRow, rowsLen, columnsLen);
		// var filledAroundPtCount = 0;
		// for(innerPt of innerPtSet) {
		// 	if(checkIfBoxFilled(boxGrid, innerPt, rowsLen, columnsLen)){
		// 		filledAroundPtCount += 1;
		// 	}
		// }

		ptBlkScArr.push(8 - innerPtSet.size);
	}

	//definite
	var ixOfMaxValOfArray = indexOfMaxValOfArray(ptBlkScArr);
	return ptsArr[ixOfMaxValOfArray];

	// var resArr = shuffle(ptBlkScArr);
	// return resArr[parseInt(resArr.length/2)];
	
}

function indexOfMaxValOfArray(arr) {

	var maxVal = arr[0];
	var maxValIx = 0;
	for(var i=0; i<arr.length; i++){
		if(arr[i] > maxVal) {
			maxVal = arr[i];
			maxValIx = i;
		}
	}

	return maxValIx;
}


function checkIfBoxFilled(boxGrid, currPt, rowsLen, columnsLen) {

	var mapRes = currentPtReferences(currPt, rowsLen, columnsLen);
	var rowNum = mapRes.get("rowNum");
	var columnNum = mapRes.get("columnNum");
	// var minOfRow = mapRes.get("minOfRow");
	// var maxOfRow = mapRes.get("maxOfRow");
	
	if(boxGrid.childNodes[rowNum - 1]
		.childNodes[columnNum - 1]
		.childNodes.length == 0) {
				return false;
	}
	return true;
}

function currentPtReferences(currPt, rowsLen, columnsLen) {
	var modR = currPt%rowsLen;
	var quoR = parseInt(currPt/rowsLen);
	var rowNum = modR > 0 ? quoR + 1 : quoR;
	var maxOfRow = rowNum * columnsLen;
	var minOfRow = (maxOfRow - columnsLen) + 1;
	var columnNum = (currPt - minOfRow) + 1;

	var finalMap = new Map();
	finalMap.set('modR',modR);
	finalMap.set('quoR',quoR);
	finalMap.set('rowNum',rowNum);
	finalMap.set('maxOfRow',maxOfRow);
	finalMap.set('minOfRow',minOfRow);
	finalMap.set('columnNum',columnNum);
	
	return finalMap;
}

function validBoxesAroundCurrent(boxGrid, currBoxDiv, currPt, currRowNum, currColumnNum,
							minOfCurrRow, maxOfCurrRow, rowsLen, columnsLen, totalBoxes) {

	var numSet = new Set();

	if(currRowNum > 1) {
		var n1 = currPt - columnsLen;

		if(!checkIfBoxFilled(boxGrid, n1, rowsLen, columnsLen)) {
			numSet.add(n1);
		}
		
		var mapRes = currentPtReferences(n1, rowsLen, columnsLen);
		var rowNum = mapRes.get("rowNum");
		var columnNum = mapRes.get("columnNum");
		var minOfRow = mapRes.get("minOfRow");
		var maxOfRow = mapRes.get("maxOfRow");
		
		if(n1 > minOfRow) {
			if(!checkIfBoxFilled(boxGrid, n1 - 1, rowsLen, columnsLen)) {
				numSet.add(n1 - 1);
			}
		}

		if(n1 < maxOfRow) {
			var x = 23;
			if(!checkIfBoxFilled(boxGrid, n1 + 1, rowsLen, columnsLen)) {
				numSet.add(n1 + 1);
			}
		}
	}
	
	if(currRowNum < rowsLen) {
		var n2 = currPt + columnsLen;

		if(!checkIfBoxFilled(boxGrid, n2, rowsLen, columnsLen)) {
			numSet.add(n2);
		}

		var mapRes = currentPtReferences(n2, rowsLen, columnsLen);
		var rowNum = mapRes.get("rowNum");
		var columnNum = mapRes.get("columnNum");
		var minOfRow = mapRes.get("minOfRow");
		var maxOfRow = mapRes.get("maxOfRow");
		
		if(n2 > minOfRow) {
			if(!checkIfBoxFilled(boxGrid, n2 - 1, rowsLen, columnsLen)) {
				numSet.add(n2 - 1);
			}
		}

		if(n2 < maxOfRow) {
			if(!checkIfBoxFilled(boxGrid, n2 + 1, rowsLen, columnsLen)) {
				numSet.add(n2 + 1);
			}
		}
	}

	if(currPt > minOfCurrRow) {
		if(!checkIfBoxFilled(boxGrid, currPt - 1, rowsLen, columnsLen)) {
			numSet.add(currPt - 1);
		}
	}

	if(currPt < maxOfCurrRow) {
		if(!checkIfBoxFilled(boxGrid, currPt + 1, rowsLen, columnsLen)) {
			numSet.add(currPt + 1);
		}
	}

	return numSet;
	
}

// var resArr = shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
// console.log(resArr[parseInt(resArr.length/2)]);
defineGrid();
plotNumbers();
