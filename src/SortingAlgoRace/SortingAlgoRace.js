import React, { useState, useEffect } from "react";

import "./SortingAlgoRace.css";
import SortingInstance from "../SortingInstance/SortingInstance";

// All the supported sorting algorithms.
const ALGO_OPTIONS = ["merge", "bubble", "selection", "insertion"];

// The default array size.
const DEFAULT_ARRAY_BARS = 25;

// The default animation speed.
const DEFAULT_ANIMATION_SPEED = 20;

const SortingAlgoRace = () => {
  const [numberOfArrayBars, setNumberOfArrayBars] = useState(
    DEFAULT_ARRAY_BARS
  );
  const [animationSpeed, setAnimationSpeed] = useState(DEFAULT_ANIMATION_SPEED);
  const [array, setArray] = useState([]);
  const [selectedAlgos, setSelectedAlgos] = useState([]);
  const [isOneRacing, setIsOneRacing] = useState(false);
  const [isTwoRacing, setIsTwoRacing] = useState(false);
  const [finishedOrder, setFinishedOrder] = useState([]);

  useEffect(() => {
    resetArray(DEFAULT_ARRAY_BARS);
  }, []);

  // If a race has finished, set the array in the state to the sorted array.
  // Handles the case where the user starts the race again on the sorted arrays.
  useEffect(() => {
    if (finishedOrder.length === 2) {
      const temp = array.sort((a, b) => {
        return a - b;
      });
      setArray(temp);
    }
  }, [finishedOrder]);

  const handleRangeChange = (e) => {
    resetArray(e.target.value);
    setNumberOfArrayBars(e.target.value);
  };

  const handleSpeedChange = (e) => {
    setAnimationSpeed(e.target.value);
  };

  // Returns a random int between the specified min and max arguments.
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Sets the "array" state property to a new random array.
  const resetArray = (numberOfArrayBars) => {
    setFinishedOrder([]);
    const array = [];
    for (let i = 0; i < numberOfArrayBars; i++) {
      array.push(randomIntFromInterval(5, 100));
    }
    setArray(array);
  };

  // Returns a random element from the array inputted to the function.
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

  // Randomly selects two items from the algorithm options and selects them.
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
    if (selectedAlgos.length > 0) {
      // If the first algorithm was previously selected, remove the previous selection.
      algosArray.shift();
    }
    algosArray.unshift(algo);
    setSelectedAlgos(algosArray);
  };

  const selectAlgoTwo = (algo) => {
    const algosArray = selectedAlgos.slice(0);
    if (selectedAlgos.length === 0) {
      // If initially no algorithm was selected, set the first item to null.
      algosArray.push(null);
    } else if (selectedAlgos.length === 2) {
      // If initially two algorithms were already selected, remove the previously selected second item.
      algosArray.pop();
    }
    algosArray.push(algo);
    setSelectedAlgos(algosArray);
  };

  const startRace = () => {
    setIsOneRacing(true);
    setIsTwoRacing(true);
  };

  // Variable representing if either of the algorithm sorting instances is racing or not.
  const isEitherRacing = isOneRacing || isTwoRacing;

  const props = {
    animationSpeed,
    array,
    finishedOrder,
    setFinishedOrder,
    selectedAlgos,
    isEitherRacing,
    ALGO_OPTIONS,
  };

  return (
    <div className="algo-racer-container">
      <div className="content-container">
        <div className="welcome-message">
          <h1>Welcome to AlgoRacer</h1>
          <p>Race different sorting algorithms against one another</p>
        </div>
        <div className="slider-container">
          <label htmlFor="size-slider">
            <b>Array Size:</b> {numberOfArrayBars}
          </label>
          <input
            id="size-slider"
            name="size-slider"
            type="range"
            min="10"
            max="50"
            value={numberOfArrayBars}
            onChange={(e) => handleRangeChange(e)}
            disabled={isEitherRacing}
          />
        </div>
        <div className="slider-container">
          <label htmlFor="speed-slider">
            <b>Animation Speed:</b> {animationSpeed}ms
          </label>
          <div className="slider-with-endpoints">
            <p>Fast</p>
            <input
              id="speed-slider"
              name="speed-slider"
              type="range"
              min="5"
              max="150"
              value={animationSpeed}
              onChange={(e) => handleSpeedChange(e)}
              disabled={isEitherRacing}
            />
            <p>Slow</p>
          </div>
        </div>
        <div className="button-container">
          <button
            onClick={() => resetArray(numberOfArrayBars)}
            disabled={isEitherRacing}
          >
            Generate New Array
          </button>
          <button onClick={() => selectRandomAlgos()} disabled={isEitherRacing}>
            Randomize Algorithms
          </button>
        </div>
        <div className="button-container">
          <button
            disabled={selectedAlgos.length < 2 || isEitherRacing}
            onClick={() => startRace()}
          >
            <b>RACE!</b>
          </button>
          <button onClick={() => window.location.reload(false)}>
            <b>RESET</b>
          </button>
        </div>
        {finishedOrder.length == 2 && (
          <p className="winner-message">
            <b>Winner:</b>{" "}
            {finishedOrder[0][0].toUpperCase() + finishedOrder[0].slice(1)}{" "}
            Sort!
          </p>
        )}
      </div>
      <div className="content-container">
        <SortingInstance
          id={1}
          updateSelectedAlgo={selectAlgoOne}
          isRacing={isOneRacing}
          setIsRacing={setIsOneRacing}
          {...props}
        />
        <SortingInstance
          id={2}
          updateSelectedAlgo={selectAlgoTwo}
          isRacing={isTwoRacing}
          setIsRacing={setIsTwoRacing}
          {...props}
        />
      </div>
    </div>
  );
};

export default SortingAlgoRace;
