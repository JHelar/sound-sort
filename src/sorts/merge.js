const mergeSort = bars => {
    
    const yieldQueue = [];
    let barsCopy = [...bars];

    const merge = (left, right, start) => {
        const result = [];

        let leftLength = left.length;
        let rightLength = right.length;

        const makeBarCopy = () => {
            const returnArray = [...result, ...left, ...right];
            const lb = barsCopy.slice(0, start);
            const rb = barsCopy.slice(start + returnArray.length, barsCopy.length);
            const resultYield = [...lb, ...returnArray, ...rb].map(tmp => Object.assign({}, tmp));

            return {
                resultYield,
                returnArray
            };
        }

        while (leftLength > 0 && rightLength > 0) {
            if (left[0].value <= right[0].value) {
                let leftShift = Object.assign({}, left.shift());
                leftShift.selected = true;
                result.push(leftShift);
                leftLength--;
                yieldQueue.push({
                    bars: makeBarCopy().resultYield,
                    sleep: true
                })
                leftShift.selected = false;
            } else {
                let rightShift = Object.assign({}, right.shift());
                rightShift.selected = true;
                result.push(rightShift);
                rightLength--;
                yieldQueue.push({
                    bars: makeBarCopy().resultYield,
                    sleep: true
                })

                rightShift.selected = false;
            }

        }
        
        
        const barCopy = makeBarCopy();
        barsCopy = barCopy.resultYield;

        yieldQueue.push({
            bars: barCopy.resultYield,
            sleep: true
        })

        return barCopy.returnArray;
    };

    const sort = (list, start) => {
        if (list.length <= 1) {
            return [...list];
        }

        let left = [];
        let right = [];

        let leftStart = start;
        let rightStart = false;

        list.forEach((bar, i) => {
            if (i < (list.length / 2)) {
                left.push(bar);
            } else {
                if(!rightStart) rightStart = start + i;
                right.push(bar);
            }
        });

        left = sort([...left], leftStart);
        right = sort([...right], rightStart);

        return merge(left, right, start);
    };

    const next = () => {
        sort([...bars], 0)
        for(let i = 0; i < bars.length; i++) {
            bars[i].selected = false;
        }
        return (function*() {
            for(let i = 0; i < yieldQueue.length; i++) {
                yield yieldQueue[i];
            }
            for(let i = 0; i < barsCopy.length; i++) {
                barsCopy[i].selected = true;
            
                yield { bars: barsCopy, sleep: true };
                barsCopy[i].selected = false;
            }
        })();
    }

    return next();
};

export default mergeSort