'use strict';

/**
 * Implement method Splice
 */

function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];

    let resultIndex = 0;

    if (-start > this.length) {
      for (let i = 0; i < this.length; i++) {
        result[resultIndex] = this[i];
        resultIndex++;
      }
      this.length = 0;
    }

    if (arguments.length === 1 && start > 0 && start <= this.length) {
      for (let i = start; i < this.length; i++) {
        result[resultIndex] = this[i];
        resultIndex++;
      }

      this.length = start;
    }

    if (arguments.length === 1 && start < 0 && -start <= this.length) {
      for (let i = this.length + start; i < this.length; i++) {
        result[resultIndex] = this[i];
        resultIndex++;
      }

      this.length = this.length + start;
    }

    if (arguments.length === 2 && start === undefined && deleteCount > 0) {
      const startIndex = 0;

      for (let i = 0; i < deleteCount; i++) {
        result[resultIndex] = this[startIndex + i];
        resultIndex++;
      }

      for (let i = startIndex + deleteCount; i < this.length; i++) {
        this[startIndex] = this[i];
        this.length = this.length - deleteCount;
      }
    }

    if (arguments.length === 2 && start > 0 && deleteCount > 0) {
      for (let i = 0; i < deleteCount; i++) {
        result[resultIndex] = this[start + i];
        resultIndex++;
      }

      for (let i = start + deleteCount; i < this.length; i++) {
        this[start] = this[i];
        this.length = this.length - deleteCount;
      }
    }

    if (arguments.length === 2 && start < 0 && deleteCount > 0) {
      for (let i = 0; i < deleteCount; i++) {
        result[resultIndex] = this[this.length + start + i];
        resultIndex++;
      }

      for (let i = this.length + start + deleteCount; i < this.length; i++) {
        this[this.length + start] = this[i];
        this.length = this.length - deleteCount;
      }
    }

    if (arguments.length > 2 && this.length === 0) {
      for (let i = 0; i < items.length; i++) {
        this[i] = items[i];
      }
    }

    const diffDeleteAndAdded = items.length - deleteCount;
    const thisLength = this.length;

    if (start > 0 && deleteCount > 0 && items[0] !== undefined) {
      for (let i = diffDeleteAndAdded; i > 0; i--) {
        this[thisLength - 1 + i] = this[thisLength - i];
      }

      for (let i = 0; i < deleteCount; i++) {
        result[resultIndex] = this[start + i];
        resultIndex++;
      }

      for (let i = 0; i < items.length; i++) {
        this[start + i] = items[i];
      }
    }

    if (arguments.length > 2 && start > 0 && deleteCount === 0) {
      for (let i = 0; i < items.length; i++) {
        this[thisLength + i] = this[start + i];
      }

      for (let i = 0; i < items.length; i++) {
        this[start + i] = items[i];
      }
    }

    if (items[0] === undefined && items.length === 1) {
      for (let i = 0; i < deleteCount; i++) {
        result[resultIndex] = this[start + i];
        resultIndex++;
      }

      for (let i = 0; i < this.length - start - deleteCount; i++) {
        this[start + 1 + i] = this[start + deleteCount + i];
      }

      this[start] = undefined;
      this.length = this.length - deleteCount + 1;
    }

    if (arguments.length < 1 || start > this.length || deleteCount === 0) {
      return [];
    }

    return result;
  };
}

module.exports = applyCustomSplice;
