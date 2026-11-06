
const delay = (delayDuration) => new Promise(r => {
	setTimeout(r,delayDuration);
});

const delayWithinRange = (minDuration,maxDuration) => new Promise(r => {
	var validDuration = randomWithinRange(minDuration,maxDuration);
	//this.timechase+=validDuration;
	setTimeout(r,validDuration);
});

const renderNow = (component) => new Promise(r => {component.offsetHeight; setTimeout(r,0)});

const randomWithinLimits = (min,max) => {
    var validNum = 0;
    var lix = 0;
    while(validNum < min) {
        validNum = parseInt(Math.random()*max);
        lix+=1;

        if(lix > 200){
            throw new Error("unable to find a valid number");
        }
    }
    return validNum;
}



function randomRGB() {
	var red = Math.random() * 255;
	var green = Math.random() * 255;
	var blue = Math.random() * 255;

	return `rgb(${red},${green},${blue})`;
}


function randomRGB(rlimit,glimit,blimit) {

	if(rlimit < 0 || rlimit > 255 ||
	   glimit < 0 || glimit > 255 ||
	   blimit < 0 || blimit > 255 ) {
		throw new Error("invalid rgb limit");
	   }

	
	var red = Math.random() * rlimit;
	var green = Math.random() * glimit;
	var blue = Math.random() * blimit;

	return `rgb(${red},${green},${blue})`;
}


function randomRGBWithinLimits(rlimitmin, rlimitmax, glimitmin, glimitmax, blimitmin, blimitmax) {

	if(rlimitmin < 0 || rlimitmin > rlimitmax || rlimitmax > 255 ||
	   glimitmin < 0 || glimitmin > glimitmax || glimitmax > 255 ||
	   blimitmin < 0 || blimitmin > blimitmax || blimitmax > 255 ) {
		throw new Error("invalid rgb limit");
	}

	var red = randomWithinLimits(rlimitmin, rlimitmax);
	var green = randomWithinLimits(glimitmin, glimitmax);
	var blue = randomWithinLimits(blimitmin, blimitmax);

	return `rgb(${red},${green},${blue})`;
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


function update(mainArr, targetObj, targetObjEquatingProperty) {

    if(mainArr === undefined || targetObj === undefined || targetObjEquatingProperty === undefined){
        throw new Error("invalid parameters");
    } 

    if(targetObj instanceof Map) {
        
    } else if(targetObj instanceof Object) {
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
            
        } else if(currentObj instanceof Object) {
            
            if(Object.values(currentObj)[keyIndex] === Object.values(targetObj)[keyIndex]){
                finalArr.push(targetObj);
            } else {
                finalArr.push(currentObj);
            }
        } else {

			
		}
        
    }

    return finalArr;
    
}

class GridInfo {
	defaultFontSize;
	defaultBoxWidth;
	defaultBoxHeight;
	boxDivBg = '#f6f6f6';
	boxDivBdrBg = 'black';
	maxRows;
	maxColumns;
	totalBoxes;
}

gridInfo = new GridInfo();

class PiecesInfo {
	
	piecesArr = [];
	displacementCount = 0;
	piecesOnGrid = 16;
	currPiece;
	currCluster = 1;
	clusterMode = "DisplaceInfo";
	validDisplacementPtsArr = new Set();

	findPieceInfoByPieceID(currID) {
		for(var piece of this.piecesArr) {
			if(piece.id == currID) {
				return piece;
			}
		}
	}

	
}

const piecesInfo = new PiecesInfo();

class PieceInfo {
	id;
	pieceType;
	currPt;
	displacementInfoArr = [];
	pieceStatus;
	cluster;
	
	updatePiece(currPt, pieceStatus) {
		this.currPt = currPt;
        this.displacementInfoArr.push(currPt);
        this.pieceStatus = pieceStatus;
	}
}


