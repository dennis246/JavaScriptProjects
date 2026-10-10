
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

	var unitSize = devicePixelRatio * 10;
	
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
			// boxDiv.style.minWidth = `${unitWidth}px`;
			// boxDiv.style.minHeight = `${unitHeight}px`;
			// boxDiv.style.maxWidth = `${unitWidth}px`;
			// boxDiv.style.maxHeight = `${unitHeight}px`;

			
			boxDiv.style.minWidth = `${unitSize}px`;
			boxDiv.style.minHeight = `${unitSize}px`;
			boxDiv.style.maxWidth = `${unitSize}px`;
			boxDiv.style.maxHeight = `${unitSize}px`;

			//boxDiv.style.border = `1px solid transparent`;
			boxDiv.style.alignItems = `center`;
			boxDiv.style.justifyContent = `center`;
			boxDiv.style.textAlign = `center`;
			boxDiv.style.verticalAlign = `middle`;
			boxDiv.style.fontFamily = `Arial`;
			boxDiv.style.fontSize = gridInfo.defaultFontSize;
		
			defineEditableBox(boxGridDiv, boxDiv, maxRows, maxColumns, totalBoxes);

			boxRowDiv.appendChild(boxDiv);
		}
		

		boxGridDiv.append(boxRowDiv);
	}
	

	containerDiv.append(boxGridDiv);
	document.body.append(containerDiv);

}


