var font = _require("font");

var parseMorseAlphabet = function() {
    var alphabetString = 
		"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;"+
		"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;"+
        "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
    var alphabetArray = alphabetString.split(/[=;]/);
    var result = [];
    for (var i = 0; i < alphabetArray.length; i+=2) {
        result.push(new font.singleLineChar(alphabetArray[i], alphabetArray[i+1]));
    }
    return result;
}

var morseFont = new font.font("morseFont", parseMorseAlphabet());
font.font.prototype._render = font.font.prototype.render;
// Overwrite method 'render' to add '//' between characters 
morseFont.render = function(text) {
	// Call original render
	var result = this._render(text);
    for (var i = 0; i < result.length-1; i++) {
        if (result[i+1] != '//' && result[i] != '//')
            result[i] = result[i] + '/';
    }
    return result;
}

module.exports = morseFont;
