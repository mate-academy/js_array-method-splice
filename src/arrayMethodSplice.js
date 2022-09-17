'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start,
    deleteCount, ...items) {
    const startIndex = normalizeStart(start, this.length);
    const amount = normalizeAmount(deleteCount, start, startIndex, this.length);

    const eraisedElements = [];

    for (let i = 0; i < amount; i++) {
      eraisedElements.push(this[i + startIndex]);
    }

    for (let i = 0; i < amount; i++) {
      this[i + startIndex] = this[i + startIndex + eraisedElements.length];
    }

    this.length -= eraisedElements.length;

    for (let i = this.length - 1; i >= startIndex; i--) {
      this[i + items.length] = this[i];
    }

    for (let i = 0; i < items.length; i++) {
      this[i + startIndex] = items[i];
    }

    return eraisedElements;
  };
}

function normalizeStart(index, length) {
  if (index === undefined) {
    return 0;
  }

  if (index > length) {
    return length;
  }

  let normalizedIndex = index;

  if (normalizedIndex < 0) {
    normalizedIndex += length;
  }

  if (normalizedIndex < 0) {
    normalizedIndex = 0;
  }

  return normalizedIndex;
}

function normalizeAmount(deleteCount, start, startIndex, length) {
  let amount = deleteCount;

  if (deleteCount === undefined && start === undefined) {
    return 0;
  }

  if (deleteCount === undefined) {
    amount = length - startIndex;
  }

  return amount;
}

module.exports = applyCustomSplice;
