class RegexWorld {
  constructor(){
    this._str = null;
    this._regexObject = null;
  }

  setStr(str){
    if(!str) return null;
    this._str = str;
    return this;
  }

  setRegex(obj){
    if(!obj) return null;
    else{
      this._regexObject = obj;
      return this;
    }
  }

  regexStart(options, func){
    if(!this._regexObject || !this._str) return func("missing something to set (regex||str)");
    else{
      let obj = {};
      let $this = this;
      if(Array.isArray($this._regexObject)){
        let obj = [];
        $this._regexObject.forEach(regex => {
          let matches, output = [];
          while(matches = regex.exec($this._str)){
            delete matches.input;
            let index = matches.index;
            if(options && options.justCroupCap){
              matches = matches.slice(1);
              matches.index = index;
            }
            output.push(matches);
          }
          obj.push(output);
        });
        if(options && options.concat){
          let newObj = [];
          obj.forEach(matches => {
            newObj = newObj.concat(matches);
          });
          obj = newObj;
        }
        return func(null, obj);
      }else if(Object.keys($this._regexObject).length != 0){
        Object.keys($this._regexObject).forEach(key => {
          let matches, output = [];
          while(matches = $this._regexObject[key].exec($this._str)){
            delete matches.input;
            let index = matches.index;
            if(options && options.justCroupCap){
              matches = matches.slice(1);
              matches.index = index;
            }
            output.push(matches);
          }
          obj[key] = output;
          //obj[key] = $this._str.match($this._regexObject[key]);
        });
        return func(null, obj);
      }else{
        let matches, output = [];
        while(matches = $this._regexObject.exec($this._str)){
          delete matches.input;
          let index = matches.index;
          if(options && options.justCroupCap){
            matches = matches.slice(1);
            matches.index = index;
          }
          output.push(matches);
        }
        obj = output;
        return func(null, obj);
      }
    }
  }

  parse(str, flag){
    if(!str) return null;
    return new RegExp(str, flag);
  }

}

module.exports = new RegexWorld();
