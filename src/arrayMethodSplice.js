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
 * Secondary, since I didnt implemented the .concat() method before
 * I did my personal .concat2() to be clear with it :)
 * |
 * Also, I tried to wrote a documentation for each step
 * to make sure my code is clear and understandable.
 * |
 * <=== Have fun ===>
 */
function applyCustomSplice() {
  // CONCAT method:
  [].__proto__.concat2 = function(array) {
    const concated = [];

    for (const n of this) {
      concated[concated.length] = n;
    }

    for (const n of array) {
      concated[concated.length] = n;
    }

    return concated;
  };

  // SPLICE method:
  [].__proto__.splice2 = function(
    fromIndex = 0, howMany = this.length, ...newItems
  ) {
    // Base check if splice called without an arguments.
    if (arguments.length === 0) {
      return [];
    }

    // - New vars to not assign a function params
    // /-- + some base checks to validate the params.
    const deleteCount = (!howMany || howMany < 0)
      ? 0
      : howMany;
    let start = (fromIndex < 0)
      ? this.length + fromIndex
      : fromIndex;

    // One more check for the start value if it's still negative.
    start = start < 0 ? 0 : start;

    // - <spliced> is the base result of .splice2() method,
    // |-- basically its an array of deleted values
    // |-- from the native array.
    // |-- And we"re splicing it before the original array mutated.
    const spliced = this.slice(start, start + deleteCount);

    // - Here is the main <=podkapotniy=> BlAcK MaGiC of mutation
    // |-- in the native array to delete some values
    // |-- and add a new if needed)
    const mutation = this
      .slice(0, start)
      .concat2(newItems)
      .concat2(this.slice(start + deleteCount));

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
