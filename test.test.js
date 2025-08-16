// regexWorld.test.js
const regexWorld = require("./test");

describe("RegexWorld (mocked)", () => {
  beforeEach(() => {
    // reset internal state before each test
    regexWorld._str = null;
    regexWorld._regexObject = null;
  });

  // --- setStr & setRegex ---
  test("setStr sets the internal string", () => {
    const result = regexWorld.setStr("hello world");
    expect(result).toBe(regexWorld);
    expect(regexWorld._str).toBe("hello world");
  });

  test("setStr returns null if no string provided", () => {
    expect(regexWorld.setStr()).toBeNull();
  });

  test("setRegex sets the internal regex object", () => {
    const regex = /hello/;
    const result = regexWorld.setRegex(regex);
    expect(result).toBe(regexWorld);
    expect(regexWorld._regexObject).toBe(regex);
  });

  test("setRegex returns null if no object provided", () => {
    expect(regexWorld.setRegex()).toBeNull();
  });

  // --- parse ---
  test("parse returns a RegExp instance", () => {
    const re = regexWorld.parse("abc", "g");
    expect(re).toBeInstanceOf(RegExp);
    expect(re.flags).toBe("g");
  });

  test("parse returns null if no string", () => {
    expect(regexWorld.parse()).toBeNull();
  });

  // --- regexStart with single regex ---
  test("regexStart finds matches for single regex", (done) => {
    regexWorld.setStr("abc abc abc").setRegex(/abc/g);
    regexWorld.regexStart({}, (err, result) => {
      expect(err).toBeNull();
      expect(result.length).toBe(3);
      done();
    });
  });

  // --- regexStart with array of regex ---
  test("regexStart finds matches for array of regex", (done) => {
    regexWorld.setStr("abc 123 xyz 456").setRegex([/abc/, /\d+/]);
    regexWorld.regexStart({}, (err, result) => {
      expect(err).toBeNull();
      expect(result.length).toBe(2);
      expect(result[0][0][0]).toBe("abc");
      expect(result[1][0][0]).toBe("123");
      done();
    });
  });

  // --- regexStart with object of regex ---
  test("regexStart finds matches for object of regex", (done) => {
    regexWorld.setStr("abc 123 xyz").setRegex({ letters: /[a-z]+/g, digits: /\d+/g });
    regexWorld.regexStart({}, (err, result) => {
      expect(err).toBeNull();
      expect(result.letters.length).toBeGreaterThan(0);
      expect(result.digits[0][0]).toBe("123");
      done();
    });
  });

  // --- regexStart error if missing str or regex ---
  test("regexStart returns error if missing regex or string", (done) => {
    regexWorld._str = null;
    regexWorld._regexObject = null;
    regexWorld.regexStart({}, (err) => {
      expect(err).toMatch(/missing something/);
      done();
    });
  });

  // --- optional chaining option justCroupCap ---
  test("regexStart uses justCroupCap option", (done) => {
    regexWorld.setStr("abc123").setRegex(/(abc)(\d+)/);
    regexWorld.regexStart({ justCroupCap: true }, (err, result) => {
      expect(err).toBeNull();
      expect(result[0].length).toBe(2); // sliced array
      expect(result[0].index).toBeDefined();
      done();
    });
  });

  // --- optional chaining option concat ---
  test("regexStart uses concat option with array of regex", (done) => {
    regexWorld.setStr("a1b2").setRegex([/[a-z]/g, /\d/g]);
    regexWorld.regexStart({ concat: true }, (err, result) => {
      expect(err).toBeNull();
      expect(result.flat().length).toBe(4); // concatenated
      done();
    });
  });
});
