'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start = 0, deleteCount, ...items) {
    let splicedArray = [];

    if (!arguments.length
      || start > this.length
      || (deleteCount === 0 && items === undefined)
      || deleteCount < 0) {
      return splicedArray;
    }

    if (start < 1 && start < -this.length) {
      splicedArray = [ ...this ];
      this.length = 0;

      return splicedArray;
    }

    let innerStart = start;

    if (arguments.length === 1) {
      if (innerStart < 0) {
        innerStart = this.length - Math.abs(start);
      }

      for (let i = 0; i < this.length - innerStart; i++) {
        splicedArray[i] = this[i + innerStart];
      }
      this.length = innerStart;
    } else if (arguments.length === 2 || arguments.length > 2) {
      if (innerStart < 0) {
        innerStart = this.length - Math.abs(start);
      }

      for (let i = 0; i < deleteCount; i++) {
        splicedArray[i] = this[i + innerStart];
      }

      for (let i = innerStart; i < this.length - deleteCount; i++) {
        this[i] = this[i + deleteCount];
      }

      if (deleteCount < this.length) {
        this.length -= deleteCount;
      } else {
        this.length -= innerStart;
      }

      if (items.length > 0) {
        for (let i = this.length - 1; i >= innerStart; i--) {
          this[i + items.length] = this[i];
        }

        for (let i = 0; i < items.length; i++) {
          this[i + innerStart] = items[i];
        }
      }
    }

    return splicedArray;
  };
}

module.exports = applyCustomSplice;
