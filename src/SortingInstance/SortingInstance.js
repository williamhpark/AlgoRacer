import React, { useState, useEffect } from "react";

import "./SortingInstance.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";
import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const AlgoSortInstance = (props) => {
  const {
    algorithm,
    array,
    id,
    isRacing,
    setIsRacing,
    finishedOrder,
    setFinishedOrder,
    selectedAlgos,
    updateSelectedAlgo,
    isEitherRacing,
  } = props;

  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log(id);
  }, []);

  useEffect(() => {
    if (isRacing) {
      setTime(0);
      setFinishedOrder([]);
      if (algorithm === "merge") {
        mergeSort();
      } else if (algorithm === "bubble") {
        bubbleSort();
      } else if (algorithm === "selection") {
        selectionSort();
      }
    }
  }, [isRacing]);

  useEffect(() => {
    let interval = null;
    if (isRacing) {
      interval = setInterval(() => {
        setTime((time) => time + 0.1);
      }, 100);
    } else if (!isRacing && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRacing, time]);

  const changeColor = (
    arrayBars,
    barOneIdx,
    barTwoIdx,
    color,
    i,
    animationsLength
  ) => {
    setTimeout(() => {
      if (barOneIdx !== null && barOneIdx >= 0) {
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.backgroundColor = color;
      }
      if (barTwoIdx !== null && barTwoIdx >= 0) {
        const barTwoStyle = arrayBars[barTwoIdx].style;
        barTwoStyle.backgroundColor = color;
      }
      if (i === animationsLength - 1) {
        setIsRacing(false);
        setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
      }
    }, i * ANIMATION_SPEED_MS);
  };

  const changeHeight = (arrayBars, barIdx, newHeight, i, animationsLength) => {
    setTimeout(() => {
      const barStyle = arrayBars[barIdx].style;
      barStyle.height = `${newHeight}px`;
      if (i === animationsLength - 1) {
        setIsRacing(false);
        setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
      }
    }, i * ANIMATION_SPEED_MS);
  };

  const mergeSort = () => {
    const arr = array.slice();
    const animations = getMergeSortAnimations(arr);
    const animationsLength = animations.length;
    for (let i = 0; i < animationsLength; i++) {
      const arrayBars = document.getElementsByClassName(`array-${id}`);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        changeColor(
          arrayBars,
          barOneIdx,
          barTwoIdx,
          color,
          i,
          animationsLength
        );
      } else {
        const [barOneIdx, newHeight] = animations[i];
        changeHeight(arrayBars, barOneIdx, newHeight, i, animationsLength);
      }
    }
  };

  const bubbleSort = () => {
    const arr = array.slice(0);
    const animations = getBubbleSortAnimations(arr);
    const animationsLength = animations.length;
    for (let i = 0; i < animationsLength; i++) {
      const arrayBars = document.getElementsByClassName(`array-${id}`);
      const command = animations[i][0];
      const argumentOne = animations[i][1];
      const argumentTwo = animations[i][2];
      if (command === "c") {
        changeColor(
          arrayBars,
          argumentOne - 1,
          null,
          PRIMARY_COLOR,
          i,
          animationsLength
        ); // Revert the color of previously selected bar back to PRIMARY_COLOR
        changeColor(
          arrayBars,
          argumentOne,
          argumentTwo,
          SECONDARY_COLOR,
          i,
          animationsLength
        ); // Change color of currently selected bars to SECONDARY_COLOR
      } else if (command === "h") {
        changeHeight(arrayBars, argumentOne, argumentTwo, i, animationsLength);
      } else if (command === "u") {
        changeColor(
          arrayBars,
          argumentOne,
          argumentTwo,
          PRIMARY_COLOR,
          i,
          animationsLength
        );
      }
    }
  };

  const selectionSort = () => {
    const arr = array.slice(0);
    const animations = getSelectionSortAnimations(arr);
    const animationsLength = animations.length;
    for (let i = 0; i < animationsLength; i++) {
      const arrayBars = document.getElementsByClassName(`array-${id}`);
      const command = animations[i][0];
      const argumentOne = animations[i][1];
      const argumentTwo = animations[i][2];
      if (command === "c") {
        changeColor(
          arrayBars,
          argumentOne,
          null,
          SECONDARY_COLOR,
          i,
          animationsLength
        );
      } else if (command === "h") {
        changeHeight(arrayBars, argumentOne, argumentTwo, i, animationsLength);
      } else if (command === "u") {
        changeColor(
          arrayBars,
          argumentOne,
          argumentTwo,
          PRIMARY_COLOR,
          i,
          animationsLength
        );
      }
    }
  };

  return (
    <div className="instance-container">
      <div className="instance-info">
        {algorithm ? (
          <h2>{algorithm.toUpperCase()} SORT</h2>
        ) : (
          <h2>Algorithm {id}</h2>
        )}
        <p>{time.toFixed(1)}s</p>
      </div>
      <div className="buttons-container">
        <button
          onClick={() => updateSelectedAlgo("merge")}
          disabled={selectedAlgos.includes("merge") || isEitherRacing}
        >
          Merge Sort
        </button>
        <button
          onClick={() => updateSelectedAlgo("bubble")}
          disabled={selectedAlgos.includes("bubble") || isEitherRacing}
        >
          Bubble Sort
        </button>
        <button
          onClick={() => updateSelectedAlgo("selection")}
          disabled={selectedAlgos.includes("selection") || isEitherRacing}
        >
          Selection Sort
        </button>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className={`array-bar array-${id}`}
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`, // Higher value => Higher height
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AlgoSortInstance;
