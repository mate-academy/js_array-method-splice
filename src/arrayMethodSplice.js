'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const lengthArr = this.length;
    const arrCopy = this.slice();
    let startIndex = start;
    let endIndex = deleteCount;

    /*
    line 17-53 - slice method:
    */

    function sliceArr(startArr = 0, endArr) {
      let startIndexArr = startArr || 0;
      let endIndexArr = endArr || lengthArr;

      if (endArr === 0) {
        endIndexArr = 0;
      }

      if (startIndexArr < 0 && (startIndexArr * -1) < lengthArr) {
        startIndexArr = lengthArr + startIndexArr;
      }

      if ((startIndexArr * -1) > lengthArr) {
        startIndexArr = 0;
      }

      if (startIndexArr > lengthArr) {
        return [];
      }

      if (endIndexArr < 0) {
        endIndexArr = lengthArr + endIndexArr;
      }

      if (endIndexArr > lengthArr) {
        endIndexArr = lengthArr;
      }

      const result = [];

      for (let i = startIndexArr; i < endIndexArr; i++) {
        result[i - startIndexArr] = arrCopy[i];
      }

      return result;
    };

    /*
    line 62-88 - check condition for splice method:
    */

    if ((startIndex === undefined && endIndex === undefined)
      || startIndex > lengthArr) {
      startIndex = lengthArr;
      endIndex = lengthArr;
    }

    if (startIndex === undefined && endIndex < lengthArr) {
      startIndex = 0;
    }

    if (endIndex < 0) {
      startIndex = 0;
      endIndex = 0;
    }

    if (startIndex === 1 && endIndex === undefined) {
      startIndex = 1;
      endIndex = lengthArr;
    }

    if (startIndex < 0 && (startIndex * -1) < lengthArr
      && endIndex === undefined) {
      startIndex = lengthArr + startIndex;
      endIndex = lengthArr;
    }

    if (startIndex < 0 && (startIndex * -1) > lengthArr
      && endIndex === undefined) {
      startIndex = 0;
      endIndex = lengthArr;
    }

    const firstPart = sliceArr(0, startIndex);
    const secondPart = sliceArr(startIndex + endIndex);

    const removedElements = sliceArr(startIndex, startIndex + endIndex);

    /*
    line 96-117 - concat method:
    const joinedParts = firstPart.concat([...items], secondPart);
    */

    function concatArray(firstPartCopy, ...values) {
      const result = firstPartCopy;
      const { length } = values;

      for (let index = 0; index < length; index += 1) {
        const value = values[index];

        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            result[result.length] = value[i];
          }
        } else {
          result[result.length] = value;
        }
      }

      return result;
    }

    const joinedParts = concatArray(firstPart, [...items], secondPart);

    const joinedPartsLength = joinedParts.length;

    for (let i = 0; i < joinedPartsLength; i++) {
      this[i] = joinedParts[i];
    }

    this.length = joinedPartsLength;

    return removedElements;
  };
};

module.exports = applyCustomSplice;
