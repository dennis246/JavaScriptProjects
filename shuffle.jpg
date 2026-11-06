function shuffle(mainArr) {

        var totalSize = mainArr.length - 1;

        var cuts = 0;
        while (cuts == 0) {
            cuts = parseInt(Math.random() * totalSize);
        }

        var cascadeFactor = totalSize;
        var cascades = 0;
        while (cascades == 0) {
            cascades = parseInt(Math.random() * cascadeFactor);
        }

        while (cuts > 0) {
            mainArr = doShuffle(mainArr, cascades);
            cuts--;
        }

        return mainArr;

    }

     function doShuffle(currentArr, cascades) {

        try {

            var maxIndex = currentArr.length - 1; 
            var finalCutArr = [];
            var cutAt = parseInt(Math.random() * maxIndex);

            if (cutAt > maxIndex) {
                cutAt = parseInt(Math.random() * maxIndex / 2);
            }

            if (cutAt + cascades > maxIndex) {
                cascades = 1;
            }

            if (cascades < maxIndex) {
                // var cutAtCopy = cutAt;
                for (var x = 0; x < cascades; x++) {

                    if (cutAt > maxIndex) {
                        cutAt = maxIndex - cutAt;
                    }

                    finalCutArr.push(currentArr[cutAt]);
                    currentArr = removeFrom(currentArr, cutAt);
                }

            }

            var appendAt = parseInt(Math.random() * maxIndex / 2);
            while (cutAt == appendAt) {
                appendAt = parseInt(Math.random() * maxIndex / 2);
            }

            for (var x = 0; x < finalCutArr.length; x++, appendAt++) {

                if(appendAt > currentArr.length - 1) {
                    currentArr.push(finalCutArr[x]);
                } else {
                    currentArr = addAt(currentArr, appendAt, finalCutArr[x]);
                }
                
            }

        } catch (error) {
            throw new Error(error,currentArr, appendAt, finalCutArr[x]);
        }


        return currentArr;
    }


    function addAt(mainArr, targetIndex, item) {

        var mainArrInc = [];

        if (targetIndex < 0 || targetIndex > mainArr.length - 1) {
            throw new Error("Invalid index for method addAt");
        }

        // if (targetIndex > mainArr.length - 1) {
        //     targetIndex = mainArr.length - 1;
        // }

        var itemAddedInd = 0;
        for (var i = 0, pi = 0; i < mainArr.length; i++, pi++) {
            if (i == targetIndex) {
                mainArrInc[pi] = item;
                ++pi;
                ++itemAddedInd;
            }
            mainArrInc[pi] = mainArr[i];
        }

        if (itemAddedInd == 0) {
            mainArrInc[mainArrInc.length - 1] = item;
        }

        return mainArrInc;

    }


    function removeFrom(mainArr, ti) {

        var finalArr = [];
        for (var i = 0; i < mainArr.length; i++) {

            if (i == ti) {
                continue;
            } else {
                finalArr.push(mainArr[i]);
            }
        }

        return finalArr;
    }

    function remove(mainArr, item) {

        var finalArr = [];
        for (var i = 0; i < mainArr.length; i++) {

            if (mainArr[i] == item) {
                continue;
            } else {
                finalArr.push(mainArr[i]);
            }
        }

        return finalArr;
    }


//console.log(shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));
//console.log(shuffle([0,1,2]));
