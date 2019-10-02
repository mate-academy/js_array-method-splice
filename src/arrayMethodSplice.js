'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    if (arguments.length === 0 || deleteCount < 0) {
      return [];
    } else if (start === undefined) {
      start = 0;
    }

    const copyArr = [...this];
    const deleteItems = [];
    this.length = 0;

    if (deleteCount === undefined && items.length === 0) {
      deleteItems.push(...copyArr.slice(start));
      this.push(...copyArr.slice(0, start));
      return deleteItems;
    }

    this.push(...copyArr.slice(0, start));
    this.push(...items);
    this.push(...copyArr.slice(start + deleteCount));
    deleteItems.push(...copyArr.slice(start, start + deleteCount));

    return deleteItems;
  };
}

module.exports = applyCustomSplice;
