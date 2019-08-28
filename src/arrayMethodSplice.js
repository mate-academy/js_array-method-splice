'use strict';

/**
 * Implement method Splice
 */
const indexNormalisation = (index, length) => {
  const ind = Math.abs(index) > length - 1
    ? Math.sign(index) * length
    : index;

  return ind < 0 ? length + ind : ind;
};

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length !== 0
      && (start !== undefined
        || (start === undefined && deleteCount !== undefined))) {
      const startIndex = start === undefined
        ? 0
        : indexNormalisation(start, this.length);

      const counter = deleteCount === undefined
        ? this.length
        : indexNormalisation(deleteCount);

      const spliceOfArrary = [];
      let spliceOfArraryIndex = 0;
      const leftArray = [];
      let leftArraryIndex = 0;
      const rightArray = [];
      let rightArraryIndex = 0;

      for (let i = 0; i < this.length; i++) {
        if (i >= startIndex && i < startIndex + counter) {
          spliceOfArrary[spliceOfArraryIndex++] = this[i];
        } else {
          if (i < start) {
            leftArray[leftArraryIndex++] = this[i];
          } else {
            rightArray[rightArraryIndex++] = this[i];
          }
        }
      }

      const restArray = [...leftArray, ...items, ...rightArray];

      for (let i = 0; i < restArray.length; i++) {
        this[i] = restArray[i];
      }

      this.length = restArray.length;

      return spliceOfArrary;
    }

    return [];
  };
}

module.exports = applyCustomSplice;
