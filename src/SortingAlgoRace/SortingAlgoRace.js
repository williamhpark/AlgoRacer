import React, { useState, useEffect } from "react";

import "./SortingAlgoRace.css";
import SortingInstance from "../SortingInstance/SortingInstance";

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// All the supported sorting algorithms
const ALGO_OPTIONS = ["merge", "bubble", "selection"];

const SortingAlgoRace = () => {
  const [array, setArray] = useState([]);
  const [selectedAlgos, setSelectedAlgos] = useState([]);
  const [isChecked, setIsChecked] = useState({
    merge: false,
    bubble: false,
    selection: false,
  });
  const [isDisabled, setIsDisabled] = useState({
    merge: false,
    bubble: false,
    selection: false,
  });

  useEffect(() => {
    resetArray();
  }, []);

  useEffect(() => {
    console.log(selectedAlgos);
  }, [selectedAlgos]);

  // Returns a random int between the specified min and max arguments
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Sets the "array" state property to a new random array
  const resetArray = () => {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    setArray(array);
  };

  // Returns a random element from the array inputted to the function
  const randomArrayElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  // Randomly selects two items from the algorithm options and selects them
  const selectRandomAlgos = () => {
    const algosArr = [];
    const checkedObj = {
      merge: false,
      bubble: false,
      selection: false,
    };
    const disabledObj = {
      merge: true,
      bubble: true,
      selection: true,
    };
    while (algosArr.length < 2) {
      const randomAlgo = randomArrayElement(ALGO_OPTIONS);
      if (!algosArr.includes(randomAlgo)) {
        algosArr.push(randomAlgo);
        checkedObj[randomAlgo] = true;
        disabledObj[randomAlgo] = false;
      }
    }
    setSelectedAlgos(algosArr);
    setIsChecked(checkedObj);
    setIsDisabled(disabledObj);
  };

  const updateSelectedAlgos = (algo) => {
    let algosArr = selectedAlgos;
    if (
      !isChecked[algo] && // The algorithm is initially unchecked
      selectedAlgos.length < 2 // Less than two algorithms have been selected
    ) {
      // Adding the checked algorithm to selectedAlgos
      algosArr.push(algo);
      console.log(algosArr);
    } else if (isChecked[algo]) {
      // The algorithm is initially checked
      // Removing the unchecked algorithm from selectedAlgos
      algosArr = algosArr.filter((item) => item !== algo); // Remove the unchecked algorithm from the array of selected algorithms
    }
    setSelectedAlgos(algosArr);

    if (algosArr.length === 2) {
      // Disable any algorithms that were not selected
      const disabledObj = { merge: true, bubble: true, selection: true };
      algosArr.forEach((item) => (disabledObj[item] = false));
      setIsDisabled(disabledObj);
    } else {
      setIsDisabled({ merge: false, bubble: false, selection: false });
    }

    // Toggle the checkbox
    const checkedObj = isChecked;
    checkedObj[algo] = !checkedObj[algo];
    setIsChecked(checkedObj);
  };

  return (
    <div>
      <button onClick={() => resetArray()}>Generate New Array</button>
      <p>Choose the two sorting algorithms that you want to see race!</p>
      <label for="merge">Merge Sort</label>
      <input
        id="merge"
        name="merge"
        type="checkbox"
        checked={isChecked.merge}
        disabled={isDisabled.merge}
        onClick={() => updateSelectedAlgos("merge")}
      />
      <label for="bubble">Bubble Sort</label>
      <input
        id="bubble"
        name="bubble"
        type="checkbox"
        checked={isChecked.bubble}
        disabled={isDisabled.bubble}
        onClick={() => updateSelectedAlgos("bubble")}
      />
      <label for="selection">Selection Sort</label>
      <input
        id="selection"
        name="selection"
        type="checkbox"
        checked={isChecked.selection}
        disabled={isDisabled.selection}
        onClick={() => updateSelectedAlgos("selection")}
      />
      <button onClick={() => selectRandomAlgos()}>Random</button>
      <SortingInstance algorithm={selectedAlgos[0]} array={array} />
      <SortingInstance algorithm={selectedAlgos[1]} array={array} />
      <button>RACE</button>
    </div>
  );
};

export default SortingAlgoRace;
