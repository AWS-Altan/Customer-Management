var cancelOffering = JSON.parse(context.getVariable("offeringId"));
var cancelSecuencyOffering = context.getVariable("purchasedSecuency");
var queryOfferings = JSON.parse(context.getVariable("SuppOfferings.suppOff"));

var expireEffectiveDate = context.getVariable("expireEffectiveDate");

var currentDate = context.getVariable("timestamp_mex");

var formatDate = "YYYYMMDDHHmmss";

var format = "YYYYMMDD";

var deleteCaseSKY=( typeof(context.getVariable("delete")) !== 'undefined' && context.getVariable("delete") !== null && context.getVariable("delete") !== "" ) ? context.getVariable("delete") : "";
deleteCaseSKY=deleteCaseSKY.toString();
print("\ndeleteCaseSKY::"+ deleteCaseSKY.toString() + "\n" );

var deleteOfferingsSKY = [];

main();


function main(){
	var deleteOfferings = [];
	var offeringsWithErrors = [];
    var payloadDelete = '';
    var i, index;
	var isValidOfferId = false;
	
	
	if ( typeof(queryOfferings) !== 'undefined' && queryOfferings !== null && queryOfferings !== "" && Array.isArray(queryOfferings)){
	    print("\n searchManyOffers \n");
		searchManyOffers(cancelOffering, cancelSecuencyOffering, queryOfferings, deleteOfferings);
	}else{
	    print("\n searchOneOffer \n");
		searchOneOffer(cancelOffering, cancelSecuencyOffering, queryOfferings, deleteOfferings);
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
        isValidOfferId = true;
	}
	
	//TODO STR para pruebas Cambiar condicion
	if( deleteCaseSKY ==="1"){
	//if( deleteCaseSKY ==="0"){
	    print("Caso SKYHBB::" +  deleteOfferingsSKY.length +"\n");
	    for ( i = 0; i < deleteOfferingsSKY.length ; i++){
    	    if ( isLowerThanToday(deleteOfferingsSKY[i].effectiveDate)  ){
    	        context.setVariable("isLowerThanToday", "true" );
    	        //return;
    	    }
    		payloadDelete += 
    		'<off:DeleteOffering>'  +
            '                   <off:OfferingId>'  +
            '                       <com:OfferingId>'+deleteOfferingsSKY[i].offeringId+'</com:OfferingId>'  +
            '                       <com:PurchaseSeq>'+deleteOfferingsSKY[i].secuency+'</com:PurchaseSeq>'  +
            '                   </off:OfferingId>'  +
            evalTypeMode(moment( currentDate , formatDate).format(format))+
            '               </off:DeleteOffering>';
            isValidOfferId = true;
	    }
	    
	}
      
   payloadDelete = setCompletePayload(payloadDelete);
   context.setVariable("payloadDeleteSection", payloadDelete);
   context.setVariable("isValidOfferId", isValidOfferId);
}

function searchOneOffer(offeringId, secuency, offeringSource,deleteOfferings){
	var tempOffering={};
	if ( offeringSource.OfferingId.OfferingId == offeringId && 
    	offeringSource.OfferingId.PurchaseSeq == secuency){
		tempOffering.secuency = offeringSource.OfferingId.PurchaseSeq;
		tempOffering.offeringId = offeringSource.OfferingId.OfferingId;
		tempOffering.effectiveDate = offeringSource.EffectiveDate;
		deleteOfferings.push(tempOffering);
		return true;
		
	}else{
	    print("\n OfferingId.OfferingId::" +  offeringSource.OfferingId.OfferingId + "  EffectiveDate::" + offeringSource.EffectiveDate + "\n");
	    //TODO STR para pruebas Cambiar condicion
	    if ( deleteCaseSKY==='1' && offeringSource.OfferingId.OfferingId == offeringId && isLowerThanToday( offeringSource.EffectiveDate ) ){
	    //if ( deleteCaseSKY==='0' && offeringSource.OfferingId.OfferingId == offeringId && isLowerThanToday( offeringSource.EffectiveDate ) ){
	       if(offeringSource.OfferingId.PurchaseSeq == cancelSecuencyOffering){ 
	    		print ("Entra a caso");
		   		tempOffering.secuency = offeringSource.OfferingId.PurchaseSeq;
				tempOffering.offeringId = offeringSource.OfferingId.OfferingId;
				tempOffering.effectiveDate = offeringSource.EffectiveDate;
				deleteOfferingsSKY.push(tempOffering);
				return true;
	    	}else{
	    		return false;
	    	}
 
    	}
	    
	}
	return false;
}

function searchManyOffers(offeringId, secuency, offerings, deleteOfferings){
	for ( var i = 0; i < offerings.length; i++){
	    
	    //TODO STR para pruebas Cambiar condicion
        if( deleteCaseSKY !=="1"){
        //if( deleteCaseSKY !=="0"){

		    if ( searchOneOffer(offeringId, secuency, offerings[i], deleteOfferings) ) break;
		    
        }else{
            
            searchOneOffer(offeringId, secuency, offerings[i], deleteOfferings);
        }
        
	}
}

function evalTypeMode(expireEffectiveDate){
    var mode = '';
    if (expireEffectiveDate !== 'undefined' && expireEffectiveDate !== null && expireEffectiveDate !== ""){
        mode = '<off:ExpireMode>'  +
        '   <off:Mode>S</off:Mode>' +
        '   <off:ExpirationDate>'+expireEffectiveDate+'235959</off:ExpirationDate>'+
        '</off:ExpireMode>';    
    }else{
        mode = '<off:ExpireMode>'  +
        '   <off:Mode>I</off:Mode>' +
        '</off:ExpireMode>';
    }
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