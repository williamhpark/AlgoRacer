import React, { useState, useEffect } from "react";

import "./SortingInstance.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = "turquoise";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

const AlgoSortInstance = (props) => {
  const [time, setTime] = useState(0);

  const { algorithm, array, id, isRacing, setIsRacing } = props;

  useEffect(() => {
    if (isRacing) {
      if (algorithm === "merge") {
        mergeSort();
      } else if (algorithm === "bubble") {
        mergeSort();
      } else if (algorithm === "selection") {
        mergeSort();
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

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-bar-${id}`);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const bubbleSort = () => {};

  const selectionSort = () => {};

  const areArraysEqual = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  };

  /*
  const testSortingAlgorithms = () => {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(areArraysEqual(javaScriptSortedArray, mergeSortedArray));
    }
  };
  */

  return (
    <div className="array-container">
      {algorithm && (
        <p>{algorithm[0].toUpperCase() + algorithm.slice(1)} Sort</p>
      )}
      {isRacing && <p>{time.toFixed(1)}s</p>}
      {array.map((value, idx) => (
        <div
          className={"array-bar-" + id}
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`, // Higher value => Higher height
          }}
        ></div>
      ))}
    </div>
  );
};

export default AlgoSortInstance;
