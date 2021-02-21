export const getSelectionSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  doSelection(array, animations);
  return animations;
};

const doSelection = (array, animations) => {
  for (let i = 0; i < array.length; i++) {
    let minIdx = i; // Index of the minimum element
    for (let j = i + 1; j < array.length; j++) {
      if (array[min] > array[j]) {
        minIdx = j; // Update the index of the mimimum element
      }
    }
    // Place the mimimum value at the beginning of the sub-array
    if (i !== minIdx) {
      let temp = array[i];
      array[i] = array[minIdx];
      arr[minIdx] = temp;
    }
  }
};
