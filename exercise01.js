var alphabetString = 
		"a=.-;b=-...;c=-.-.;d=-..;e=.;f=..-;g=--.;h=....;i=..;j=.---;k=-.-;l=.-..;"+
		"m=--;n=-.;o=---;p=.---.;q=--.-;r=.-.;s=...;t=-;u=..-;v=...-;w=.--;x=-..-;"+
        "y=-.-;z=--..; =//;.=.-.-.-;,=--..--;?=..--..;!=-.-.--";
        
var arr = alphabetString.split(/[=;]/);

var charToMorseCode = function(char) {
    for (var j = 0; j < arr.length; j += 2) {
        if (char.toLowerCase() == arr[j]) 
            return arr[j+1];    
    }
    return "";
}

var convertToMorse = function(text) {
    var result = "";
    text.split('').forEach(element => {
        result += charToMorseCode(element);
    });
    /* OR
    for (var i = 0; i < text.length; i++) {
        result += charToMorseCode(text[i]);
    }
    */
    return result;
}

console.log(convertToMorse("a b ?"));
