import React, { useState } from "react";

import "./SortingInstance.css";

const PRIMARY_COLOR = "turquoise";

const AlgoSortInstance = (props) => {
  const mergeSort = () => {};

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
      {props.array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`, // Higher value -> Higher height
          }}
        ></div>
      ))}
    </div>
  );
};

export default AlgoSortInstance;