function generateGrid(viewMaxWidth, viewMaxHeight, unitWidth, unitHeight, unitBdrOrBgr) {

	console.log("@generateGrid:");
	console.log("vwpw:",window.screen.width, "vwph:", window.screen.height);
	const maxRows = parseInt(viewMaxHeight / unitHeight);
	const maxColumns = parseInt(viewMaxWidth / unitWidth);
	const totalBoxes = maxRows * maxColumns;

	gridInfo.maxRows = maxRows;
	gridInfo.maxColumns = maxColumns;
	gridInfo.totalBoxes = totalBoxes;
	
	gridInfo.defaultBoxWidth = unitWidth;
	gridInfo.defaultBoxHeight = unitHeight;
	gridInfo.boxDivBg = '#f6f6f6';
	gridInfo.defaultFontSize = 30;

	console.log("maxRows: ",maxRows,"maxColumns:",maxColumns);

	var containerDiv = document.createElement("div");
	containerDiv.style.top = `20%`;
	containerDiv.style.minWidth = `100%`;
	containerDiv.style.minHeight = `100%`;
	containerDiv.style.border = `2px dotted black`;
	containerDiv.style.padding = `0%`;

	var boxGridDiv = document.createElement("div");
	boxGridDiv.id = "boxGrid"; 
	// boxGridDiv.style.position = `absolute`;
	boxGridDiv.style.background = gridInfo.boxDivBg;
	boxGridDiv.style.width = `100%;`
	boxGridDiv.style.height = `100%;`
	
	var uqboxid = 0;
	for(var i=0; i<maxRows; i++) {

		var boxRowDiv = document.createElement("div");
		boxRowDiv.id = `boxRow_${i+1}`;
		boxRowDiv.style.display = `flex`;
		boxRowDiv.style.columnGap = `0`;
		boxRowDiv.style.columns = maxColumns;
		
		for(var j=0; j<maxColumns; j++) {

			uqboxid+=1;
			var boxDiv = document.createElement("div");
			boxDiv.id = `box_${uqboxid}`;
			boxDiv.style.minWidth = `${unitWidth}px`;
			boxDiv.style.minHeight = `${unitHeight}px`;
			boxDiv.style.maxWidth = `${unitWidth}px`;
			boxDiv.style.maxHeight = `${unitHeight}px`;

			boxDiv.style.border = `1px solid black`;
			boxDiv.style.alignItems = `center`;
			boxDiv.style.justifyContent = `center`;
			boxDiv.style.textAlign = `center`;
			boxDiv.style.verticalAlign = `middle`;
			boxDiv.style.fontFamily = `Arial`;
			boxDiv.style.fontSize = gridInfo.defaultFontSize;

			//defineDisplacementBox(boxGridDiv, boxDiv, maxRows, maxColumns, totalBoxes);

			boxRowDiv.appendChild(boxDiv);
		}
		

		boxGridDiv.append(boxRowDiv);
	}
	

	containerDiv.append(boxGridDiv);
	document.body.append(containerDiv);

}


function defineGrid() {
	generateGrid(400,400,44,44,"blank");
	window.navigation.canGoBack = false;
}

function hasItem(arr, item) {
	for(var i=0; i<arr.length; i++){
		if(arr[i] == item) {
			return true;
		}
	}

	return false;
}

function minValOfArray(arr) {

	var minVal = arr[0];
	for(var i=0; i<arr.length; i++){
		if(arr[i] < minVal) {
			minVal = arr[i];
			//maxValIx = i;
		}
	}

	return minVal;
}

