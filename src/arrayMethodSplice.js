'use strict';

/**
 * Implement method Splice
 */
function applyCustomSplice() {
  [].__proto__.splice2 = function(start, deleteCount, ...items) {
    const args = [ ...arguments ];
    const del = [];
    const temp = [];

    if (args.length === 0) {
      return [];
    };

    if (args.length === 1) {
      if (args[0] > this.length) {
        return [];
      };

      if (args[0] >= 0) {
        for (let i = args[0]; i < this.length; i++) {
          del[del.length] = this[i];
        };

        this.length = args[0];
      };

      if (args[0] < 0) {
        if ((args[0] + this.length) < 0) {
          for (let y = 0; y < this.length; y++) {
            del[del.length] = this[y];
          };

          this.length = 0;
        } else {
          for (let j = args[0] + this.length; j < this.length; j++) {
            del[del.length] = this[j];
          };

          this.length = args[0] + this.length;
        }
      }
    };

    if (args.length >= 2) {
      if (args[0] === undefined) {
        for (let f = 0; f < args[1]; f++) {
          del[del.length] = this[f];
        };

        for (let d = args[1]; d < this.length; d++) {
          temp[temp.length] = this[d];
        };

        this.length = 0;

        for (let h = 0; h < temp.length; h++) {
          this[this.length] = temp[h];
        }
      };

      if (args[1] <= 0) {
        for (let s = args[0]; s < this.length; s++) {
          temp[temp.length] = this[s];
        };

        this.length = args[0];

        for (let t = 2; t < args.length; t++) {
          this[this.length] = args[t];
        };

        for (let p = 0; p < temp.length; p++) {
          this[this.length] = temp[p];
        };

        return [];
      };

      if ((args[0] >= 0) && (args[1] > 0)) {
        for (let k = 0; k < this.length; k++) {
          if ((k >= args[0]) && (k <= args[1])) {
            del[del.length] = this[k];
          } else {
            temp[temp.length] = this[k];
          }
        };

        this.length = 0;

        for (let n = 0; n < args[0]; n++) {
          this[this.length] = temp[n];
        };

        for (let b = 2; b < args.length; b++) {
          this[this.length] = args[b];
        };

        for (let c = args[0]; c < temp.length; c++) {
          this[this.length] = temp[c];
        }
      };

      if ((args[0] < 0) && (args[1] > 0)) {
        for (let k = 0; k < this.length; k++) {
          if ((k >= (this.length + args[0])) && (k <= args[1])) {
            del[del.length] = this[k];
          } else {
            temp[temp.length] = this[k];
          }
        };

        this.length = 0;

        for (let n = 0; n < temp.length; n++) {
          this[this.length] = temp[n];
        }
      }
    };

    return del;
  };
}

module.exports = applyCustomSplice;
