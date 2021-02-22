export const getSelectionSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  doSelection(array, animations);
  return animations;
};

const doSelection = (array, animations) => {
  for (let i = 0; i < array.length; i++) {
    animations.push(["c", i, null]);
    let minIdx = i; // Index of the minimum element.
    for (let j = i + 1; j < array.length; j++) {
      animations.push(["c", j, null]);
      if (array[j] < array[minIdx]) {
        minIdx = j; // Update the index of the mimimum element.
      }
      animations.push(["u", j, null]);
    }
    // Place the mimimum value at the beginning of the sub-array.
    if (minIdx !== i) {
      let temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
      animations.push(["h", i, array[i]]);
      animations.push(["h", minIdx, array[minIdx]]);
    }
    animations.push(["u", i, minIdx]);
  }
};
