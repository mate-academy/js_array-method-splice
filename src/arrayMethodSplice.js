'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let thisLength = this.length;
    const itemsLength = items.length;
    const newArray = [];
    const endArray = [];
    let spliceStart = start;
    let spliceDelCount = deleteCount;

    if (spliceStart < 0) {
      Math.abs(spliceStart) > thisLength
        ? spliceStart = 0
        : spliceStart += thisLength;
    } else if (!spliceStart && !spliceDelCount && items.length === 0) {
      return newArray;
    }

    if (isNaN(spliceStart) || (spliceStart === undefined && spliceDelCount)) {
      spliceStart = 0;
    }

    if (arguments.length === 3 && spliceDelCount === undefined) {
      spliceDelCount = 0;
    }

    if (spliceStart > thisLength) {
      const thisNewLength = thisLength + itemsLength;

      for (let i = thisLength, j = 0; i < thisNewLength; i++, j++) {
        this[i] = items[j];
      }

      return newArray;
    }

    if (spliceStart >= 0) {
      if (spliceDelCount === undefined) {
        for (let i = spliceStart, j = 0; i < thisLength; i++, j++) {
          newArray[j] = this[i];
        }
        this.length = spliceStart;

        return newArray;
      }

      if (spliceDelCount <= 0) {
        for (let i = spliceStart, j = 0; i < thisLength; i++, j++) {
          newArray[j] = this[i];
        }

        for (let i = 0, j = spliceStart; i < itemsLength; i++, j++) {
          this[j] = items[i];

          if (i === itemsLength - 1) {
            thisLength = j + 1;
          }
        }

        if (itemsLength === 0) {
          this.length = spliceStart;
          thisLength = this.length;
        }

        for (let i = 0, j = thisLength; i < newArray.length; i++, j++) {
          this[j] = newArray[i];
        }
        newArray.length = 0;

        return newArray;
      }

      if (spliceDelCount > 0) {
        let endOfSplice;

        if ((spliceDelCount + spliceStart) < thisLength) {
          endOfSplice = spliceDelCount + spliceStart;
        } else {
          endOfSplice = thisLength;
        }

        for (let i = spliceStart, j = 0, k = 0; i < thisLength; i++, j++) {
          if (i < endOfSplice) {
            newArray[j] = this[i];
          } else {
            endArray[k] = this[i];
            k++;
          }
        }

        for (let i = 0, j = spliceStart; i < itemsLength; i++, j++) {
          this[j] = items[i];
          thisLength = j + 1;
        }

        if (itemsLength === 0) {
          this.length = spliceStart;
          thisLength = this.length;
        }

        for (let i = 0, j = thisLength; i < endArray.length; i++, j++) {
          this[j] = endArray[i];
          this.length = j + 1;
        }

        if (newArray.length > spliceDelCount) {
          newArray.length = spliceDelCount;
        }

        return newArray;
      }
    }
  };
}

module.exports = applyCustomSplice;
