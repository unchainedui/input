import { slugify } from 'uc-strings';
const rxGt = /&gt;/g;
const rxNoTags = /<[^>]*>/ig;
const rxMultipleSpaces = /\s{2,}/g;

const transforms = {
  slugify,

  noHtml: str => str.replace(rxNoTags, ''),

  fix: str => str
    .replace(rxGt, '>')
    .replace(rxMultipleSpaces, ' '),

  trim: (str, stopper) => {
    if (stopper) {
      return str;
    }

    return str.trim();
  }
}

function apply(arr, fn, push) {
  const order = push ? 'push' : 'unshift';

  switch (typeof fn) {
    case 'string':
      arr[order](transforms[fn]);
      break;

    case 'function':
      arr[order](fn);
      break;

    case 'object':
      for (const prop in transforms) {
        if (fn[prop]) {
          arr[order](transforms[prop]);
        }
      }
      break;
  }
}

export default {
  unshiftTransform: function(fn) {
    apply(this.transforms, fn, false);
  },

  pushTransform: function(fn) {
    apply(this.transforms, fn, true);
  },

  transform: function(val, stopper) {
    if (!this.transforms.length) {
      return val;
    }

    const transforms = this.transforms;
    for (const i in transforms) {
      if (!val) {
        break;
      }

      val = transforms[i](val, stopper);
    }

    return val;
  }
}
