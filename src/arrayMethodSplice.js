'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let newCounter = arguments[1];
    let newStart = arguments[0];
    let removedList = [];
    const array = [...this];

    if (newCounter < 0) {
      newCounter = 0;
    }

    if (arguments[0] === undefined && newCounter !== undefined) {
      for (let i = 0; i < newCounter; i++) {
        removedList[i] = this[i];
        this[i] = this[i + newCounter];
      }
      this.length = this.length - newCounter;
    }

    if (Math.abs(arguments[0]) > this.length
    && arguments[1] === undefined
    && items.length === 0) {
      if (arguments[0] > 0) {
        removedList = [];
      } else {
        removedList = [...array];
        this.length = 0;
      }

      return removedList;
    }

    if (newCounter > (this.length - newStart)) {
      newCounter = this.length - newStart;
    }
    // example splice (1,2)

    if (newStart !== undefined
      && newCounter !== undefined
      && items.length === 0) {
      for (let i = newStart; i < (newStart + deleteCount); i++) {
        removedList[i - newStart] = this[i];
      }

      let changed = false;

      for (let i = 0; i < this.length; i++) {
        if (i < newStart) {
          this[i] = this[i];
        } else {
          if (changed === false) {
            i += newCounter;
            changed = true;
            this[i - newCounter] = this[i];
          } else {
            this[i - newCounter] = this[i];
          }
        }
      }
      this.length = this.length - newCounter;
    }
    // example for splice2(1, 2, 'a', 'b', 'c')

    if (newStart !== undefined
      && newCounter !== undefined
      && items.length !== 0) {
      for (let i = newStart; i < (newStart + deleteCount); i++) {
        removedList[i - newStart] = this[i];
      }

      for (let i = 0; i < (array.length - newCounter + items.length); i++) {
        if (i >= newStart) {
          if (items[i - newStart] !== undefined) {
            this[i] = items[i - newStart];
          } else {
            if ((array.length - newCounter - newStart) > 0) {
              this[i] = array[i - newStart - items.length + newCounter + 1];
            }
          }
        }
      }
      this.length = array.length - newCounter + items.length;
    }

    if (newStart !== undefined
      && newCounter === undefined
      && items.length === 0) {
      newCounter = arguments[0];
      newStart = 0;

      for (let i = newCounter; i < this.length; i++) {
        removedList[i - newCounter] = this[i];
      }
      this.length = newCounter;
    }
    console.log (newStart, newCounter, this.length, removedList, this, items);

    return removedList;
  };
}

module.exports = applyCustomSplice;
