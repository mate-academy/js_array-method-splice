'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    if (arguments.length === 0
      || start > this.length
      || deleteCount < 0
      || (start === undefined
        && deleteCount === undefined)
    ) {
      return [];
    }

    let startIndex = start;
    let del = deleteCount;
    const itemsArray = [ ...items ];
    const deleteItems = [];
    const startItems = [];
    const rest = [];

    if (startIndex + this.length < 0) {
      startIndex = start;
    } else if (startIndex < 0) {
      startIndex = this.length + startIndex;
    }

    if (startIndex > 0 && del > 0) {
      for (let i = 0; i < startIndex; i++) {
        startItems.push(this[i]);
      }

      const length = del + startIndex;

      for (let i = startIndex; i < length; i++) {
        deleteItems.push(this[i]);
      }

      const iteration = del + startIndex;

      for (let i = iteration; i < this.length; i++) {
        rest.push(this[i]);
      }
    }

    if (startIndex > 0 && del === undefined) {
      for (let i = startIndex; i < this.length; i++) {
        deleteItems.push(this[i]);
      }

      for (let i = 0; i < startIndex; i++) {
        startItems.push(this[i]);
      }
    }

    if (startIndex > 0 && del === 0) {
      for (let i = 0; i < startIndex; i++) {
        startItems.push(this[i]);
      }

      for (let i = startIndex; i < this.length; i++) {
        rest.push(this[i]);
      }
    }

    if (del === undefined) {
      del = 0;
    }

    if (startIndex === 0) {
      for (let i = del; i < this.length; i++) {
        rest.push(this[i]);
      }

      for (let i = startIndex; i < del; i++) {
        deleteItems.push(this[i]);
      }
    }

    if (startIndex < 0) {
      for (let i = 0; i < this.length; i++) {
        deleteItems.push(this[i]);
      }
    }

    this.length = 0;

    for (let i = 0; i < startItems.length; i++) {
      this[i] = startItems[i];
    }

    if (itemsArray.length > 0) {
      for (let i = 0; i < itemsArray.length; i++) {
        this[i + startItems.length] = itemsArray[i];
      }
    }

    if (rest.length >= 1) {
      for (let i = 0; i < rest.length; i++) {
        this[i + startItems.length + itemsArray.length] = rest[i];
      }
    }

    return deleteItems;
  };
}

module.exports = applyCustomSplice;
