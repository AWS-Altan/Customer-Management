var cancelOffering = JSON.parse(context.getVariable("offeringId"));
var queryOfferings = JSON.parse(context.getVariable("SuppOfferings.suppOff"));

var formatDate = "YYYYMMDDHHmmss";
var currentDate = context.getVariable("timestamp_mex");
var expireEffectiveDate = moment(currentDate.toString(), formatDate).add('1','minutes').format(formatDate);
var hasDownSpeed = "0";
try{
    main();
}catch(e){
    print('Error: ' + e);
}



function main(){
	var deleteOfferings = [];
	var offeringsWithErrors = [];
    var payloadDelete = '';
    var i, index;
	var isValidOfferId = "false";
	
	
	if ( typeof(queryOfferings) !== 'undefined' && queryOfferings !== null && queryOfferings !== "" && Array.isArray(queryOfferings)){
	    searchManyOffers(cancelOffering, queryOfferings, deleteOfferings);
	}else{
		searchOneOffer(cancelOffering,  queryOfferings, deleteOfferings);
	}
	

	for ( i = 0; i < deleteOfferings.length ; i++){
	    if ( isLowerThanToday(deleteOfferings[i].effectiveDate)  ){
	        context.setVariable("isLowerThanToday", "true" );
	        //return;
	    }
		payloadDelete += 
		'<off:DeleteOffering>'  +
        '                   <off:OfferingId>'  +
        '                       <com:OfferingId>'+deleteOfferings[i].offeringId+'</com:OfferingId>'  +
        '                       <com:PurchaseSeq>'+deleteOfferings[i].secuency+'</com:PurchaseSeq>'  +
        '                   </off:OfferingId>'  +
        evalTypeMode(expireEffectiveDate)+
        '               </off:DeleteOffering>';
        isValidOfferId = "true";
	}
      
   payloadDelete = setCompletePayload(payloadDelete);
   context.setVariable("payloadDeleteSection", payloadDelete);
   context.setVariable("isValidOfferId", isValidOfferId);
   context.setVariable("hasDownSpeed", hasDownSpeed);

}

function searchOneOffer(offeringId, offeringSource,deleteOfferings){
	var tempOffering={};
	print('offeringSource.OfferingId.OfferingId::' + offeringSource.OfferingId.OfferingId.toString())
	print('Comparacion Offering Down Speed:: ' + (  offeringSource.OfferingName.toString().includes("Down Speed")  ||  offeringSource.OfferingName.toString().includes("Down_Speed") ) );
	if ( 
           offeringSource.OfferingId.OfferingId.toString() == '1220000000'  && 
           isHigherThanCurrent(offeringSource.ExpireDate) 
   //        &&         (  offeringSource.OfferingName.toString().includes("Down Speed")  ||  offeringSource.OfferingName.toString().includes("Down_Speed") )
    	){
    	print('Oferta Suplementaria - Down Speed encontrada');
		tempOffering.secuency = offeringSource.OfferingId.PurchaseSeq;
		tempOffering.offeringId = offeringSource.OfferingId.OfferingId;
		tempOffering.effectiveDate = offeringSource.EffectiveDate;
		deleteOfferings.push(tempOffering);
		hasDownSpeed="1";

	}
}

function searchManyOffers(offeringId,  offerings, deleteOfferings){
	for ( var i = 0; i < offerings.length; i++){
          searchOneOffer(offeringId, offerings[i], deleteOfferings);
	}
}

function evalTypeMode(expireEffectiveDate){
    var mode = '';
        mode = '<off:ExpireMode>'  +
        '   <off:Mode>I</off:Mode>' +
        '   <off:ExpirationDate>'+expireEffectiveDate+'</off:ExpirationDate>'+
        '</off:ExpireMode>';    
    return mode;
}

function setCompletePayload(payloadDelete){
    var payloadPurchase = '               <com:ReqHeader>'  +
'                   <!--Optional:-->'  +
'                   <com:Version>1</com:Version>'  +
'                   <!--Optional:-->'  +
'                   <com:BusinessCode>ChangeSupplementaryOffering</com:BusinessCode>'  +
'                   <com:TransactionId>'+context.getVariable("transactionId")+'</com:TransactionId>'  +
'                   <com:Channel>51</com:Channel>'  +
'                   <!--Optional:-->'  +
'                   <com:PartnerId>'+context.getVariable("PartnerId")+'</com:PartnerId>'  +
'                   <!--Optional:-->'  +
'                   <com:BrandId>101</com:BrandId>'  +
'                   <com:ReqTime>'+context.getVariable("timestamp_mex")+'</com:ReqTime>'  +
'                   <!--Optional:-->'  +
'                   <com:TimeFormat>'  +
'                       <com:TimeType>1</com:TimeType>'  +
'                       <!--Optional:-->'  +
'                       <com:TimeZoneID>1083</com:TimeZoneID>'  +
'                   </com:TimeFormat>'  +
'                   <!--Optional:-->'  +
'                   <com:MsgLanguage>2049</com:MsgLanguage>'  +
'                   <com:AccessUser>'+context.getVariable("Operation-User")+'</com:AccessUser>'  +
'                   <com:AccessPassword>'+context.getVariable("Operation-Password")+'</com:AccessPassword>'  +
'                   <!--Optional:-->'  +
'                   <com:OperatorId>'+context.getVariable("OperatorId")+'</com:OperatorId>'  +
'                   <!--0 to 100 repetitions:-->'  +
'                   <com:AdditionalProperty>'  +
'                       <com:Code>1</com:Code>'  +
'                       <com:Value>1</com:Value>'  +
'                   </com:AdditionalProperty>'  +
'               </com:ReqHeader>'  +
'               <off:AccessInfo>'  +
'                   <com:ObjectIdType>4</com:ObjectIdType>'  +
'                   <com:ObjectId>'+context.getVariable("msisdn")+'</com:ObjectId>'  +
'               </off:AccessInfo>'  +
'               <!--0 to 100 repetitions:-->'  + 
                payloadDelete;    
    return payloadPurchase;
}

function isLowerThanToday(effectiveDate){
    var format = "YYYYMMDD";
    var today = moment().tz("America/Mexico_City").format(format);
    
    effectiveDate = moment(effectiveDate, format).format(format);
    print('Fecha efectiva: ' + effectiveDate);
    print('Today: ' + today);
    
    print('Comparacion: ' + (effectiveDate <= today) );
    return (effectiveDate <= today) ;
}


function isHigherThanCurrent(expireDate){
    var format = "YYYYMMDDHHmmss";
    var today = moment().tz("America/Mexico_City").format(format);
    
    expireDate = moment(expireDate, format).format(format);
    print('Fecha expiracion: ' + expireDate);
    print('Today: ' + today);
    
    print('Comparacion: ' + (expireDate > today) );
    return (expireDate > today) ;
}