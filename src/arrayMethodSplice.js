'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...item) {
    const deletedPart = [];
    const partBeforeDelete = [];
    const partAfterDelete = [];
    const addedPart = item;
    let startDelete = start;
    let endDelete = deleteCount;

    if (startDelete === undefined && deleteCount === undefined) {
      return deletedPart;
    }

    if (startDelete < 0) {
      startDelete = this.length + startDelete;
    }

    if (deleteCount === undefined) {
      endDelete = this.length;
    }

    if (deleteCount <= 0) {
      endDelete = startDelete;
    }

    if (deleteCount > 0) {
      endDelete = this.length + startDelete - deleteCount;
    }

    if (startDelete === undefined) {
      startDelete = 0;
      endDelete = this.length - 1;
    }

    for (let i = 0; i < this.length; i++) {
      if (i < startDelete) {
        partBeforeDelete[partBeforeDelete.length] = this[i];
      }

      if (i >= startDelete && i < endDelete) {
        deletedPart[deletedPart.length] = this[i];
      }

      if (i >= endDelete) {
        partAfterDelete[partAfterDelete.length] = this[i];
      }
    }

    this.length = 0;

    for (let i = 0; i < partBeforeDelete.length; i++) {
      this[this.length] = partBeforeDelete[i];
    }

    for (let i = 0; i < addedPart.length; i++) {
      this[this.length] = addedPart[i];
    }

    for (let i = 0; i < partAfterDelete.length; i++) {
      this[this.length] = partAfterDelete[i];
    }

    return deletedPart;
  };
}

module.exports = applyCustomSplice;
