const bubble = bars => {
  const swap = (index1, index2) => {
    [bars[index1], bars[index2]] = [bars[index2], bars[index1]];
  };

  const next = function*() {
    
    let stopper = bars.length;

    while(stopper > 0){
      for(let index = 0; index < stopper - 1; index++) {

        const one = bars[index];
        const another = bars[index + 1];
        

        // one.selected = true;
        // another.selected = true;
        // yield { bars, sleep: true };
        
        if (one.value > another.value) {
          one.selected = true;
          swap(index, index + 1);
          yield { bars, sleep: true };

          one.selected = false;
        }
  
        // one.selected = false;
        // another.selected = false;
      }
  
      stopper--;
    }

    for(let i = 0; i < bars.length; i++) {
      bars[i].selected = true;

      yield { bars, sleep: true };
      bars[i].selected = false;
    }
  }

  return next();
};

export default bubble;