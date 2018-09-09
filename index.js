import { on, off } from 'uc-dom';
import { debounce } from 'uc-flow';
import { length, substring } from 'uc-strings';

export default {
  setValue: function() {
    // interface, implement this in your class
  },

  getValue: function() {
    // interface, implement this in your class
  },

  setPlaceholder: function() {
    // interface, implement this in your class
  },

  removePlaceholder: function() {
    // interface, implement this in your class
  },

  setCarret: function() {
    // interface, implement this in your class
  },

  getCarret: function() {
    // interface, implement this in your class
  },

  resetCarret: function() {
    // interface, implement this in your class
  },

  setup: function(opts) {
    this.debouncedUpdate = debounce(this.update, opts.debounce || 500);

    let isMeta = false;
    this._value = this.getValue();
    this.limit = opts.limit;
    this.events = {};
    this.events.click = on(this.el, 'click', e => e.stopPropagation());
    this.events.focus = on(this.input, 'focus', () => this.removeClass('input-message'));
    this.events.blur = on(this.input, 'blur', () => {
      isMeta = false;
      this.toggleClass('input-value', this.getValue() !== '');
      this.onKeyUp();
    })
    this.events.paste = on(this.input, 'paste', e => this.onPaste(e));
    this.events.keydown = on(this.input, 'keydown', e => {
      isMeta = e.altKey || e.ctrlKey || e.metaKey
    });
    this.events.keyup = on(this.input, 'keyup', e => {
      if (isMeta || !e.keyCode) {
        return;
      }
      this.onKeyUp();
    });

    opts.placeholder && this.setPlaceholder(opts.placeholder);
    this.toggleClass('input-value', this.getValue() !== '');
  },

  onKeyUp: function() {
    const pos = this.getCarret();
    const limit = this.limit;
    let val = this.transform(this.getValue(), true);
    let needUpdate = false;

    if (limit && length(val) > limit) {
      val = substring(val, 0, limit);
      needUpdate = true;
    }

    if (val !== this._value || needUpdate) {
      this._value = val;
      this.setValue(val);
      this.setCarret(pos);
      this.debouncedUpdate(val);
    }
  },

  onPaste: function(e) {
    const str = e.clipboardData.getData('text/plain');
    const pos = this.getCarret();
    document.execCommand('insertText', false, str);
    e.preventDefault();
    e.stopPropagation();

    setTimeout(() => {
      const val = this.transform(this.getValue());
      this.setValue(val);
      this.setCarret(pos + str.length);
      this.update(val);
    }, 100);
  },

  update: function(val, silent) {
    this.removeClass('error');
    !silent && this.didUpdate && this.didUpdate(val);
  },

  focus: function() {
    this.input.focus();
    this.resetCarret();
    return this;
  },

  blur: function() {
    this.input.blur();
    return this;
  },

  value: function(val, dontUpdate) {
    if (val === undefined) {
      return this.getValue();
    }

    const value = this.getValue();
    val = this.transform(val);

    if (val !== value) {
      this.setValue(val);
      if (dontUpdate) {
        this.toggleClass('input-value', val !== '');
      } else {
        this.update(val);
      }
    }
    return this;
  },

  on: function(...args) {
    return on.apply(null, [ this.input ].concat(args));
  },

  off: function(...args) {
    return off.apply(null, [ this.input ].concat(args));
  },

  destroy: function() {
    this.removePlaceholder && this.removePlaceholder();
    this.removeClass('input-msg', 'input-value');

    const events = this.events;
    off(this.el, 'click', events.click);
    off(this.input, 'focus', events.focus);
    off(this.input, 'blur', events.blur);
    off(this.input, 'paste', events.paste);
    off(this.input, 'keydown', events.keydown);
    off(this.input, 'keyup', events.keyup);

    delete this.input;
    delete this.events;
  }
}
