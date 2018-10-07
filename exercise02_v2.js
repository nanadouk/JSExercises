function Char(value, string) {
    this.value = value;
    this.string = string
}

function Font(name, chars) {
    this.name = name;                           
    this.map = Object.create(null);                      
    chars.forEach(function(item, index) {                  
        this.map[item.value] = item;                 
    }, this);                                         
}

Font.prototype.render = function(text) {
    var result = "";
    text.split('').forEach(element => {
        for (var i in this.map) {
            if (i == element.toLowerCase())
                result += this.map[i].string;
        }
    });
    return result;
}

Font.prototype.write = function(text, to) {
    to = to || console.log;
    to(this.render(text));
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
    text.split('').forEach(element => {
        for (var i in this.map) {
            if (i == element.toLowerCase())
                result.push(this.map[i].string);
        }
    });
    
    for (var i = 0; i < result.length-1; i++) {
        if (result[i+1] != '//' && result[i] != '//')
            result[i] = result[i] + '/';
    }
    return result.join('').toString();
}

morseFont.write("ab c");