'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (deleteCount < 0 || arguments.length === 0) {
      return [];
    }

    if (this.length === 0 && start === 0 && deleteCount === 0) {
      for (let s = 0; s < items.length; s++) {
        this[this.length] = items[s];
      }

      return [];
    }

    const copyThis = [...this];
    this.length = 0;

    let newStart = start;
    if (start === undefined) {
      newStart = 0;
    }

    if (start < 0) {
      let startMinus = copyThis.length + newStart;
      const deletePositionsMinus = [startMinus];
      const arrayDeletedPositions = [];

      for (let i = 1; i < deleteCount; i++) {
        startMinus++;
        deletePositionsMinus[i] = startMinus;
      }

      for (let s = 0; s < copyThis.length; s++) {
        if (deletePositionsMinus.indexOf(s) === -1 && startMinus > 0) {
          this[this.length] = copyThis[s];
        } else {
          arrayDeletedPositions[arrayDeletedPositions.length] = copyThis[s];
        }
      }

      return arrayDeletedPositions;
    }

    if (arguments.length === 1) {
      const withOneArgument = [];

      for (let i = 0; i < copyThis.length; i++) {
        if (i < newStart) {
          this[this.length] = copyThis[i];
        } else {
          withOneArgument[withOneArgument.length] = copyThis[i];
        }
      }

      return withOneArgument;
    }

    const deletePositions = [newStart];

    for (let i = 1; i < deleteCount; i++) {
      newStart++;
      deletePositions[i] = newStart;
    }

    const arrWithDeletedPositions = [];

    for (let i = 0; i < copyThis.length; i++) {
      if (arguments.length > 2 && i === newStart) {
        for (let s = 0; s < items.length; s++) {
          this[this.length] = items[s];
        }
        if (deleteCount !== 0) {
          arrWithDeletedPositions[arrWithDeletedPositions.length] = copyThis[i];
        } else {
          this[this.length] = copyThis[i];
        }
      } else if (deletePositions.indexOf(i) === -1) {
        this[this.length] = copyThis[i];
      } else {
        arrWithDeletedPositions[arrWithDeletedPositions.length] = copyThis[i];
      }
    }

    return arrWithDeletedPositions;
  };
}

module.exports = applyCustomSplice;
