'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const deleteCountSplice = deleteCount;
    const arrayItems = [...items];
    const argumentsLength = arguments.length;
    const sourceLength = this.length;
    const returnedArray = [];
    let startOfSplice = start;
    // assign all constants for next work with them

    // first situation with empty splice
    if (argumentsLength === 0) return returnedArray;

    // change start of splice if start < 0
    if (startOfSplice < 0) {
      startOfSplice += sourceLength;
      if (startOfSplice < 0) { // checking if start is still less then 0
        startOfSplice = Math.abs(startOfSplice);
      }
      if (startOfSplice > this.length) startOfSplice = 0;
    }
    let deletingLength = deleteCountSplice + Math.abs(startOfSplice);
    // situation if it's just one argument in splice(already changed ^)
    if (argumentsLength === 1) {
      // if it's splice to empty array
      if (sourceLength === 0) return returnedArray;
      // other situations
      if (startOfSplice > this.length) return returnedArray;
      // else
      for (let i = startOfSplice, j = 0; i < sourceLength; i++, j++) {
        returnedArray[j] = this[i];
      }
      this.length = startOfSplice; // changing source array
      return returnedArray;
    }
    // if it's two arguments in splice
    if (argumentsLength === 2) {
      // assign deleted elements to returned array
      for (let i = startOfSplice, j = 0; i < deletingLength; i++, j++) {
        returnedArray[j] = this[i];
      }
      // changing source array
      for (let i = 0; i < sourceLength; i++) {
        if (i >= startOfSplice && i <= (deletingLength)) {
          this[i] = this[i + deleteCountSplice];
        }
      }
      this.length = this.length - deleteCountSplice;
      return returnedArray;
    }
    // if it's three of arguments in splice and second is === 0
    if (argumentsLength > 3 && deleteCountSplice === 0) {
      for (let i = sourceLength - 1; i >= startOfSplice; i--) {
        this[i + arrayItems.length] = this[i];
      }
      for (let i = startOfSplice, j = 0; i <= arrayItems.length; i++, j++) {
        this[i] = arrayItems[j];
      }
      return returnedArray;
    }
    // if its three arguments in splice and second is > 0
    if (argumentsLength > 3 && deleteCountSplice > 0) {
      for (let i = startOfSplice, j = 0; i < deletingLength; i++, j++) {
        returnedArray[j] = this[i];
      }
      for (let i = sourceLength - 1;
        i >= startOfSplice + deleteCountSplice; i--) {
        this[arrayItems.length - 2 + i] = this[i];
      }
      for (let i = startOfSplice, j = 0; i <= arrayItems.length; i++, j++) {
        this[i] = arrayItems[j];
      }
      return returnedArray;
    }
  };
}

module.exports = applyCustomSplice;
