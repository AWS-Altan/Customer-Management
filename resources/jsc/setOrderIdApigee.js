var transactionId = context.getVariable('transactionId');
var transactionCut = transactionId.substring(0,15);
var transactionCutUpper = transactionCut.toUpperCase();
var orderIdApigee = '';
var transactionReplaceNumberForLetters = '';
var transactionIdToNumbers = '';
var counter = 1;
var sumOfNumbers = 0;
print('transactionCutUpper: '+transactionCutUpper);
for (var i = 0; i< transactionCutUpper.length; i++) {
	var caracter = transactionCutUpper.charAt(i);
  	if(caracter == 'A' || caracter == 'J' || caracter == 'S'){
		transactionReplaceNumberForLetters+='1';
  	}else if(caracter == 'B' || caracter == 'K' || caracter == 'T'){
    	transactionReplaceNumberForLetters+='2';
  	}else if(caracter == 'C' || caracter == 'L' || caracter == 'U'){
    	transactionReplaceNumberForLetters+='3';
  	}else if(caracter == 'D' || caracter == 'M' || caracter == 'V'){
    	transactionReplaceNumberForLetters+='4';
  	}else if(caracter == 'E' || caracter == 'N' || caracter == 'W'){
		transactionReplaceNumberForLetters+='5';
  	}else if(caracter == 'F' || caracter == 'O' || caracter == 'X'){
    	transactionReplaceNumberForLetters+='6';
  	}else if(caracter == 'G' || caracter == 'P' || caracter == 'Y'){
    	transactionReplaceNumberForLetters+='7';
  	}else if(caracter == 'H' || caracter == 'Q' || caracter == 'Z'){
    	transactionReplaceNumberForLetters+='8';
  	}else if(caracter == 'I' || caracter == 'R'){
    	transactionReplaceNumberForLetters+='9';
  	}else{
    	transactionReplaceNumberForLetters+=caracter;
  	}

}
print('transactionReplaceNumberForLetters: '+transactionReplaceNumberForLetters)
for (var i = 0; i< transactionReplaceNumberForLetters.length; i++) {
	var digit = parseInt(transactionReplaceNumberForLetters.charAt(i));
  	if(counter%2 == 1){
    	digit = digit*2
        digitStr = digit.toString();
        if(digitStr.length>1){
        	var singleNumber = 0;
        	for(var w=0; w<digitStr.length; w++){
            	singleNumber += parseInt(digitStr.charAt(w));
            }
            digit = singleNumber
        }
    }else{
    	digit = digit*1
        digitStr = digit.toString();
        if(digitStr.length>1){
        	var singleNumber = 0;
        	for(var w=0; w<digitStr.length; w++){
            	singleNumber += parseInt(digitStr.charAt(w));
            }
            digit = singleNumber;
        }
    }
    counter++;
    transactionIdToNumbers+=digit.toString();
}
print('transactionIdToNumbers:'+transactionIdToNumbers);

for (var i = 0; i< transactionIdToNumbers.length; i++) {
	var digitPhaseTwo = parseInt(transactionIdToNumbers.charAt(i));
  	sumOfNumbers+=digitPhaseTwo;
}
var verificatorDigit = 10-(sumOfNumbers%10);
orderIdApigee = transactionIdToNumbers+verificatorDigit.toString();
orderIdApigee = (orderIdApigee.length>16)?orderIdApigee.substring(0,16):orderIdApigee;

print('transactionIdToNumbersFinal: '+orderIdApigee);

context.setVariable('orderIdApigee', orderIdApigee);