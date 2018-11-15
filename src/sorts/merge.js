const mergeSort = bars => {
    
    const yieldQueue = [];
    let barsCopy = [...bars];

    const merge = (left, right, start) => {
        const result = [];

        let leftLength = left.length;
        let rightLength = right.length;

        while (leftLength > 0 && rightLength > 0) {
            if (left[0].value <= right[0].value) {
                result.push(left.shift());
                leftLength--;
            } else {
                result.push(right.shift());
                rightLength--;
            }
        }
        
        const returnArray = [...result, ...left, ...right];
        const lb = barsCopy.slice(0, start);
        const rb = barsCopy.slice(start + returnArray.length, barsCopy.length);
        const resultYield = [...lb, ...returnArray, ...rb];

        barsCopy = resultYield;

        yieldQueue.push({
            bars: resultYield,
            sleep: true
        })

        return returnArray;
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
        return (function*() {
            for(let i = 0; i < yieldQueue.length; i++) {
                yield yieldQueue[i];
            }
        })();
    }

    return next();
};

export default mergeSort