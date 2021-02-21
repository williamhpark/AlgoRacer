import React, { useState, useEffect } from "react";

import "./SortingAlgoRace.css";
import SortingInstance from "../SortingInstance/SortingInstance";

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 50;

// All the supported sorting algorithms
const ALGO_OPTIONS = ["merge", "bubble", "selection"];

const SortingAlgoRace = () => {
  const [array, setArray] = useState([]);
  const [selectedAlgos, setSelectedAlgos] = useState([]);
  const [isOneRacing, setIsOneRacing] = useState(false);
  const [isTwoRacing, setIsTwoRacing] = useState(false);
  const [finishedOrder, setFinishedOrder] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  // Returns a random int between the specified min and max arguments
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Sets the "array" state property to a new random array
  const resetArray = () => {
    setFinishedOrder([]);

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

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  // Randomly selects two items from the algorithm options and selects them
  const selectRandomAlgos = () => {
    setFinishedOrder([]);
    let algosArray;
    do {
      algosArray = [];
      while (algosArray.length < 2) {
        const randomAlgo = randomArrayElement(ALGO_OPTIONS);
        if (!algosArray.includes(randomAlgo)) {
          algosArray.push(randomAlgo);
        }
      }
    } while (arraysAreEqual(algosArray, selectedAlgos));
    setSelectedAlgos(algosArray);
  };

  const selectAlgoOne = (algo) => {
    const algosArray = selectedAlgos.slice(0);
    if (selectedAlgos.length === 2) {
      algosArray.shift();
    }
    algosArray.unshift(algo);
    setSelectedAlgos(algosArray);
  };

  const selectAlgoTwo = (algo) => {
    const algosArray = selectedAlgos.slice(0);
    if (selectedAlgos.length === 0) {
      algosArray.push(null);
    }
    if (selectedAlgos.length === 2) {
      algosArray.pop();
    }
    algosArray.push(algo);
    setSelectedAlgos(algosArray);
  };

  const startRace = (e) => {
    e.preventDefault();
    setIsOneRacing(true);
    setIsTwoRacing(true);
  };

  // Variable representing if either of the algorithm sorting instances is racing or not
  const isEitherRacing = isOneRacing || isTwoRacing;

  return (
    <div>
      <button onClick={() => resetArray()} disabled={isEitherRacing}>
        Generate New Array
      </button>
      <button disabled={isEitherRacing} onClick={() => selectRandomAlgos()}>
        Random
      </button>
      <form onSubmit={startRace}>
        <input
          type="submit"
          value="RACE"
          disabled={selectedAlgos.length < 2 || isEitherRacing}
        />
      </form>
      <p>Choose the two sorting algorithms that you want to see race!</p>
      {finishedOrder.length == 2 && (
        <p>
          Winner:{" "}
          {finishedOrder[0][0].toUpperCase() + finishedOrder[0].slice(1)} Sort!
        </p>
      )}
      <SortingInstance
        algorithm={selectedAlgos[0]}
        array={array}
        id={1}
        isRacing={isOneRacing}
        setIsRacing={setIsOneRacing}
        finishedOrder={finishedOrder}
        setFinishedOrder={setFinishedOrder}
        selectedAlgos={selectedAlgos}
        updateSelectedAlgo={selectAlgoOne}
        isEitherRacing={isEitherRacing}
      />
      <SortingInstance
        algorithm={selectedAlgos[1]}
        array={array}
        id={2}
        isRacing={isTwoRacing}
        setIsRacing={setIsTwoRacing}
        finishedOrder={finishedOrder}
        setFinishedOrder={setFinishedOrder}
        selectedAlgos={selectedAlgos}
        updateSelectedAlgo={selectAlgoTwo}
        isEitherRacing={isEitherRacing}
      />
    </div>
  );
};

export default SortingAlgoRace;