function maxValOfArray(arr) {

	var maxVal = arr[0];
	var maxValIx = 0;
	for(var i=0; i<arr.length; i++){
		if(arr[i] > maxVal) {
			maxVal = arr[i];
			maxValIx = i;
		}
	}

	return maxVal;
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


function hasSetArrayItem(mainArrSet, targetArrItem) {

	var targetArrItemStr = targetArrItem.join("");
	//assumes items are arrays
	for(item of mainArrSet) {

		var itemStr = item.join("");

		if(itemStr == targetArrItemStr) {
			return true;
		}
		
	}

	return false;
}


function checkIfAnEdgePt(pt, rowsLen, columnsLen, totalBoxes) {

	var mapRes0 = currentPtReferences(pt, rowsLen, columnsLen, totalBoxes);
	var rowNum = mapRes0.get("rowNum");
	var columnNum = mapRes0.get("columnNum");
	var minOfRow = mapRes0.get("minOfRow");
	var maxOfRow = mapRes0.get("maxOfRow");
	
	var boxesAroundPtCount = 0;
	if(rowNum > 1){
		boxesAroundPtCount += 3;
	}

	if(pt > minOfRow) {
		boxesAroundPtCount += 1;
	}
	
	if(pt < maxOfRow) {
		boxesAroundPtCount += 1;
	}

	if(rowNum < rowsLen){
		boxesAroundPtCount += 3;
	}

	if(boxesAroundPtCount < 8) {
		return true;
	}
	
	return false;
}


function checkIfAnEdgePtMap(pt, rowsLen, columnsLen, totalBoxes) {

	var mapRes0 = currentPtReferences(pt, rowsLen, columnsLen, totalBoxes);
	var rowNum = mapRes0.get("rowNum");
	var columnNum = mapRes0.get("columnNum");
	var minOfRow = mapRes0.get("minOfRow");
	var maxOfRow = mapRes0.get("maxOfRow");

	var finalMap = new Map();
	
	var boxesAroundPtCount = 0;
	if(rowNum > 1){
		boxesAroundPtCount += 3;
	}

	if(pt > minOfRow) {
		boxesAroundPtCount += 1;
	}
	
	if(pt < maxOfRow) {
		boxesAroundPtCount += 1;
	}

	if(rowNum < rowsLen){
		boxesAroundPtCount += 3;
	}

	if(boxesAroundPtCount < 8) {

		finalMap.set("result",true);
		if(minOfRow == pt){
			finalMap.set("edgeType","left");
		} else if(maxOfRow == pt){
			finalMap.set("edgeType","right");
		} else if(rowNum == 1){
			finalMap.set("edgeType","top");
		} else if(rowNum == rowsLen){
			finalMap.set("edgeType","bottom");
		}
		
	}
	
	return finalMap;
}


function checkIfOtherClusterPt(boxGrid, pt, cluster, rowsLen, columnsLen, totalBoxes) {

	var mapRes = currentPtReferences(pt, rowsLen, columnsLen, totalBoxes);
	var rowNum = mapRes.get("rowNum");
	var columnNum = mapRes.get("columnNum");
	var minOfRow = mapRes.get("minOfRow");
	var maxOfRow = mapRes.get("maxOfRow");

	if(minOfRow == undefined || maxOfRow == undefined) {
		return true;
	}
	
	if(boxGrid.childNodes[rowNum - 1]
		.childNodes[columnNum - 1]
		.childNodes[0].childNodes.length == 0) {
		return false;
	} else {
		try {
			var pieceID = boxGrid.childNodes[rowNum - 1]
			.childNodes[columnNum - 1]
			.childNodes[0].childNodes[0].id;
			var pieceInfo = piecesInfo.findPieceInfoByPieceID(pieceID);
	
			if(pieceInfo.cluster != cluster) {
				return true;
			}

		} catch (error) {
			console.log(error);
		}
	}
	
	return false;
	
}

function checkIfInvalidBoxPt(pt, totalBoxes) {

	if(pt == undefined || pt < 1 || pt > totalBoxes) {
		return true;
	} else {
		return false;
	}
}


function checkIfBoxFilled(boxGrid, currPt, rowsLen, columnsLen, totalBoxes) {

	try {
		var mapRes = currentPtReferences(currPt, rowsLen, columnsLen, totalBoxes);
		var rowNum = mapRes.get("rowNum");
		var columnNum = mapRes.get("columnNum");
		var minOfRow = mapRes.get("minOfRow");
		var maxOfRow = mapRes.get("maxOfRow");
	
		if(minOfRow == undefined || maxOfRow == undefined) {
			return true;
		}
		
		if(boxGrid.childNodes[rowNum - 1]
			.childNodes[columnNum - 1]
			.childNodes.length == 0 
		  ) {
			return false;
		} else {

			if(boxGrid.childNodes[rowNum - 1]
			.childNodes[columnNum - 1]
			.childNodes[0].childNodes.length == 0) {
				return false;
			}
		}
	
	} catch (error) {
		console.log(currPt, error);
	}
	
	return true;
}


function checkIfValidBoxFilled(boxGrid, mapRes) {

	//var mapRes = currentPtReferences(currPt, rowsLen, columnsLen, totalBoxes);
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


function currentBoxDivReferences(boxGrid, boxDiv) {
	var finalMap = new Map();

	for(var i=0; i<boxGrid.childNodes.length; i++) {
		//var currRow = boxGrid.childNodes[i];
		for(var j=0; j<boxGrid.childNodes[i].childNodes.length; j++) {
			if(boxDiv.id == boxGrid.childNodes[i].childNodes[j].id) {
				finalMap.set('rowNum',i);
				finalMap.set('columnNum',j);
				return finalMap;
			}
		}
		
	}
	
	return undefined;
}

function currentPtReferences(currPt, rowsLen, columnsLen, totalBoxes) {

	//var totalBoxes = rowsLen * columnsLen;
	var modR = currPt%rowsLen;
	var quoR = parseInt(currPt/rowsLen);
	var rowNum = modR > 0 ? quoR + 1 : quoR;
	var maxOfRow = rowNum * columnsLen;

	if(maxOfRow > totalBoxes) {
		return new Map();
	}
	
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


function plotCurrentPiece(boxGrid, currPieceType, cluster, currPt, currID, rowsLen, columnsLen, totalBoxes){

	try {
		
		var mapRes = currentPtReferences(currPt, rowsLen, columnsLen, totalBoxes);
		rowNum = mapRes.get("rowNum");
		columnNum = mapRes.get("columnNum");
		// minOfRow = mapRes.get("minOfRow"); 
		// maxOfRow = mapRes.get("maxOfRow"); 
	
		var currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
		
		if(currDiv.childNodes.length > 0) {
			//iffillingthesame
			console.log("dead end");
			//break;
			return false;
		}

		var insetPerc = 50 * (1 - (gridInfo.defaultFontSize/gridInfo.defaultBoxHeight));
		var insetInPx = parseInt(insetPerc/100 * gridInfo.defaultBoxHeight); 

		insetInPx = insetInPx + parseInt((Math.random() * 5));
		
		var pieceDiv = document.createElement("div");
		pieceDiv.style = `width:100%;height:100%;border:1px solid transparent;
		text-align:center;vertical-align:middle;z-index:1300;`;

		pieceDiv.addEventListener("click", (e) => {
			//piecesInfo.currCluster = 1;
			if(piecesInfo.currPiece != undefined) {
				clearPieceDisplacementInfo(boxGrid, piecesInfo.currPiece.currPt, rowsLen, columnsLen);
			}
			pieceDisplacementInfo(boxGrid, pieceDiv, rowsLen, columnsLen, totalBoxes);
			piecesInfo.clusterMode = "Displace";
	    });

		var pDivColor = randomRGB(224,210,200);
		var pDiv = document.createElement("p");
		pDiv.id = currID;
		pDiv.innerHTML = `${currPieceType}`;
		pDiv.style = `
		width:${gridInfo.defaultFontSize}px; height:${gridInfo.defaultFontSize}px;
		color:${pDivColor}; font-weight:700;
		border:1px dotted ${pDivColor};
		border-radius:${gridInfo.defaultFontSize}px;
		margin:${insetInPx}px;`;
		pieceDiv.append(pDiv);
		currDiv.append(pieceDiv);
		
		// boxDiv.style.alignItems = `center`;
		// 	boxDiv.style.justifyContent = `center`;
		// 	boxDiv.style.textAlign = `center`;
		// 	boxDiv.style.verticalAlign = `middle`;
		//currDiv.append(pDiv);
		
		if(piecesInfo.displacementCount == 0) {

			var pieceInfo = new PieceInfo();
			pieceInfo.id = currID;
			pieceInfo.currPt = currPt;
			pieceInfo.pieceType = currPieceType;
			pieceInfo.cluster = cluster;
			pieceInfo.pieceStatus = 1;
			var displacementInfoArr = [];
			displacementInfoArr.push(currPt);
			
			piecesInfo.displacementInfoArr = displacementInfoArr;
			piecesInfo.piecesArr.push(pieceInfo);
			
		} else {
			// var pieceInfo = piecesInfo.getPieceFromArr();
			// update()
		}


	} catch (error) {
		console.log(error, rowNum,columnNum);
	}
	return true;

}


function findBoxesAboveCurrent(currow, currPt) {

	var boxesAboveSet = new Set();
	var maxRows =  gridInfo.maxRows;
	var ix = currow;
	var boxPtAbove;
	while(ix>=0){
		boxPtAbove = currPt - gridInfo.maxColumns;
		boxesAboveSet.add(boxPtAbove);
		currPt = boxPtAbove;

		if(currPt <= 1) {
			break;
		}
		ix -= 1;
	}
	
	return boxesAboveSet;
	
}

async function plotNumbers() {

	const boxGrid = document.getElementById('boxGrid');

	for(var i=0; i<boxGrid.childNodes.length; i++) {
		var currrow  = boxGrid.childNodes[i].childNodes;
		var boxNumSet = new Set();
		boxNumSet.add(-1);
		
		var boxFilledCount = 0;
		var maxBoxes = currrow.length;

		for(var j=0; j<currrow.length; j++) {
		 
			var currbox = currrow[j];
			var boxesAboveSet = new Set();
			// var boxPtAbove = -1;
			// var boxAbove = "";
			if(i>0){
				var currboxidt = parseInt(currbox.id.replace("box_",""));
				// var mr = gridInfo.maxRows;
				// boxPtAbove = currboxidt - gridInfo.maxColumns;
				// boxAbove = document.getElementById("box_"+boxPtAbove);
				boxesAboveSet = findBoxesAboveCurrent(i, currboxidt);
			}
			
			var currboxNum = -1; 
			var invalidNum = true;
			while(invalidNum) {
				var cran = Math.random();
				currboxNum = parseInt(cran * maxBoxes);	 

				if(currboxNum > maxBoxes){ 
					//console.log("wh",currboxNum);
					continue;
				} 
				
				if(currboxNum == 0){
					continue;
				}
				
				if(boxNumSet.has(currboxNum) || boxesAboveSet.has(currboxNum)) {
					invalidNum = true;
					//console.log("invalid: row_"+i,currboxNum);
				} else {
					invalidNum = false;
				}
				
			}
		
			currbox.innerHTML = currboxNum;
			boxNumSet.add(currboxNum);
		}

		console.log("eorow_"+i);
		await delay(1);
		//break;
		
	}
	
}


function diffOf(arr) {

	var diff = arr[0];
	var ix = 1;
	while(ix != arr.length) {
		diff -= arr[ix];
		ix+=1;
	}

	return diff;
}



function checkIfInvalidNumSet(numSet, numArr) {

	var finalMap = new Map();
	finalMap.invalid = true;

	var numArrDiff = diffOf(numArr);
	for(item of numSet) {
		var itemDiff = diffOf(item);
		if(itemDiff == numArrDiff) {
			return finalMap;
		}


		var invalidArr = false;
		for(var i=0; i<item.length; i++) {
			for(var j=0; j<numArr.length; j++) {
				if(item[i] == numArr[j]) {
					// invalidArr = true;
					// break;
					return finalMap;
				}
			}
		}
	}

	finalMap.invalid = false;
	return finalMap;
}

function plotNumbers2() {

	var numbers = [];
	var ix = 0;
	while(ix != gridInfo.maxColumns) {
		ix+=1;
		numbers.push(ix);
	}


	console.log(numbers);

	var numArrSet = new Set();
	var numArrDiffValSet = new Set();
	numArrDiffValSet.add(0);
	
	var ixr = 0;
	while(ixr != gridInfo.maxRows) {
		ixr+=1;
		if(ixr > 0){

			currdiff = 0;
			var invalid = true;
			while(invalid) {
				var numArr = shuffle(numbers);
				//currdiff = diffOf(numArr);
				var mapres = checkIfInvalidNumSet(numArrSet,numArr);
				currdiff = mapres.currdiff;
				if(mapres.invalid) {
					invalid = true;
				} else {
					invalid = false;
				}
			}

			numArrSet.add(numArr);
			numArrDiffValSet.add(currdiff);
		
		} else {
			var numArr = shuffle(numbers);
			numArrSet.add(numArr)
			numArrDiffValSet.add(diffOf(numArr));
		}
		
	}


	var numArrSetArr = Array.from(numArrSet);

	console.log(numArrSet, numArrSetArr[2]);

	const boxGrid = document.getElementById('boxGrid');

	for(var i=0; i<boxGrid.childNodes.length; i++) {
		var currrow  = boxGrid.childNodes[i].childNodes;
		var boxNumSet = new Set();
		boxNumSet.add(-1);
		
		var boxFilledCount = 0;
		var maxBoxes = currrow.length;

		for(var j=0; j<currrow.length; j++) {
		 
			var currbox = currrow[j];
			currbox.innerHTML = numArrSetArr[i][j];

		}
	}

	
	
}


function factorial(size) {

	var result = 1;

	for (var i = size; i > 0; i--) {
		result *= i;
	}

	return result;

}




function joinArrays(preArr, currArr) {

	if(typeof preArr != Array) {
		var px = preArr;
		preArr = [];
		preArr.push(px);
	}

	if(typeof currArr != Array) {
		var px = currArr;
		currArr = [];
		currArr.push(px);
	}

	var finalArr = [];
	for(var i=0; i<currArr.length; i++){

		var fArr = [];

		if(typeof preArr != Array){
			fArr.push(preArr);
		} else {
			fArr.push(...preArr);
		}

		if(typeof currArr[i] != Array){
			fArr.push(currArr[i]);
		} else {
			fArr.push(...currArr[i]);
		}
		
		finalArr.push(fArr);
		
	}

	return finalArr;
}



function findSeqsForArr(numArr) {

	var numArrSet = new Set();
	var currArr = [];
	for(var i=0; i<numArr.length; i++) {		

		var tnum = numArr[i];
		var tnumIx = i;
		var tnumIxChangeCount = 0;
		var currArr = numArr;
	
		//1234
		//var preArr = arrayCopy(numArr, 0, i);
		for(var j=0; j<numArr.length - 1; j++) {

			tnumIx += 1;
			if(tnumIx > numArr.length - 1) {
				tnumIx = 0;
			}

			currArr = remove(currArr,tnum);
			if(tnumIx > currArr.length - 1) {
				currArr.push(tnum);
			} else {
				currArr = addAt(currArr,tnumIx, tnum);
			}
			
			tnumIxChangeCount+=1;

			if(hasSetArrayItem(numArrSet, currArr)) {
				//console.log("repeating seq", currArr);
			} else {
				numArrSet.add(currArr);
				//console.log(currArr);
			}
			
			
		}

	}

	return numArrSet;
	
}





function findSeqsForArr2(numArr) {

	var numArrSet = new Set();
	var currArr = [];
	for(var i=0; i<numArr.length; i++) {		

		var tnum = numArr[i];
		var tnumIx = i;
		var tnumIxChangeCount = 0;
		var currArr = numArr;
	
		//1234
		//var preArr = arrayCopy(numArr, 0, i);
		var incOrDec = parseInt(Math.random() * 3);
		var iodFactor = parseInt(Math.random() * numArr.length - 1);

		
		for(var j=0; j<numArr.length - 1; j++) {
		
			//tnumIx += 1;

			if(incOrDec == 1 || incOrDec == 0) {
				tnumIx += iodFactor;
			} else {
				tnumIx -= iodFactor;
			}

			
			if(tnumIx > numArr.length - 1 || tnumIx < 0) {
				tnumIx = 0;
			}

			currArr = remove(currArr,tnum);
			if(tnumIx > currArr.length - 1) {
				currArr.push(tnum);
			} else {
				currArr = addAt(currArr,tnumIx, tnum);
			}
			
			tnumIxChangeCount+=1;

			if(hasSetArrayItem(numArrSet, currArr)) {
				//console.log("repeating seq", currArr);
			} else {
				numArrSet.add(currArr);
				//console.log(currArr);
			}
			
			
		}

	}

	return numArrSet;
	
}



function addToColumnsSet2D(size,columnsSet2D, rowArr) {

	if(columnsSet2D.size == 0) {
		for(var i=0; i<size; i++) {
			columnsSet2D.add(new Set());
		}
	}

	var tix = 0;
	for(columnSet of columnsSet2D) {
		for(var i=tix; i<rowArr.length; i++) {
			columnSet.add(rowArr[i]);
			tix += 1;
			break;
		}
	}

	return columnsSet2D;
}


function checkIfArrValidForSeq(columnsSet2D, targetArr) {

	//console.log("checkIfArrValidForSeq");
	var columnsSet2DArr = Array.from(columnsSet2D);
	var tix = 0;
	for(item of targetArr) {

		for(var i=tix; i<columnsSet2DArr.length; i++) {

			if(columnsSet2DArr[i].has(item)) {
				return false;
			} 

			tix += 1;
			break;

		}

	}
			
	return true;
}


function plotNumbers3() {

	var size = gridInfo.maxColumns;
	var factRes = factorial(size);

	console.log("factres:",factRes);
	
	var numArr = [];
	var ix = 0;
	while(ix != size) {
		ix+=1;
		numArr.push(ix);
	}
	console.log(numArr);
	
	var numArrSet = new Set();
	numArrSet = findSeqsForArr(numArr);

	console.log("initial numArrSet:",numArrSet);

	for(itemArr of numArrSet) {
		var resArrSet = findSeqsForArr(itemArr);
		
		for(itemArr2 of resArrSet) {

			if(!hasSetArrayItem(numArrSet, itemArr2)) {
				numArrSet.add(itemArr2);
				console.log(numArrSet.size);
			}
		}
		
	}
	
	console.log("numArrSet", numArrSet, (numArrSet.size != factRes ? "invalid" : ""));

	var finalNumSetArr = [];
	var initItemIx = parseInt(Math.random() * factRes);
	var numArrSetArr = Array.from(numArrSet);

	var currRowArr = numArrSetArr[initItemIx];
	finalNumSetArr.push(currRowArr);
	console.log(currRowArr);

	var columnsSet2D = new Set();
	columnsSet2D = addToColumnsSet2D(size, columnsSet2D, currRowArr);
	
	for(var i=0; i<size; i++) {

		var validArr = [];
		for(var j=0; j<numArrSetArr.length; j++) {

			if(checkIfArrValidForSeq(columnsSet2D, numArrSetArr[j])){
				validArr = numArrSetArr[j];
				break;
			}
			
		}

		if(validArr.length == size) {
			finalNumSetArr.push(validArr);
			columnsSet2D = addToColumnsSet2D(size, columnsSet2D, validArr);
		}
		

	}


	console.log("finalNumSetArr", finalNumSetArr);


	const boxGrid = document.getElementById('boxGrid');

	for(var i=0; i<boxGrid.childNodes.length; i++) {
		var currrow  = boxGrid.childNodes[i].childNodes;
	
		for(var j=0; j<currrow.length; j++) {
		 
			var currbox = currrow[j];
			currbox.innerHTML = finalNumSetArr[i][j];

		}
	}


	
}


function plotNumbers4() {

	var size = gridInfo.maxColumns;
	var factRes = factorial(size);

	console.log("factres:",factRes);
	
	var numArr = [];
	var ix = 0;
	while(ix != size) {
		ix+=1;
		numArr.push(ix);
	}
	console.log(numArr);
	
	var numArrSet = new Set();
	numArrSet = findSeqsForArr(numArr);

	console.log("initial numArrSet:",numArrSet);

	var breakSetAddn = false;
	for(itemArr of numArrSet) {
		var resArrSet = findSeqsForArr2(itemArr);
		
		for(itemArr2 of resArrSet) {

			if(!hasSetArrayItem(numArrSet, itemArr2)) {
				numArrSet.add(itemArr2);

				if(numArrSet.size % 5000) {
					console.log(numArrSet.size);
				}
				
				if(numArrSet.size > parseInt(factRes/2)){
					breakSetAddn = true;
					break;
				}
			}
		}

		if(breakSetAddn){
			break;
		}
		
	}
	
	console.log("numArrSet", numArrSet, (numArrSet.size != factRes ? "invalid" : ""));

	var finalNumSetArr = [];
	var initItemIx = parseInt(Math.random() * factRes);
	var numArrSetArr = Array.from(numArrSet);

	var currRowArr = numArrSetArr[initItemIx];
	finalNumSetArr.push(currRowArr);
	console.log(currRowArr);

	var columnsSet2D = new Set();
	columnsSet2D = addToColumnsSet2D(size, columnsSet2D, currRowArr);
	
	for(var i=0; i<size; i++) {

		var validArr = [];
		for(var j=0; j<numArrSetArr.length; j++) {

			if(checkIfArrValidForSeq(columnsSet2D, numArrSetArr[j])){
				validArr = numArrSetArr[j];
				break;
			}
			
		}

		if(validArr.length == size) {
			finalNumSetArr.push(validArr);
			columnsSet2D = addToColumnsSet2D(size, columnsSet2D, validArr);
		}
		

	}


	console.log("finalNumSetArr", finalNumSetArr, (finalNumSetArr.size < size ? "build set failed" : ""));


	const boxGrid = document.getElementById('boxGrid');

	for(var i=0; i<boxGrid.childNodes.length; i++) {
		var currrow  = boxGrid.childNodes[i].childNodes;
	
		for(var j=0; j<currrow.length; j++) {
		 
			var currbox = currrow[j];
			currbox.innerHTML = finalNumSetArr[i][j];

		}
	}


	
}


function invalidComboExists(currArr, columnsSet2DArrToFill, cs2datfIx, targetIx) {


	if(targetIx > columnsSet2DArrToFill[cs2datfIx].length - 1 || targetIx < 0) {
		return true;
	}
	
	var targetNum = columnsSet2DArrToFill[cs2datfIx][targetIx];
	
	for(var i=0; i<currArr.length; i++) {
		//var resArr = joinArrays(targetNum, currArr[i]);
		//resArrSet.push(resArr);
		var resArr = [];
		if(typeof currArr[i] == Array) {
			currArr[i].push(targetNum);
			resArr = currArr[i]; 
		} else {
			resArr = [targetNum, currArr[i]];
		}

		var resArrSet = []; 
		//resArrSet.push(resArr);
		resArrSet.push(...Array.from(findSeqsForArr(resArr)));

		for(item of resArrSet) {
			if(hasSetArrayItem(columnsSet2DArrToFill, item)) {
				
				if(!hasItem(currArr, targetNum)) {
					return false;
				}
				
				return true;
			} else {
				//return false;
			}
		}

		
	}

	return false;
	
}


function solveRemaingRows(numArr, columnsSet2D, numArrSet) {

	var size = numArr.length;
	var solvedArrs = [];
	var remainingRowsCount = numArr.length - numArrSet.length;

	var columnsSet2DArrToFill = [];
	var columnsSet2DArr = Array.from(columnsSet2D);
	var tix = 0;
	
	for(var i=0; i<columnsSet2DArr.length; i++) {

		for(item of numArr) {

			if(!columnsSet2DArr[i].has(item)) {

				if(columnsSet2DArrToFill[i] == undefined) {
					columnsSet2DArrToFill[i] = [];
				}
				
				columnsSet2DArrToFill[i].push(item);
			}

		}

	}
	

	for(var i=0; i<remainingRowsCount; i++) {

		var currArr = [];
		//for(var j=0; j<columnsSet2DArrToFill.length; j++) {
		var cs2datfIx = 0;
		//var targetIx = 0;
		while(cs2datfIx != columnsSet2DArrToFill.length) {

			if(cs2datfIx > 5){
				var x = 292;
			}

			var maxIxVal = columnsSet2DArrToFill[cs2datfIx].length;
			
			var targetIx = parseInt(Math.random() * maxIxVal);
			
			if(targetIx > columnsSet2DArrToFill[cs2datfIx].length) {
				console.log("invalid targetIx");
				continue;
			}

			
			if(cs2datfIx == 0) {
				//currArr.push(columnsSet2DArrToFill[targetIx]);
			} else {

				var invalidIx = true;
				while(invalidIx) { 

					if(hasItem(currArr, columnsSet2DArrToFill[cs2datfIx][targetIx])
					  //|| columnsSet2D[cs2datfIx].has(columnsSet2DArrToFill[cs2datfIx][targetIx])
					  ){
						targetIx = parseInt(Math.random() * maxIxVal);
						if(targetIx > columnsSet2DArrToFill[cs2datfIx].length) {
							console.log("invalid targetIx");
							continue;
						} 
					} else {

						if(invalidComboExists(currArr, columnsSet2DArrToFill, cs2datfIx, targetIx)) {
							invalidIx = true;

							var ixes = [];
							for(var i=0; i<columnsSet2DArrToFill[cs2datfIx].length; i++){
								ixes.push(i);
							}

							ixes = removeFrom(ixes, targetIx);
							var invalidNewIx = true;
							while(invalidNewIx){
								var newIx = parseInt(Math.random() * ixes.length);
								if(newIx != targetIx){
									targetIx = newIx;  
									invalidNewIx = false;
								} else {
									invalidNewIx = true;
								}	
							}
							
							//targetIx = parseInt(Math.random() * columnsSet2DArrToFill[cs2datfIx].length);
						} else {
							invalidIx = false;
						}

						//currArr.push(columnsSet2DArrToFill[targetIx]);
						//columnsSet2DArrToFill = removeFrom(columnsSet2DArrToFill[cs2datfIx], targetIx);
					}
					
				}

			}

			if(targetIx > remainingRowsCount) {
				console.log(targetIx);
			}

			var currval = columnsSet2DArrToFill[cs2datfIx][targetIx];
			if(currval == undefined) {
				console.log(columnsSet2DArrToFill[cs2datfIx], targetIx);
			}
			currArr.push(currval);
			columnsSet2DArrToFill[cs2datfIx] = removeFrom(columnsSet2DArrToFill[cs2datfIx], targetIx);
			cs2datfIx += 1;
			
		}

		if(checkIfArrValidForSeq(columnsSet2D, currArr)) {
			solvedArrs.push(currArr);
			invalid = false;
			columnsSet2D = addToColumnsSet2D(size, columnsSet2D, currArr);
		} else {
			throw new Error("invalid solve");
		}
		// } else {
		// 	console.log("repseq",h);
		// }

	}

	var finalMap = new Map();
	finalMap.set('solvedArrs', solvedArrs);
	finalMap.set('columnsSet2D', columnsSet2D);

	return finalMap;

	
}




function plotNumbers5() {

	var size = gridInfo.maxColumns;
	var factRes = factorial(size);

	console.log("factres:",factRes);
	
	var numArr = [];
	var ix = 0;
	while(ix != size) {
		ix+=1;
		numArr.push(ix);
	}
	console.log(numArr);
	
	var numArrSet = [];
	var finalNumSetArr = [];

	var currArr = shuffle(numArr);
	numArrSet.push(currArr);

	var columnsSet2D = new Set();
	columnsSet2D = addToColumnsSet2D(size, columnsSet2D, currArr);

	var tnumIx = 0;
	for(var h=1; h<size; h++) {
		
		var invalid = true;
		var ix = 0;
		while(invalid){ 

			for(var i=0; i<currArr.length - 1; i++) {
			
				var tnum = currArr[i];

				var incOrDec = parseInt(Math.random() * 3);
				var iodFactor = parseInt(Math.random() * numArr.length);
	
				for(var j=0; j<currArr.length - 1; j++) {
	
					//tnumIx += 1;
		
					if(incOrDec <= 1) {
						tnumIx += iodFactor;
					} else {
						tnumIx -= iodFactor;
					}
		
					if(tnumIx > numArr.length - 1 || tnumIx < 0) {
						tnumIx = 0;
					}
		
					currArr = remove(currArr,tnum);
					if(tnumIx > currArr.length - 1) {
						currArr.push(tnum);
					} else {
						currArr = addAt(currArr,tnumIx, tnum);
					}
					
				}
	
			}
			
			if(checkIfArrValidForSeq(columnsSet2D, currArr)) {
				numArrSet.push(currArr);
				invalid = false;
				columnsSet2D = addToColumnsSet2D(size, columnsSet2D, currArr);
			} else {
				console.log("repseq",h+1);
			}


			// improv
			// if(ix > 1460){ 
			// 	//break;

			// 	if(numArrSet.length/size * 100 > 75){
			// 		var resMap = solveRemaingRows(numArr, columnsSet2D, numArrSet);
			// 		var solvedArrs = resMap.get('solvedArrs');
			// 		columnsSet2D = resMap.get('columnsSet2D');
			// 		for(arr of solvedArrs) {
			// 			numArrSet.push(arr);
			// 		}
			// 	}
			// }

			if(numArrSet.length >= size) {
				break;
			}

			ix += 1; 

		}
		
	}

	
	var finalNumSetArr = Array.from(numArrSet);
	console.log(finalNumSetArr.size < size ? "build set failed" : "");

	const boxGrid = document.getElementById('boxGrid');
	for(var i=0; i<boxGrid.childNodes.length; i++) {
		var currrow  = boxGrid.childNodes[i].childNodes;
	
		for(var j=0; j<currrow.length; j++) {
			var currbox = currrow[j];
			var boxVal = finalNumSetArr[i][j];
			currbox.innerHTML = boxVal != undefined ? boxVal : "";

		}
	}


	
}







// console.log(factorial(6),factorial(7),factorial(8),factorial(9));

defineGrid();
plotNumbers5();


// function randomNumberTest() {

// 	var maxIxVal = 2;
// 	var targetIx = 0;
// 	var resArr = [];
// 	for(var i=0; i<300; i++) {
// 		targetIx = parseInt(Math.random() * maxIxVal);
// 		resArr.push(targetIx);
// 	}
	


// 	for(var i=0; i<resArr.length; i++){
// 		if(resArr[i] >= maxIxVal) {
// 			console.log("invalid", resArr[i]);
// 		}
// 	}


// 	console.log(resArr);
// }

// randomNumberTest();







