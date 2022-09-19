'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const removedValues = [];
    let startIndex = start;
    const howManyDelete = deleteCount;
    const addItems = items;

    // setting the start point
    if (startIndex > this.length) {
      startIndex = this.length;
    }

    // if first parameter is undefined
    // or a negative index greater than the length of the array
    if (startIndex === undefined || startIndex < (this.length * -1)) {
      startIndex = 0;
    } else if (startIndex < 0) {
      startIndex += this.length;
    }

    // case if splice without arguments or deleteCount < 0
    if (arguments.length === 0 || howManyDelete < 0) {
      return [];
    }

    // case if first two arguments === undefined
    if (start === undefined && deleteCount === undefined && !addItems.length) {
      return [];
    }

    // case if all three arguments === undefined
    if (start === undefined
      && deleteCount === undefined
      && addItems[0] === undefined) {
      const reserved = [];

      for (let i = 0; i < this.length; i++) {
        reserved[i] = this[i];
      }

      this[0] = addItems[0];
      this.length++;

      for (let i = 1; i < this.length; i++) {
        this[i] = reserved[i - 1];
      }

      return removedValues;
    }

    // case, when func receiving start index and adding elements
    if (howManyDelete <= 0 && addItems.length !== 0) {
      for (let i = this.length - 1; i >= startIndex; i--) {
        this[i + addItems.length] = this[i];
      }

      for (let i = 0; i < addItems.length; i++) {
        this[i + startIndex] = addItems[i];
      }

      return [];
    }

    // case if only start point received
    if (howManyDelete === undefined && addItems.length === 0) {
      let v = 0;

      for (let i = startIndex; i < this.length; i++) {
        removedValues[v] = this[i];
        v++;
      }
      this.length -= removedValues.length;

      return removedValues;
    }

    // case if nothing needs to add:
    // 1) taking deleted values
    if (addItems.length === 0) {
      for (let i = 0; i < howManyDelete; i++) {
        removedValues[i] = this[startIndex + i];
      }

      const afterArr = [];
      let v = 0;

      // 2) saving values after deleted ones
      for (let i = startIndex + howManyDelete; i < this.length; i++) {
        afterArr[v] = this[i];
        v++;
      }

      // 3) putting 'after' values instead deleted ones
      for (let i = startIndex; i < this.length; i++) {
        this[i] = afterArr[i - startIndex];
      }

      this.length -= removedValues.length;

      return removedValues;
    }

    // case if we need to add more elements than delete:
    // 1) taking deleted values
    if (addItems.length > howManyDelete) {
      for (let i = 0; i < howManyDelete; i++) {
        removedValues[i] = this[startIndex + i];
      }

      const afterArr = [];
      let v = 0;

      // 2) saving values after deleted ones
      for (let i = startIndex + howManyDelete; i < this.length; i++) {
        afterArr[v] = this[i];
        v++;
      }

      // 3) adding extra length for more elements
      this.length += addItems.length - howManyDelete;

      // 4) adding new values
      for (let i = startIndex; i < startIndex + addItems.length; i++) {
        this[i] = addItems[i - startIndex];
      }

      // 5) putting back 'after' values
      for (let i = startIndex + addItems.length; i < this.length; i++) {
        this[i] = afterArr[i - (startIndex + addItems.length)];
      }

      return removedValues;
    }

    // case if we need to remove as much as add:
    if (addItems.length === howManyDelete) {
      for (let i = 0; i < howManyDelete; i++) {
        removedValues[i] = this[startIndex + i];
      }

      const afterArr = [];
      let v = 0;

      for (let i = startIndex + howManyDelete; i < this.length; i++) {
        afterArr[v] = this[i];
        v++;
      }

      for (let i = startIndex; i < startIndex + addItems.length; i++) {
        this[i] = addItems[i - startIndex];
      }

      for (let i = startIndex + addItems.length; i < this.length; i++) {
        this[i] = afterArr[i - (startIndex + addItems.length)];
      }

      return removedValues;
    }

    // case if need to delete more than add
    if (addItems.length < howManyDelete) {
      for (let i = 0; i < howManyDelete; i++) {
        removedValues[i] = this[startIndex + i];
      }

      const afterArr = [];
      let v = 0;

      for (let i = startIndex + howManyDelete; i < this.length; i++) {
        afterArr[v] = this[i];
        v++;
      }
      this.length -= howManyDelete - addItems.length;

      for (let i = startIndex; i < startIndex + addItems.length; i++) {
        this[i] = addItems[i - startIndex];
      }

      for (let i = startIndex + addItems.length; i < this.length; i++) {
        this[i] = afterArr[i - (startIndex + addItems.length)];
      }

      return removedValues;
    }
  };
}

module.exports = applyCustomSplice;
