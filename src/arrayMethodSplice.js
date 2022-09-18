'use strict';

/**
 * Implementation of method Splice:
 * OK, so here is my realisation of .splice2() method.
 * |
 * First of all, I tried to write it as a method
 * for the =Array.prototype= but its impossible here because of
 * ESlint rule "Array prototype is read only".
 * So what is about the "no-proto" rule? =))
 * |
 * Secondary, since I didnt implement the .concat() method before
 * I did my personal .concat2() to be clear with it :)
 * |
 * Also, I tried to wrote a documentation for each step
 * inside of splice to make sure my code is clear and understandable.
 * |
 * =>== **EDITED**:
 * =>== custom .slice method added 'cuz @Denis said
 * =>== we couldn"t use regular methods of array ...damn))
 * |
 * <=== Have fun ===>
 */
// additional <normalize> function for the SLICE method:
function normalize(index, length) {
  if (index > length) {
    return length;
  }

  let normalizedIndex = (index < 0)
    ? index + length
    : index;

  normalizedIndex = (normalizedIndex < 0)
    ? 0
    : normalizedIndex;

  return normalizedIndex;
}

function applyCustomSplice() {
  // SLICE method:
  [].__proto__.slice2 = function(start = 0, end = this.length) {
    const normalizedStart = normalize(start, this.length);
    const normalizedEnd = normalize(end, this.length);

    const result = [];

    for (let i = normalizedStart; i < normalizedEnd; i++) {
      result[result.length] = this[i];
    }

    return result;
  };

  // CONCAT method:
  [].__proto__.concat2 = function(array) {
    return [...this, ...array];
  };

  // SPLICE method:
  [].__proto__.splice2 = function(
    fromIndex = 0,
    howMany,
    ...newItems
  ) {
    /* eslint-disable */
    if (typeof howMany === 'undefined'
      && arguments.length > 1) {
      howMany = 0;
    } else if (!howMany
      && arguments.length < 2) {
      howMany = this.length;
    }

    /* eslint-enable */
    // Base check if splice called without an arguments.
    if (arguments.length === 0) {
      return [];
    }

    // - New vars to not assign a function params
    // /-- + some base checks to validate the params.
    const deleteCount = (!howMany
      || howMany < 0
      || typeof howMany === 'string'
      || typeof howMany === 'undefined')
      ? 0
      : howMany;
    let start = (fromIndex < 0)
      ? this.length + fromIndex
      : fromIndex || 0;

    // One more check for the start value if it's still negative.
    // Or if its a string passed as an index value.
    if (start < 0 || typeof start === 'string') {
      start = 0;
    }

    // - <spliced> is the base result of .splice2() method,
    // |-- basically its an array of deleted values
    // |-- from the native array.
    // |-- And we"re splicing it before the original array mutated.
    const spliced = this.slice2(start, start + deleteCount);

    // - Here is the main <=podkapotniy=> BlAcK MaGiC of mutation
    // |-- in the native array to delete some values
    // |-- and add a new if needed ;)
    const mutation = this
      .slice2(0, start)
      .concat2(newItems)
      .concat2(this.slice2(start + deleteCount));

    // - Let"s change the length of or original array
    // |-- to add a new items.
    this.length = mutation.length;

    // Mutate the original array and add a new value.
    for (let i = 0; i < mutation.length; i++) {
      this[i] = mutation[i];
    }

    // Ohhh, here we go!))
    return spliced;
  };
}

module.exports = applyCustomSplice;
