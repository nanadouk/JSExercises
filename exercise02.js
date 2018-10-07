function Char(value, string) {
    this.value = value;
    this.string = string
}

function Font(name, chars) {
    this.name = name;                           // OR
    this.map = new Map();                       // this.map = Object.create(null) !!!null pointer, not this.map = {}
    chars.forEach(element => {                  // chars.forEach(function(item, index) {
        this.map.set(element.value, element);   //      this.map[item.value] = item; 
    });                                         // }, this);    // or }.bind(this));
}

Font.prototype.render = function(text) {
   var result = "";
   text.split('').forEach(element => {
        for (var key of this.map.keys()) {
            if (element.toLowerCase() == key)
                result += this.map.get(key).string;
        }
    });
    return result;
}

Font.prototype.write = function(text, to) {
    if (to == undefined)
        console.log("Console: " + this.render(text));
    else 
        to(this.render(text));
    // BETTER
    // to = to || console.log;
    // to(this.render(text));
}

var parseMorseAlphabet = function() {
    var alphabetString = 
		"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;"+
		"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;"+
        "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
    var alphabetArray = alphabetString.split(/[=;]/);
    var result = [];
    for (var i = 0; i < alphabetArray.length; i+=2) {
        result.push(new Char(alphabetArray[i], alphabetArray[i+1]));
    }
    return result;
}

var morseFont = new Font("morseFont", parseMorseAlphabet());

console.log(morseFont.map);
console.log(morseFont.render('a b ?'));
morseFont.write("a");

var f = function(text) {
    console.log("Function to: " + text);
}
morseFont.write("a", f);

morseFont.render = function(text) {
    var result = [];
    text.split('').forEach(char => {
        for (var key of this.map.keys()) {
            if (char.toLowerCase() == key)
                result.push(this.map.get(key).string);
        }
    });
    
    for (var i = 0; i < result.length-1; i++) {
        if (result[i+1] != '//' && result[i] != '//')
            result[i] = result[i] + '/';
    }
    return result.join('').toString();
}

morseFont.write("ab c");