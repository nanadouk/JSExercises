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

function MultiLineChar(value, lines) {
    Char.call(this, value);
    this.lines = lines;
}

MultiLineChar.prototype = Object.create(Char.prototype);
MultiLineChar.prototype.constructor = MultiLineChar;

MultiLineChar.prototype.getLine = function(index) {
    return this.lines[index];
}

function Font(name, chars, lineHeight) {
    this.name = name;                           
    this.map = Object.create(null);                      
    chars.forEach(function(item, index) {                  
        this.map[item.value] = item;                 
    }, this);
    this.lineHeight = lineHeight || 1;                                    
}

Font.prototype.render = function(text) {
    var result = new Array();
    text.split('').forEach(element => {
		for (var i in this.map) {
            if (i == element) {
				// Check if a Font contains of SingleLineChars of MultiLineChars
				if (this.lineHeight == 1)
					result.push(this.map[i].string);
				else {
					// The result is 2d array, each element of this array is an array of lines, which represents of one provided letter
					var tmp = new Array();
					for (var j=0; j<this.lineHeight; j++) {
						tmp.push(this.map[i].getLine(j));
					}
					result.push(tmp);
				}
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
		// For MultiLineChars Font create temporal array of 4 empty strings
		// 1. string will contain 1. lines of every letter and so on
		var tmp = new Array();
		for (var i = 0; i<this.lineHeight; i++) {
			tmp.push('');
		}
		for (var i = 0; i<this.lineHeight; i++) {
			for (var j = 0; j<arr.length; j++){
				// Add to the i-th string i-th line of every character
				tmp[i] += arr[j][i];
			}
		}
		// Print out every line of temporal array
		tmp.forEach(element => {
			console.log(element);
		});
	}
}

var parseMorseAlphabet = function() {
    var alphabetString = 
		"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;"+
		"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;"+
        "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
    var alphabetArray = alphabetString.split(/[=;]/);
    var result = new Array();
    for (var i = 0; i < alphabetArray.length; i+=2) {
        result.push(new SingleLineChar(alphabetArray[i], alphabetArray[i+1]));
    }
    return result;
}

var morseFont = new Font("morseFont", parseMorseAlphabet());
Font.prototype._render = Font.prototype.render;
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

morseFont.write("java script");

var getSlimAlphabet = function() {
	var a = [];
	
	a[0] = ['A', [	'.__.',
					'[__]',
					'|  |',
					'    ' ]];

	a[1] = ['B', [	'.__ ',
					'[__)',
					'[__)',
					'    ' ]];

	a[2] = ['C', [	' __ ',
					'/  `',
					'\\__.',
					'    ' ]];
			
	a[3] = ['D', [	'.__ ',
					'|  \\',
					'|__/',
					'    ' ]];

	a[4] = ['E', [	'.___',
					'[__ ',
					'[___',
					'    ' ]];

	a[5] = ['F', [	'.___',
					'[__ ',
					'|   ',
					'    ' ]];

	a[6] = ['G', [	'.__ ',
					'[ __',
					'[_./',
					'    ' ]];
			
	a[7] = ['H', [	'.  .',
					'|__|',
					'|  |',
					'    ' ]];
			
	a[8] = ['I', [	'._.',
					' | ',
					'_|_',
					'    ' ]];
				
	a[9] = ['J', [	'  .',
					'  |',
					'\\_|',
					'   ' ]];
				
	a[10] = ['K', [	'.  .',
					'|_/ ',
					'|  \\',
					'   ' ]];	

	a[11] = ['L', [	'.   ',
					'|   ',
					'|___',
					'    ' ]];

	a[12] = ['M', [	'.  .',
					'|\\/|',
					'|  |',
					'    ' ]];

	a[13] = ['N', [	'.  .',
					'|\\ |',
					'| \\|',
					'    ' ]];

	a[14] = ['O', [	'.__.',
					'|  |',
					'|__|',
					'   ' ]];

	a[15] = ['P', [	'.__ ',
					'[__)',
					'|   ',
					'    ' ]];

	a[16] = ['Q', [	'.__.',
					'|  |',
					'|__\\',
					'    ' ]];

	a[17] = ['R', [	'.__ ',
					'[__)',
					'|  \\',
					'    ' ]];

	a[18] = ['S', [	' __.',
					'(__ ',
					'.__)',
					'    ' ]];

	a[19] = ['T', [	'.___.',
					'  |  ',
					'  |  ',
					'     ' ]];

	a[20] = ['U', [	'.  .',
					'|  |',
					'|__|',
					'    ' ]];

	a[21] = ['V', [	'.  .',
					'\\  /',
					' \\/ ',
					'    ' ]];

	a[22] = ['W', [	'.  .',
					'|  |',
					'|/\\|',
					'    ' ]];

	a[23] = ['X', [	'\\  /',
					' >< ', 
					'/  \\',
					'    ' ]];

	a[24] = ['Y', [	'.   ,',
					' \\./ ',
					'  |  ',
					'     ' ]];

	a[25] = ['Z', [	'.___.',
					'  _/ ',
					'./__.',
					'     ' ]];
									  
	a[26] = ['a', [	'   ',
					' _.',
					'(_]',
					'   ']];
				
	a[27] = ['b', [	'.  ',
					'|_ ',
					'[_)',
					'   ']];
				
	a[28] = ['c', [	'   ',
					' _.',
					'(_.',
					'   ']];
				
	a[29] = ['d', [	'  .',
					' _|',
					'(_]',
					'   ']];
				
	a[30] = ['e', [	'   ',
					' _ ',
					'(/,',
					'   ']];
				
	a[31] = ['f', [	'._',
					'|,',
					'| ',
					'  ']];
				
 a[32] = ['g', [	'   ',
					' _ ',
					'(_]',
					'._|']];
				
	a[33] = ['h', [	'.  ',
					'|_ ',
					'[ )',
					'   ']];
				
	a[34] = ['i', [	' ',
					'*',
					'|',
					' ']];
				
	a[35] = ['j', [	'   ',
					'  *',
					'  |',
					'._|']];
				
	a[36] = ['k', [	'.  ',
					';_/',
					'| \\',
					'   ']];
				
	a[37] = ['l', [	'.',
					'|',
					'|',
					' ']];
				
	a[38] = ['m', [	'     ',  
					'._ _ ',
					'[ | )',
					'     ']];
				
	a[39] = ['n', [	'   ',
					'._ ',
					'[ )',
					'   ']];
				
	a[40] = ['o', [	'   ',
					' _ ',
					'(_)',
					'   ']];
				
	a[41] = ['p', [	'   ',
					'._ ',
					'[_)',
					'|  ']];
				
	a[42] = ['q', [	'   ',
					' _.',
					'(_]',
					'  |']];
				
	a[43] = ['r', [	'   ',
					'._.',
					'[  ',
					'   ']];
				
	a[44] = ['s', [	'   ',
					' __',
					'_) ',
					'   ']];
				
	a[45] = ['t', [	' , ',
					'-+-',
					' | ',
					'   ']];
				
	a[46] = ['u', [	'   ',
					'. .',
					'(_|',
					'   ']];
				
	a[47] = ['v', [	'    ',
					'.  ,',
					' \\/ ',
					'    ']];
				
	a[48] = ['w', [	'      ',
					'.    ,',
					' \\/\\/ ',
					'      ']];
				
	a[49] = ['x', [	'   ',
					'\\./',
					'/\'\\',
					'   ']];
				
	a[50] = ['y', [	'   ',
					'  .',
					'\\_|',
					'._|']];
				
	a[51] = ['z', [	'   ',
					'__.',
					' /_',
					'   ']];

	a[52] = [' ', [	'  ',
					'  ',
					'  ',
					'  ']];

	a[53] = ['!', [	' | ',
					' | ',
					' * ',
					'   ']];

	a[54] = ['?', [	' _ ',
				   '\' )',
					' ; ',
					'   ']];
	var result = [];
	for (var i=0; i< a.length; i++) {
		result.push(new MultiLineChar(a[i][0], a[i][1]));
	}
	return result;
}

var slimFont = new Font("SlimFont", getSlimAlphabet(), 4);
slimFont.write("JAVA SCRIPT");
