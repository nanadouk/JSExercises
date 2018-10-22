function Char(value) {
    this.value = value;
}

Char.prototype.getValue = function() {
    return this.value;
}

function SingleLineChar(value, string) {
    Char.call(this, value);
    this.string = string;
}

SingleLineChar.prototype = Object.create(Char.prototype);
SingleLineChar.prototype.constructor = SingleLineChar;

SingleLineChar.prototype.getString = function() {
    return this.string;
}

//module.exports = SingleLineChar;

function MultiLineChar(value, lines) {
    Char.call(this, value);
    this.lines = lines;
}

MultiLineChar.prototype = Object.create(Char.prototype);
MultiLineChar.prototype.constructor = MultiLineChar;

MultiLineChar.prototype.getLine = function(index) {
	if (index < this.lines.length && index >= 0)
		return this.lines[index];
}

//module.exports = MultiLineChar;

function Font(name, chars, lineHeight) {
    this.name = name;                           
    this.map = Object.create(null);                      
    chars.forEach(function(item, index) {                  
        this.map[item.getValue()] = item;                 
    }, this);
    this.lineHeight = lineHeight || 1;                                    
}

Font.prototype.render = function(text) {
    var result = [];
    text.split('').forEach(element => {
		// Check if a Font contains of SingleLineChars or MultiLineChars
		if (this.map[element] instanceof SingleLineChar)
			result.push(this.map[element].string);
		else if (this.map[element] instanceof MultiLineChar){
			// The result is 2d array, each element of this array is an array of lines, which represents of one provided letter
			for (var i=0; i<this.lineHeight; i++) {
				if (result[i] == undefined) result[i] = '';
				result[i] += this.map[element].getLine(i);
			}
		}
	});
	return result;
}

Font.prototype.write = function(text) {
	var arr = this.render(text);
	if (this.lineHeight == 1)
		// For SingleLineChars Font just convert an array to string
		console.log(arr.join('').toString());
	else {
		arr.forEach(function(item, index){
			console.log(item);
		});
	}
}

//module.exports = Font;
module.exports = {
	singleLineChar: SingleLineChar,
	multiLineChar: MultiLineChar,
	font: Font
}
