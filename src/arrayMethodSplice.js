'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(
    start,
    deleteCount = this.length - 1,
    ...items
  ) {
    const returnArray = [];
    // проверка старта
    if (start === 0 || (start < 0 && Math.abs(start) > this.length)) {
      for (let i = 0; i < this.length; i++) {
        returnArray[returnArray.length] = this[i];
      }
      this.length = 0;
      return returnArray;
    } else if (!start) {
      return [];
    }
    let begin = start;
    if (begin > this.length) {
      begin = this.length;
    } else if (begin < 0) {
      begin = this.length + begin;
    }
    // проверка счетчика удаления
    let deleteAmount = deleteCount;
    if (deleteAmount > this.length - begin) {
      deleteAmount = this.length - begin;
    } else if (deleteAmount < 0) {
      deleteAmount = 0;
    }
    // записываем до старта
    const resultArray = [];
    for (let i = 0; i < begin; i++) {
      resultArray[resultArray.length] = this[i];
    }
    // записываем удаляемые значения в возвращаемый массив
    for (let i = begin; i < begin + deleteAmount; i++) {
      returnArray[returnArray.length] = this[i];
    }
    // вставляем новые значения
    if (items.length !== 0) {
      for (let i = 0; i < items.length; i++) {
        resultArray[resultArray.length] = items[i];
      }
    }
    // записываем оставшиеся значения
    for (let i = begin + deleteAmount; i < this.length; i++) {
      resultArray[resultArray.length] = this[i];
    }
    // переписываем получившийся массив в this
    this.length = 0;
    for (let i = 0; i < resultArray.length; i++) {
      this[this.length] = resultArray[i];
    }
    // возвращаем массив с удаленными значениями
    return returnArray;
  };
}

module.exports = applyCustomSplice;
