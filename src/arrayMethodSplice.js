'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    let sStart = start;
    const sDelCount = deleteCount;
    const addItems = items;
    const resArr = [];

    if (sStart > this.length) {
      sStart = this.length;
    }

    if ((sStart === undefined) || (sStart < -10)) {
      sStart = 0;
    } else if (sStart < 0) {
      sStart += this.length;
    }

    if (sDelCount <= 0 && addItems.length !== 0) {
      for (let i = this.length - 1; i >= sStart; i--) {
        this[i + addItems.length] = this[i];
      }

      for (let i = 0; i < addItems.length; i++) {
        this[i + sStart] = addItems[i];
      }

      return [];
    }

    if (arguments.length === 0 || sDelCount < 0) {
      return [];
    }

    if (sDelCount === undefined && addItems.length === 0) {
      let j = 0;

      for (let i = sStart; i < this.length; i++) {
        resArr[j] = this[i];
        j++;
      }
      this.length -= resArr.length;

      return resArr;
    }

    if (addItems.length === 0) {
      for (let i = 0; i < sDelCount; i++) {
        resArr[i] = this[sStart + i];
      }

      const lastArr = [];
      let j = 0;

      for (let i = sStart + sDelCount; i < this.length; i++) {
        lastArr[j] = this[i];
        j++;
      }

      for (let i = sStart; i < this.length; i++) {
        this[i] = lastArr[i - sStart];
      }

      this.length -= resArr.length;

      return resArr;
    }

    if (addItems.length > sDelCount) {
      for (let i = 0; i < sDelCount; i++) {
        resArr[i] = this[sStart + i];
      }

      const lastArr = [];
      let j = 0;

      for (let i = sStart + sDelCount; i < this.length; i++) {
        lastArr[j] = this[i];
        j++;
      }
      this.length += addItems.length - sDelCount;

      for (let i = sStart; i < sStart + addItems.length; i++) {
        this[i] = addItems[i - sStart];
      }

      for (let i = sStart + addItems.length; i < this.length; i++) {
        this[i] = lastArr[i - (sStart + addItems.length)];
      }

      return resArr;
    }

    if (addItems.length === sDelCount) {
      for (let i = 0; i < sDelCount; i++) {
        resArr[i] = this[sStart + i];
      }

      const lastArr = [];
      let j = 0;

      for (let i = sStart + sDelCount; i < this.length; i++) {
        lastArr[j] = this[i];
        j++;
      }

      for (let i = sStart; i < sStart + addItems.length; i++) {
        this[i] = addItems[i - sStart];
      }

      for (let i = sStart + addItems.length; i < this.length; i++) {
        this[i] = lastArr[i - (sStart + addItems.length)];
      }

      return resArr;
    }

    if (addItems.length < sDelCount) {
      for (let i = 0; i < sDelCount; i++) {
        resArr[i] = this[sStart + i];
      }

      const lastArr = [];
      let j = 0;

      for (let i = sStart + sDelCount; i < this.length; i++) {
        lastArr[j] = this[i];
        j++;
      }
      this.length -= sDelCount - addItems.length;

      for (let i = sStart; i < sStart + addItems.length; i++) {
        this[i] = addItems[i - sStart];
      }

      for (let i = sStart + addItems.length; i < this.length; i++) {
        this[i] = lastArr[i - (sStart + addItems.length)];
      }

      return resArr;
    }
  };
}

module.exports = applyCustomSplice;
