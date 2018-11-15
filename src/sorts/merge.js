const yoo = function*(str, current, stop) {
  yield str;

  if (current < stop) {
    current = current +1;
    for (const tmp of yoo(str + "!lol!", current, stop)) {
      yield tmp;
    }
  }

  return;
};

for(const test of yoo('start', 0, 1)){
    console.log(test)
}

const mergeSort = bars => {
  const merge = (left, right) => {
    const result = [];

    while(left.length > 0 && right.length > 0){
      if(left[0] <= right[0]){
        result.push(left.splice(0, 1))
      } else {
        result.push(right.splice(0, 1))
      }
    }

    return [...result, ...left, ...right];
  }

  const sort = (list, start, end) => {

    if(list <= 1){
      return;
    }

    let left = [];
    let right = [];

    list.forEach((bar, i) => {
      if(i < (list.length / 2 )){
        left.push(bar);
      } else {
        right.push(bar);
      }
    })

    left = sort(left);
    right = sort(right);

    yield merge(left, right);
  }

  const next = function*(){
  
  }
}