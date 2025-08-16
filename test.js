// regexWorld.js
class RegexWorld {
  constructor() {
    this._str = null;
    this._regexObject = null;
  }

  // --- setStr ---
  setStr(str) {
    if (!str) return null;
    this._str = str;
    return this;
  }

  // --- setRegex ---
  setRegex(obj) {
    if (!obj) return null;
    this._regexObject = obj;
    return this;
  }

  // --- regexStart ---
  regexStart(options, func) {
    if (!this._regexObject || !this._str) return func("missing something to set (regex||str)");

    const runSingleRegex = (regex) => {
      const output = [];
      let matches;
      let lastIndex = -1;
      while ((matches = regex.exec(this._str)) !== null) {
        if (regex.lastIndex === lastIndex) break; // prevent infinite loop on zero-width match
        lastIndex = regex.lastIndex;

        delete matches.input;
        const index = matches.index;
        if (options?.justCroupCap) matches = matches.slice(1);
        matches.index = index;
        output.push(matches);
      }
      return output;
    };

    let obj = {};

    if (Array.isArray(this._regexObject)) {
      obj = this._regexObject.map(regex => runSingleRegex(regex));
      if (options?.concat) obj = obj.flat();
      return func(null, obj);
    }

    if (typeof this._regexObject === "object" && !(this._regexObject instanceof RegExp)) {
      Object.keys(this._regexObject).forEach(key => {
        obj[key] = runSingleRegex(this._regexObject[key]);
      });
      return func(null, obj);
    }

    // single RegExp
    obj = runSingleRegex(this._regexObject);
    return func(null, obj);
  }

  // --- parse ---
  parse(str, flag) {
    if (!str) return null;
    return new RegExp(str, flag);
  }
}

module.exports = new RegexWorld();
