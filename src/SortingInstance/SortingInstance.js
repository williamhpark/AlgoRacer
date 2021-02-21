import React, { useState, useEffect } from "react";

import "./SortingInstance.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort";

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

  const mergeSort = () => {
    const arr = array.slice();
    const animations = getMergeSortAnimations(arr);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-${id}`);
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          if (i === animations.length - 1) {
            setIsRacing(false);
            setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
          }
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
          if (i === animations.length - 1) {
            setIsRacing(false);
            setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const bubbleSort = () => {
    const arr = array.slice(0);
    const animations = getBubbleSortAnimations(arr);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName(`array-${id}`);
      const barOneIdx = animations[i][1];
      const barTwoIdx = barOneIdx + 1;
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (animations[i][0] === "c") {
        setTimeout(() => {
          const prevBarIdx = barOneIdx - 1;
          if (prevBarIdx >= 0) {
            const prevBarStyle = arrayBars[prevBarIdx].style;
            prevBarStyle.backgroundColor = PRIMARY_COLOR;
          }
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;
          if (i === animations.length - 1) {
            setIsRacing(false);
            setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
          }
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][0] === "s") {
        setTimeout(() => {
          const barOneHeight = animations[i][2];
          const barTwoHeight = animations[i][3];
          barOneStyle.height = `${barOneHeight}px`;
          barTwoStyle.height = `${barTwoHeight}px`;
          if (i === animations.length - 1) {
            setIsRacing(false);
            setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
          }
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i][0] === "u") {
        setTimeout(() => {
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
          if (i === animations.length - 1) {
            setIsRacing(false);
            setFinishedOrder((finishedOrder) => [...finishedOrder, algorithm]);
          }
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  const selectionSort = () => {
    return null;
  };

  return (
    <div className="array-container">
      {algorithm && (
        <p>{algorithm[0].toUpperCase() + algorithm.slice(1)} Sort</p>
      )}
      <p>{time.toFixed(1)}s</p>
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
  );
};

export default AlgoSortInstance;
