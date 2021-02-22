export const getInsertionSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return array;
  doInsertion(array, animations);
  return animations;
};

const doInsertion = (array, animations) => {
  for (let i = 1; i < array.length; i++) {
    let current = array[i];
    animations.push(["c", i, null]);
    let j = i - 1;
    animations.push(["c", j, null]);
    while (j >= 0 && current < array[j]) {
      animations.push(["h", j + 1, array[j]]);
      array[j + 1] = array[j];
      animations.push(["u", j, null]);
      j--;
      animations.push(["c", j, null]);
    }
    animations.push(["h", j + 1, current]);
    array[j + 1] = current;
    animations.push(["u", j, null]);
    animations.push(["u", i, null]);
  }
};
