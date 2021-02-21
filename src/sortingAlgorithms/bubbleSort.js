export const getBubbleSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  doBubble(array, animations);
  return animations;
};

const doBubble = (array, animations) => {
  let swap = null;
  let n = array.length;
  let temp = null;
  do {
    swap = false;
    for (let i = 0; i < n - 1; i++) {
      animations.push(["c", i, i + 1]);
      if (array[i] > array[i + 1]) {
        temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swap = true;
        animations.push(["h", i, array[i]]);
        animations.push(["h", i + 1, array[i + 1]]);
        animations.push(["u", i, null]);
      }
      // Set the color of the second to last and last items in the round back to PRIMARY_COLOR
      if (i === n - 2) {
        animations.push(["u", i, i + 1]);
      }
    }
    n--;
  } while (swap);
};
