'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const result = [];
    let deleting = deleteCount;
    let n = 0;
    let startf;

    if ((start < 0) && (start < this.length) && ((-1 * start) < this.length)) {
      startf = this.length + start;
    } else if (start > this.length) {
      startf = this.length;
    } else if ((start < 0) && ((-1 * start) > this.length)) {
      startf = 0;
    } else {
      startf = start;
    }

    if ((deleteCount === undefined) && (start === undefined)) {
      return result;
    }

    if (start === undefined) {
      startf = 0;
    }

    if (deleteCount === undefined) {
      deleting = this.length - startf;
    }

    for (let i = startf; i < startf + deleting; i++) {
      result.push(this[i]);
    }

    for (let j = startf; j < startf + deleting; j++) {
      for (let i = startf; i < this.length - 1; i++) {
        this[i] = this[i + 1];
      }
      this.length--;
    }

    const newS = [...this];

    if (items !== undefined) {
      for (let j = startf; j < items.length + startf; j++) {
        for (let i = newS.length + n - 1; i >= startf + n; i--) {
          this[i + 1] = this[i];
        }
        this[j] = items[j - startf];
        n++;
      }
    }

    return result;
  };
}

module.exports = applyCustomSplice;