function defineGrid() {
	generateGrid(640,480,1,1,"blank");
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


async function pieceDisplacementInfo(boxGrid, currBoxDiv, rowsLen, columnsLen, totalBoxes) {


	try {

		if(currBoxDiv.childNodes.length == 0){
			return;
		}
		
	} catch (error) {
		console.log(currBoxDiv);
	}
	
	
	// var currID = currBoxDiv.id;
	// var currIDArr = currID.split("_");
	var currPieceID = currBoxDiv.childNodes[0].id;
	// var currPieceIDArr = currPieceID.split("_");
	// var currPieceType = currPieceIDArr[0];
	// var currPt = parseInt(currPieceIDArr[1]);

	var currPt = piecesInfo.findPieceInfoByPieceID(currPieceID).currPt;

	if(currPt/1 != currPt){
		throw new Error("invalid currpt");
	}

	if(piecesInfo.currPiece != undefined && currPieceID != piecesInfo.currPiece) {
		clearPieceDisplacementInfo(boxGrid, parseInt(currBoxDiv.id.split("_")[1]), rowsLen, columnsLen);
	}


	piecesInfo.validDisplacementPtsArr = [];
	var validDisplacementPtsArr = findValidPtsOfPiece(boxGrid, currPieceID, rowsLen, columnsLen, totalBoxes);
	
	var bgColor = randomRGBWithinLimits(200,255,200,255,200,255);
	//var bdColor = bgColor < 255 - 20 ? bgColor + 10 : bgColor;
	piecesInfo.validDisplacementPtsArr.push(parseInt(currPt));
	for(pt of validDisplacementPtsArr) {
		
		var mapRes0 = currentPtReferences(pt, rowsLen, columnsLen, totalBoxes);
		rowNum = mapRes0.get("rowNum");
		columnNum = mapRes0.get("columnNum");

		try {
			var currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
		} catch (error) {
			console.log(error);
		}

		currDiv.style.background = `${bgColor}`;
		currDiv.style.border = `1px solid grey`;
		//await delay(120);
		piecesInfo.validDisplacementPtsArr.push(pt);
		//await delay(1201);
	}

	var currpiece = piecesInfo.findPieceInfoByPieceID(currPieceID);
	piecesInfo.currPiece = currpiece;
	//console.log("pieceDisplacementInfo_set", piecesInfo);
}


async function clearPieceDisplacementInfo(boxGrid, currPt, rowsLen, columnsLen, totalBoxes) {

	// var mapRes = currentBoxDivReferences(boxGrid, currDiv);
	// var currPt = mapRes.get("rowNum") * rowsLen + (mapRes.get("columnNum") + 1);
	// var currPt = parseInt(currDiv.id.split("_")[1]);
	//console.log("clearPieceDisplacementInfo:",currDiv.id, currPt, piecesInfo);

	console.log("clearPieceDisplacementInfo:", currPt, piecesInfo);
	
	if(!hasItem(piecesInfo.validDisplacementPtsArr, currPt)) {
		for(var currPt of piecesInfo.validDisplacementPtsArr) {

			if(currPt/1 != currPt) {
				continue;
			}

			var mapRes0 = currentPtReferences(currPt, rowsLen, columnsLen, totalBoxes);
			rowNum = mapRes0.get("rowNum");
			columnNum = mapRes0.get("columnNum");

			try {
			
				var currDiv = boxGrid.childNodes[rowNum - 1].childNodes[columnNum - 1];
				//currDiv.id = currID;
				currDiv.style.background = gridInfo.boxDivBg;
				currDiv.style.border = `1px solid ${gridInfo.boxDivBdrBg}`;
		
			} catch (error) {
				console.log(rowNum,columnNum,error);
			}
		}

		//await delay(420);
		piecesInfo.validDisplacementPtsArr = [];
	} else {
		console.log("fromclear: valid pt");

		if(piecesInfo.currPiece != undefined) {
			piecesInfo.clusterMode = "Displace";
		}
	}
	
	
}


function findValidPtsOfPiece(boxGrid, currPieceID, rowsLen, columnsLen, totalBoxes) {

	var currPieceIDArr = currPieceID.split("_");
	var currPieceType = currPieceIDArr[0];
	//var currPt = currPieceIDArr[1];
	
	var validPtsArr = new Set();
	var pieceInfo = piecesInfo.findPieceInfoByPieceID(currPieceID);
	var initialClusterPt = parseInt(pieceInfo.id.split("_")[1]);
	
	if(currPieceType == String.fromCodePoint(9823)){

		if(pieceInfo.cluster == 1) {
			var fpt = pieceInfo.currPt - columnsLen;
			if(!checkIfBoxFilled(boxGrid, fpt, rowsLen, columnsLen)){
				validPtsArr.add(fpt);

				if(pieceInfo.displacementInfoArr == undefined || 
				   pieceInfo.displacementInfoArr.length == 0) {
					 var f2pt = pieceInfo.currPt - columnsLen - columnsLen;
					 if(!checkIfBoxFilled(boxGrid, f2pt, rowsLen, columnsLen)){
						validPtsArr.add(f2pt);
					 }
				}
				
			}
		
			
	
			var tlpt = pieceInfo.currPt - columnsLen - 1;
			var edgeMapRes = checkIfAnEdgePtMap(tlpt, rowsLen, columnsLen, totalBoxes);
			if(edgeMapRes.get("edgeType") == undefined){
	
				if(checkIfBoxFilled(boxGrid, tlpt, rowsLen, columnsLen, totalBoxes)) {
					if(checkIfOtherClusterPt(boxGrid, tlpt, pieceInfo.cluster, rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(tlpt);
					 }
				}
				
			}
	
			var trpt = pieceInfo.currPt - columnsLen + 1;
			edgeMapRes = checkIfAnEdgePtMap(trpt, rowsLen, columnsLen, totalBoxes);
			if(edgeMapRes.get("edgeType") == undefined){
				if(checkIfBoxFilled(boxGrid, trpt, rowsLen, columnsLen, totalBoxes)) {
					if(checkIfOtherClusterPt(boxGrid, trpt, pieceInfo.cluster, rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(trpt);
					 }
				}
			}

		} else {
			
		}

		
	} else if(currPieceType == String.fromCodePoint(9821)){

		var startPt = pieceInfo.currPt;
		var mapRes = new Map();

		var tlpt = startPt; 
		//var tlpt = startPt - columnsLen - 1;
		var tlptValid = true;

		var trpt = startPt; 
		//var trpt = startPt - columnsLen + 1;
		var trptValid = true;

		var blpt = startPt; 
		//var blpt = startPt + columnsLen - 1;
		var blptValid = true;

		var brpt = startPt;
		//var brpt = startPt + columnsLen + 1;
		var brptValid = true;
		
		var ix = 0;
		var invalidCount = 0;
		while(invalidCount < 4) {


			if(tlptValid){
				mapRes = currentPtReferences(tlpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tlptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, tlpt, rowsLen, columnsLen, totalBoxes)
					  && tlpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tlpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 

						tlptValid = false;
						invalidCount += 1;
					} else {
						
						if(//tlpt != startPt && 
						   checkIfAnEdgePt(tlpt, rowsLen, columnsLen, totalBoxes) 
							&& mapRes.get("minOfRow") == tlpt){
							tlptValid = false;
							invalidCount += 1;
						} 

						//if(tlpt != initialClusterPt) {
							validPtsArr.add(tlpt);
						//}

						tlpt = tlpt - columnsLen - 1;

					}
					
				} 
			}



			if(trptValid){
				mapRes = currentPtReferences(trpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					// trpt >= mapRes.get("maxOfRow")
					// validPtsArr.add(trpt);
					trptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, trpt, rowsLen, columnsLen, totalBoxes)
					  && trpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, trpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 

						trptValid = false;
						invalidCount += 1;
					} else {
						
						if(//trpt != startPt &&
						   checkIfAnEdgePt(trpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == trpt
						){
							trptValid = false;
							invalidCount += 1;
						} 
						
						//if(trpt != initialClusterPt) {
							validPtsArr.add(trpt);
						//}

						trpt = trpt - columnsLen + 1;
						
					}
					
				} 
			}


			if(blptValid){
				mapRes = currentPtReferences(blpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){

					//blpt <= mapRes.get("minOfRow")
					//validPtsArr.add(blpt);
					blptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, blpt, rowsLen, columnsLen, totalBoxes)
					  && blpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, blpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 

						blptValid = false;
						invalidCount += 1;
					} else {
						
						
						if(//blpt != startPt && 
						   checkIfAnEdgePt(blpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("minOfRow") == blpt
						){
							blptValid = false;
							invalidCount += 1;
						} 

						//if(blpt != initialClusterPt) {
							validPtsArr.add(blpt);
						//}

						blpt = blpt + columnsLen - 1;
					}
					
				} 
			}



			if(brptValid){
				mapRes = currentPtReferences(brpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){
					// brpt >= mapRes.get("maxOfRow")
					// validPtsArr.add(brpt);
					brptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, brpt, rowsLen, columnsLen, totalBoxes)
					  && brpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, brpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 

						brptValid = false;
						invalidCount += 1;
					} else {
						
						if(//brpt != startPt && 
						   checkIfAnEdgePt(brpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == brpt){
							brptValid = false;
							invalidCount += 1;
						} 
						
						//if(brpt != initialClusterPt) {
							validPtsArr.add(brpt);
						//}

						brpt = brpt + columnsLen + 1;
						
					}
					
				} 
			}


			ix += 1;
			if(ix > 64) {
				break;
			}
		}
		
	}  else if(currPieceType == String.fromCodePoint(9820)){

		var startPt = pieceInfo.currPt;
		var mapRes = new Map();

		var tpt = startPt; //startPt - columnsLen;
		var tptValid = true;

		var bpt = startPt; //startPt + columnsLen;
		var bptValid = true;

		var lpt = startPt; //startPt - 1;
		var lptValid = true;
		var mapReslpt0 = new Map();

		var rpt = startPt; //startPt + 1;
		var rptValid = true;
		var mapResrpt0 = new Map();
		
		var ix = 0;
		var invalidCount = 0;
		while(invalidCount < 4) {

			if(tptValid){
				
				mapRes = currentPtReferences(tpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, tpt, rowsLen, columnsLen, totalBoxes)
					  && tpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(tpt);
						 } 

						tptValid = false;
						invalidCount += 1; 
					
					} else {
						validPtsArr.add(tpt);
						tpt = tpt - columnsLen;
					}

				} 
			}

			if(bptValid){
				mapRes = currentPtReferences(bpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					bptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, bpt, rowsLen, columnsLen, totalBoxes)
					  && bpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, bpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(bpt);
						 } 

						bptValid = false;
						invalidCount += 1;
					} else {
						validPtsArr.add(bpt);
						bpt = bpt + columnsLen;
					}
					
				} 
			}

			if(lptValid){
				mapRes = currentPtReferences(lpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					lptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, lpt, rowsLen, columnsLen, totalBoxes)
					  && lpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, lpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 

						lptValid = false;
						invalidCount += 1;
					} else {

						if(lpt < mapReslpt0.get("minOfRow")) {
							lptValid = false;
							invalidCount += 1;
						} else {
							validPtsArr.add(lpt);
							mapReslpt0 = mapRes;
							lpt = lpt - 1;
						}

					}
					
				} 
			}

			if(rptValid){
				mapRes = currentPtReferences(rpt, rowsLen, columnsLen, totalBoxes);

				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					rptValid = false;
					invalidCount += 1;
				} else {

					if(checkIfBoxFilled(boxGrid, rpt, rowsLen, columnsLen, totalBoxes)
					  && rpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, rpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(rpt);
						 } 

						rptValid = false;
						invalidCount += 1;

					} else {

						if(rpt > mapResrpt0.get("maxOfRow")) {
							rptValid = false;
							invalidCount += 1;
						} else {
							validPtsArr.add(rpt);
							mapResrpt0 = mapRes;
							rpt = rpt + 1;
						}

					}

				} 
			}

			ix += 1; 

			if(ix > totalBoxes) {
				break;
			}

		}

	} else if(currPieceType == String.fromCodePoint(9819)) {

	
		var startPt = pieceInfo.currPt;
		var mapRes = new Map();

		var tlpt = startPt; 
		//var tlpt = startPt - columnsLen - 1;
		var tlptValid = true;

		var trpt = startPt; 
		//var trpt = startPt - columnsLen + 1;
		var trptValid = true;

		var blpt = startPt; 
		//var blpt = startPt + columnsLen - 1;
		var blptValid = true;

		var brpt = startPt;
		//var brpt = startPt + columnsLen + 1;
		var brptValid = true;

		var tpt = startPt; //startPt - columnsLen;
		var tptValid = true;

		var bpt = startPt; //startPt + columnsLen;
		var bptValid = true;

		var lpt = startPt; //startPt - 1;
		var lptValid = true;
		var mapReslpt0 = new Map();

		var rpt = startPt; //startPt + 1;
		var rptValid = true;
		var mapResrpt0 = new Map();
		
		var ix = 0;
		var invalidCount = 0;
		while(invalidCount < 8) {


			if(tlptValid){
				mapRes = currentPtReferences(tlpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tlptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, tlpt, rowsLen, columnsLen, totalBoxes)
					  && tlpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tlpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						tlptValid = false;
						invalidCount += 1;
					} else {
						
						if(//tlpt != startPt && 
						   checkIfAnEdgePt(tlpt, rowsLen, columnsLen, totalBoxes) 
							&& mapRes.get("minOfRow") == tlpt){
							tlptValid = false;
							invalidCount += 1;
						} 
	
						//if(tlpt != initialClusterPt) {
							validPtsArr.add(tlpt);
						//}
	
						tlpt = tlpt - columnsLen - 1;
	
					}
					
				} 
			}
	
	
			if(trptValid){
				mapRes = currentPtReferences(trpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					trptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, trpt, rowsLen, columnsLen, totalBoxes)
					  && trpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, trpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						trptValid = false;
						invalidCount += 1;
					} else {
						
						if(//trpt != startPt &&
						   checkIfAnEdgePt(trpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == trpt
						){
							trptValid = false;
							invalidCount += 1;
						} 
						
						//if(trpt != initialClusterPt) {
							validPtsArr.add(trpt);
						//}
	
						trpt = trpt - columnsLen + 1;
						
					}
					
				} 
			}
	
	
			if(blptValid){
				mapRes = currentPtReferences(blpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){
	
					//blpt <= mapRes.get("minOfRow")
					//validPtsArr.add(blpt);
					blptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, blpt, rowsLen, columnsLen, totalBoxes)
					  && blpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, blpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						blptValid = false;
						invalidCount += 1;
					} else {
						
						
						if(//blpt != startPt && 
						   checkIfAnEdgePt(blpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("minOfRow") == blpt
						){
							blptValid = false;
							invalidCount += 1;
						} 
	
						//if(blpt != initialClusterPt) {
							validPtsArr.add(blpt);
						//}
	
						blpt = blpt + columnsLen - 1;
					}
					
				} 
			}
	
	
	
			if(brptValid){
				mapRes = currentPtReferences(brpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){
					// brpt >= mapRes.get("maxOfRow")
					// validPtsArr.add(brpt);
					brptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, brpt, rowsLen, columnsLen, totalBoxes)
					  && brpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, brpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						brptValid = false;
						invalidCount += 1;
					} else {
						
						if(//brpt != startPt && 
						   checkIfAnEdgePt(brpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == brpt){
							brptValid = false;
							invalidCount += 1;
						} 
						
						//if(brpt != initialClusterPt) {
							validPtsArr.add(brpt);
						//}
	
						brpt = brpt + columnsLen + 1;
						
					}
					
				} 
			}
	
	
			
			if(tptValid){
				
				mapRes = currentPtReferences(tpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, tpt, rowsLen, columnsLen, totalBoxes)
					  && tpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(tpt);
						 } 
	
						tptValid = false;
						invalidCount += 1; 
					
					} else {
						validPtsArr.add(tpt);
						tpt = tpt - columnsLen;
					}
	
				} 
			}
	
			if(bptValid){
				mapRes = currentPtReferences(bpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					bptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, bpt, rowsLen, columnsLen, totalBoxes)
					  && bpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, bpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(bpt);
						 } 
	
						bptValid = false;
						invalidCount += 1;
					} else {
						validPtsArr.add(bpt);
						bpt = bpt + columnsLen;
					}
					
				} 
			}

			// if(lpt <= 1){
			// 	var ns = lpt;
			// }
	
			if(lptValid){
				mapRes = currentPtReferences(lpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					lptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, lpt, rowsLen, columnsLen, totalBoxes)
					  && lpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, lpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						lptValid = false;
						invalidCount += 1;
					} else {

						if(lpt < mapReslpt0.get("minOfRow")) {
							lptValid = false;
							invalidCount += 1;
						} else {
							validPtsArr.add(lpt);
							mapReslpt0 = mapRes;
							lpt = lpt - 1;
						}

					}
					
				} 
			}

			// if(lpt == 0){
			// 	var ns = lpt;
			// }
	
			if(rptValid){
				mapRes = currentPtReferences(rpt, rowsLen, columnsLen, totalBoxes);
	
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					rptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, rpt, rowsLen, columnsLen, totalBoxes)
					  && rpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, rpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(rpt);
						 } 
	
						rptValid = false;
						invalidCount += 1;
	
					} else {

						if(rpt > mapResrpt0.get("maxOfRow")) {
							rptValid = false;
							invalidCount += 1;
						} else {
							validPtsArr.add(rpt);
							mapResrpt0 = mapRes;
							rpt = rpt + 1;
						}
						
					}
	
				} 
			}
	
			ix += 1; 
	
			if(ix > totalBoxes) {
				break;
			}
		}
		
	} else if(currPieceType == String.fromCodePoint(9818)) {


		var startPt = pieceInfo.currPt;
		var mapRes = new Map();

		var tlpt = startPt; 
		//var tlpt = startPt - columnsLen - 1;
		var tlptValid = true;

		var trpt = startPt; 
		//var trpt = startPt - columnsLen + 1;
		var trptValid = true;

		var blpt = startPt; 
		//var blpt = startPt + columnsLen - 1;
		var blptValid = true;

		var brpt = startPt;
		//var brpt = startPt + columnsLen + 1;
		var brptValid = true;

		var tpt = startPt; //startPt - columnsLen;
		var tptValid = true;

		var bpt = startPt; //startPt + columnsLen;
		var bptValid = true;

		var lpt = startPt; //startPt - 1;
		var lptValid = true;

		var rpt = startPt; //startPt + 1;
		var rptValid = true;
		
		var ix = 0;
		var invalidCount = 0;
		while(invalidCount < 8) {


			if(tlptValid){
				mapRes = currentPtReferences(tlpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tlptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, tlpt, rowsLen, columnsLen, totalBoxes)
					  && tlpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tlpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						// tlptValid = false;
						// invalidCount += 1;
					} else {
						
						if(//tlpt != startPt && 
						   checkIfAnEdgePt(tlpt, rowsLen, columnsLen, totalBoxes) 
							&& mapRes.get("minOfRow") == tlpt){
							tlptValid = false;
							invalidCount += 1;
						} 
	
						if(//tlpt != initialClusterPt &&
						   tlpt != startPt) {
							validPtsArr.add(tlpt);
						}
	
					}

					if(//tlpt != initialClusterPt &&
					   tlpt != startPt) {
						tlptValid = false;
						invalidCount += 1;
					}
					
					tlpt = tlpt - columnsLen - 1;
					
				} 
			}
	
	
			if(trptValid){
				mapRes = currentPtReferences(trpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					trptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, trpt, rowsLen, columnsLen, totalBoxes)
					  && trpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, trpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						// trptValid = false;
						// invalidCount += 1;
					} else {
						
						if(//trpt != startPt &&
						   checkIfAnEdgePt(trpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == trpt
						){
							trptValid = false;
							invalidCount += 1;
						} 
						
						if(//trpt != initialClusterPt &&
						   trpt != startPt) {
							validPtsArr.add(trpt);
						}
	
					}

					if(//trpt != initialClusterPt &&
					   trpt != startPt) {
						trptValid = false;
						invalidCount += 1;
					}

					trpt = trpt - columnsLen + 1;
					
				} 
			}
	
	
			if(blptValid){
				mapRes = currentPtReferences(blpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){
	
					//blpt <= mapRes.get("minOfRow")
					//validPtsArr.add(blpt);
					blptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, blpt, rowsLen, columnsLen, totalBoxes)
					  && blpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, blpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						// blptValid = false;
						// invalidCount += 1;
					} else {
						
						
						if(//blpt != startPt && 
						   checkIfAnEdgePt(blpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("minOfRow") == blpt
						){
							blptValid = false;
							invalidCount += 1;
						} 
	
						if(//blpt != initialClusterPt &&
						   blpt != startPt) {
							validPtsArr.add(blpt);
						}
	
					}

					if(//blpt != initialClusterPt &&
					   blpt != startPt) {
						blptValid = false;
						invalidCount += 1;
					}

					blpt = blpt + columnsLen - 1;
					
				} 
			}
	
	
	
			if(brptValid){
				mapRes = currentPtReferences(brpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)
				  ){
					// brpt >= mapRes.get("maxOfRow")
					// validPtsArr.add(brpt);
					brptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, brpt, rowsLen, columnsLen, totalBoxes)
					  && brpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, brpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						// brptValid = false;
						// invalidCount += 1;
					} else {
						
						if(//brpt != startPt && 
						   checkIfAnEdgePt(brpt, rowsLen, columnsLen, totalBoxes)
							&& mapRes.get("maxOfRow") == brpt){
							brptValid = false;
							invalidCount += 1;
						} 
						
						if(//brpt != initialClusterPt &&
						   brpt != startPt) {
							validPtsArr.add(brpt);
						}
						
					}

					if(//brpt != initialClusterPt &&
					   brpt != startPt) {
						brptValid = false;
						invalidCount += 1;
					}

					brpt = brpt + columnsLen + 1;
					
				} 
			}
	
	
			
			if(tptValid){
				
				mapRes = currentPtReferences(tpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					tptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, tpt, rowsLen, columnsLen, totalBoxes)
					  && tpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, tpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(tpt);
						 } 
	
						// tptValid = false;
						// invalidCount += 1; 
					
					} else {

						if(//tpt != initialClusterPt &&
						   tpt != startPt) {
							validPtsArr.add(tpt);
						}
						
					}


					if(//tpt != initialClusterPt &&
					   tpt != startPt) {
						tptValid = false;
						invalidCount += 1; 
					}

					tpt = tpt - columnsLen;
					
	
				} 
			}
	
			if(bptValid){
				mapRes = currentPtReferences(bpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes)){
					bptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, bpt, rowsLen, columnsLen, totalBoxes)
					  && bpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, bpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(bpt);
						 } 
	
						// bptValid = false;
						// invalidCount += 1;
					} else {

						if(//bpt != initialClusterPt && 
						   bpt != startPt) {
							validPtsArr.add(bpt);
						}
						
					}


					if(//bpt != initialClusterPt && 
					   bpt != startPt) {
						bptValid = false;
						invalidCount += 1;
					}

					bpt = bpt + columnsLen;
					
				} 
			}
	
			if(lptValid){
				mapRes = currentPtReferences(lpt, rowsLen, columnsLen, totalBoxes);
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) || 
				   lpt <= mapRes.get("minOfRow")
				  ){
					validPtsArr.add(lpt);
					lptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, lpt, rowsLen, columnsLen, totalBoxes)
					  && lpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, lpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(lpt);
							
						 } 
	
						// lptValid = false;
						// invalidCount += 1;
					} else {

						if(//lpt != initialClusterPt &&
						   lpt != startPt) {
							validPtsArr.add(lpt);
						}
						
					}

					if(//lpt != initialClusterPt && 
					   lpt != startPt) {
						lptValid = false;
						invalidCount += 1;
					}

					lpt = lpt - 1;
					
				} 
			}
	
			if(rptValid){
				mapRes = currentPtReferences(rpt, rowsLen, columnsLen, totalBoxes);
	
				if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
				   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
				   rpt >= mapRes.get("maxOfRow")){
					validPtsArr.add(rpt);
					rptValid = false;
					invalidCount += 1;
				} else {
	
					if(checkIfBoxFilled(boxGrid, rpt, rowsLen, columnsLen, totalBoxes)
					  && rpt != pieceInfo.currPt) {
						if(checkIfOtherClusterPt(boxGrid, rpt, pieceInfo.cluster,
												 rowsLen, columnsLen, totalBoxes)) {
							validPtsArr.add(rpt);
						 } 
	
						// rptValid = false;
						// invalidCount += 1;
	
					} else {

						if(//rpt != initialClusterPt &&
						   rpt != startPt) {
							validPtsArr.add(rpt);
						}
						
					}

					if(//rpt != initialClusterPt &&
					   rpt != startPt) {
						rptValid = false;
						invalidCount += 1;
					}

					rpt = rpt + 1;
	
				} 
			}
	
			ix += 1; 
	
			if(ix > totalBoxes) {
				break;
			}
		}

		

	} else if(currPieceType == String.fromCodePoint(9822)){

		var startPt = pieceInfo.currPt;
		var mapRes = new Map();

		var tllpt = startPt; 
		var tllptValid = true;
		var mapRestllpt0 = new Map();

		var thlpt = startPt; 
		var thlptValid = true;
		var mapResthlpt0 = new Map();

		var tlrpt = startPt; 
		var tlrptValid = true;
		var mapRestlrpt0 = new Map();

		var thrpt = startPt; 
		var thrptValid = true;
		var mapResthrpt0 = new Map();

		var bllpt = startPt; 
		var bllptValid = true;
		var mapResbllpt0 = new Map();

		var bhlpt = startPt; 
		var bhlptValid = true;
		var mapResbhlpt0 = new Map();

		var blrpt = startPt; 
		var blrptValid = true;
		var mapResblrpt0 = new Map();

		var bhrpt = startPt; 
		var bhrptValid = true;
		var mapResbhrpt0 = new Map();

		var ix = 0;
		var invalidCount = 0;
		while(invalidCount < 8) {


		if(tllptValid){
			mapRes = currentPtReferences(tllpt, rowsLen, columnsLen, totalBoxes);
			if(tllpt == startPt) {
				mapRestllpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) || 
			   mapRestllpt0.get("minOfRow") == undefined){
				tllptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, tllpt, rowsLen, columnsLen, totalBoxes)
				  && tllpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, tllpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(tllpt);
						
					 } 

					tllptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(tllpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("minOfRow") == tllpt){
						tllptValid = false;
						invalidCount += 1;
					} 

					if(tllpt < mapRestllpt0.get("minOfRow")) {
						tllptValid = false;
						invalidCount += 1;
					} else {
						if(tllpt != startPt) {
							validPtsArr.add(tllpt);
							tllptValid = false;
							invalidCount += 1;
						} else {
							mapRestllpt0 = currentPtReferences(tllpt - columnsLen, rowsLen, columnsLen, totalBoxes);
							tllpt = tllpt - columnsLen - 2;
						}
					}

				
				}
				
			} 
		}


		if(thlptValid){
			mapRes = currentPtReferences(thlpt, rowsLen, columnsLen, totalBoxes);
			if(thlpt == startPt) {
				mapResthlpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapResthlpt0.get("minOfRow") == undefined){
				thlptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, thlpt, rowsLen, columnsLen, totalBoxes)
				  && thlpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, thlpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(thlpt);
						
					 } 

					thlptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(thlpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("minOfRow") == thlpt){
						thlptValid = false;
						invalidCount += 1;
					} 

					if(thlpt < mapResthlpt0.get("minOfRow")) {
						thlptValid = false;
						invalidCount += 1;
					} else {
						if(thlpt != startPt) {
							validPtsArr.add(thlpt);
							thlptValid = false;
							invalidCount += 1;
						} else {
							mapResthlpt0 = currentPtReferences(thlpt - columnsLen - columnsLen, rowsLen, columnsLen, totalBoxes);
							thlpt = thlpt - columnsLen - columnsLen - 1;
						}
						
					}

				}
				
			} 
		}




		if(tlrptValid){
			mapRes = currentPtReferences(tlrpt, rowsLen, columnsLen, totalBoxes);
			if(tlrpt == startPt) {
				mapRestlrpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapRestlrpt0.get("maxOfRow") == undefined){
				tlrptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, tlrpt, rowsLen, columnsLen, totalBoxes)
				  && tlrpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, tlrpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(tlrpt);
						
					 } 

					tlrptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(tlrpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("maxOfRow") == tlrpt){
						tlrptValid = false;
						invalidCount += 1;
					} 

					if(tlrpt > mapRestlrpt0.get("maxOfRow")) {
						tlrptValid = false;
						invalidCount += 1;
					} else {

						if(tlrpt != startPt) {
							validPtsArr.add(tlrpt);
							tlrptValid = false;
							invalidCount += 1;
						} else {
							mapRestlrpt0 = currentPtReferences(tlrpt - columnsLen, rowsLen, columnsLen, totalBoxes);
							tlrpt = tlrpt - columnsLen + 2;
						}
					}

					
				}
				
			} 
		}


		if(thrptValid){
			mapRes = currentPtReferences(thrpt, rowsLen, columnsLen, totalBoxes);
			if(thrpt == startPt) {
				mapResthrpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapResthrpt0.get("maxOfRow") == undefined){
				thrptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, thrpt, rowsLen, columnsLen, totalBoxes)
				  && thrpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, thrpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(thrpt);
						
					 } 

					thrptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(thrpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("maxOfRow") == thrpt){
						thrptValid = false;
						invalidCount += 1;
					} 

					if(thrpt > mapResthrpt0.get("maxOfRow")) {
						thrptValid = false;
						invalidCount += 1;
					} else {

						if(thrpt != startPt) {
							validPtsArr.add(thrpt);
							thrptValid = false;
							invalidCount += 1;
						} else {
							mapResthrpt0 = currentPtReferences(thrpt - columnsLen - columnsLen, rowsLen, columnsLen, totalBoxes);
							thrpt = thrpt - columnsLen - columnsLen + 1;
						}
					}

				}
				
			} 
		}



		//shf
		if(bllptValid){
			mapRes = currentPtReferences(bllpt, rowsLen, columnsLen, totalBoxes);
			if(bllpt == startPt) {
				mapResbllpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) || 
				mapResbllpt0.get("minOfRow") == undefined){
				bllptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, bllpt, rowsLen, columnsLen, totalBoxes)
				  && bllpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, bllpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(bllpt);
						
					 } 

					bllptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(bllpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("minOfRow") == bllpt){
						bllptValid = false;
						invalidCount += 1;
					} 


					if(bllpt < mapResbllpt0.get("minOfRow")) {
						bllptValid = false;
						invalidCount += 1;
					} else {

						if(bllpt != startPt) {
							validPtsArr.add(bllpt);
							bllptValid = false;
							invalidCount += 1;
						} else {
							mapResbllpt0 = currentPtReferences(bllpt + columnsLen, rowsLen, columnsLen, totalBoxes);
							bllpt = bllpt + columnsLen - 2;
						}
					}


				}
				
			} 
		}


		if(bhlptValid){
			mapRes = currentPtReferences(bhlpt, rowsLen, columnsLen, totalBoxes);
			if(bhlpt == startPt) {
				mapResbhlpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapResbhlpt0.get("minOfRow") == undefined){
				bhlptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, bhlpt, rowsLen, columnsLen, totalBoxes)
				  && bhlpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, bhlpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(bhlpt);
						
					 } 

					bhlptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(bhlpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("minOfRow") == bhlpt){
						bhlptValid = false;
						invalidCount += 1;
					} 

					if(bhlpt < mapResbhlpt0.get("minOfRow")) {
						bhlptValid = false;
						invalidCount += 1;
					} else {

						if(bhlpt != startPt) {
							validPtsArr.add(bhlpt);
							bhlptValid = false;
							invalidCount += 1;
						} else {
							mapResbhlpt0 = currentPtReferences(bhlpt + columnsLen + columnsLen, rowsLen, columnsLen, totalBoxes);
							bhlpt = bhlpt + columnsLen + columnsLen - 1;
						}
					}

				}
				
			} 
		}

			
		if(blrptValid){
			mapRes = currentPtReferences(blrpt, rowsLen, columnsLen, totalBoxes);
			if(blrpt == startPt) {
				mapResblrpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapResblrpt0.get("maxOfRow") == undefined){
				blrptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, blrpt, rowsLen, columnsLen, totalBoxes)
				  && blrpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, blrpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(blrpt);
						
					 } 

					blrptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(blrpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("maxOfRow") == blrpt){
						blrptValid = false;
						invalidCount += 1;
					} 


					if(blrpt > mapResblrpt0.get("maxOfRow")) {
						blrptValid = false;
						invalidCount += 1;
					} else {

						if(blrpt != startPt) {
							validPtsArr.add(blrpt);
							blrptValid = false;
							invalidCount += 1;
						} else {
							mapResblrpt0 = currentPtReferences(blrpt + columnsLen, rowsLen, columnsLen, totalBoxes);
							blrpt = blrpt + columnsLen + 2;
						}
					}

				}
				
			} 
		}


		if(bhrptValid){
			mapRes = currentPtReferences(bhrpt, rowsLen, columnsLen, totalBoxes);
			if(bhrpt == startPt) {
				mapResbhrpt0 = mapRes;
			}
			if(checkIfInvalidBoxPt(mapRes.get("minOfRow"), totalBoxes) ||
			   checkIfInvalidBoxPt(mapRes.get("maxOfRow"), totalBoxes) ||
			   mapResbhrpt0.get("maxOfRow") == undefined){
				bhrptValid = false;
				invalidCount += 1;
			} else {

				if(checkIfBoxFilled(boxGrid, bhrpt, rowsLen, columnsLen, totalBoxes)
				  && bhrpt != pieceInfo.currPt) {
					if(checkIfOtherClusterPt(boxGrid, bhrpt, pieceInfo.cluster,
											 rowsLen, columnsLen, totalBoxes)) {
						validPtsArr.add(bhrpt);
						
					 } 

					bhrptValid = false;
					invalidCount += 1;
				} else {
					
					if(checkIfAnEdgePt(bhrpt, rowsLen, columnsLen, totalBoxes) 
						&& mapRes.get("maxOfRow") == bhrpt){
						bhrptValid = false;
						invalidCount += 1;
					} 

					if(bhrpt > mapResbhrpt0.get("maxOfRow")) {
						bhrptValid = false;
						invalidCount += 1;
					} else {

						if(bhrpt != startPt) {
							validPtsArr.add(bhrpt);
							bhrptValid = false;
							invalidCount += 1;
						} else {
							mapResbhrpt0 = currentPtReferences(bhrpt + columnsLen + columnsLen, rowsLen, columnsLen, totalBoxes);
							bhrpt = bhrpt + columnsLen + columnsLen + 1;
						}
						
					}


				}
				
			} 
		}

		ix += 1; 
		if(ix > totalBoxes) {
			break;
		}

	}
	}

	return validPtsArr;
}

function defineEditableBox(boxGrid, currBoxDiv, rowsLen, columnsLen, totalBoxes) {

	currBoxDiv.addEventListener("mouseover", (e) => {

		//if(gridInfo)
		currBoxDiv.style.background = `black`;
		
	});

}

defineGrid();




