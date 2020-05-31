'use strict';

/**
 * Implement method Splice
 */
function applyCustomPush() {
  [].__proto__.push2 = function(...elements) {
    const pushedArrLength = arguments.length + this.length;

    const j = this.length;

    for (let i = this.length; i < pushedArrLength; i++) {
      this[i] = elements[i - j];
    }

    return pushedArrLength;
  };
}

function applyCustomShift() {
  [].__proto__.shift2 = function() {
    if (this.length === 0) {
      return undefined;
    }

    const deletedItem = this[0];

    for (let i = 0; i < this.length; i++) {
      this[i] = this[i + 1];
    }

    this.length = this.length - 1;

    return deletedItem;
  };
}

function applyCustomSplice() {
  applyCustomPush();
  applyCustomShift();

  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let resultArr = [];
    const arr = [...this];

    if (start === undefined) {
      for (let i = 0; i < deleteCount; i++) {
        resultArr.push2(this[i]);
      }

      for (let i = 0; i < deleteCount; i++) {
        this.shift2(this[i]);
      }
    } else if (!start || start > this.length) {
      return resultArr;
    } else if (start < -this.length) {
      this.length = 0;

      // eslint-disable-next-line no-return-assign
      return resultArr = [...arr];
    }

    if (start >= 0) {
      if (deleteCount >= 0) {
        this.length = start;

        for (let i = start; i < start + deleteCount; i++) {
          resultArr[i - start] = arr[i];
        }

        this.push2(...items);

        for (let i = start + deleteCount; i < arr.length; i++) {
          this.push2(arr[i]);
        }
      } else if (!deleteCount) {
        this.length = start;

        for (let i = start; i < arr.length; i++) {
          resultArr[i - start] = arr[i];
        }
      }
    } else if (start < 0) {
      if (deleteCount >= 0) {
        // eslint-disable-next-line max-len
        for (let i = this.length + start; i < this.length + start + deleteCount; i++) {
          resultArr.push2(this[i]);
        }
        this.length = this.length + start;
        this.push2(...items);

        for (let i = this.length + deleteCount; i < arr.length; i++) {
          this.push2(arr[i]);
        }
      } else if (!deleteCount) {
        for (let i = this.length + start; i < this.length; i++) {
          resultArr.push2(this[i]);
        }
        this.length = this.length + start;
      }
    }

    return resultArr;
  };
}

module.exports = applyCustomSplice;
