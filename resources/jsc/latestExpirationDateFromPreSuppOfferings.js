var operacion = context.getVariable('operation');
var offerings = JSON.parse(context.getVariable("PreviousSuppOfferings.suppOff"));
var moreRecentEffectiveDateInt = 0;
var moreRecentExpireDate = '';
var offeringId = context.getVariable('offeringId');
var timestamp_mx = context.getVariable("timestamp_mex");
var formatDate = "YYYYMMDDHHmmss";
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);
var todayComplete = moment().tz("America/Mexico_City").format(formatDate);
//var todayLessThreeHours = moment.tz("America/Mexico_City").subtract(3, 'hours').format('YYYYMMDDHHmmss');
var todayLessMinutes = moment.tz("America/Mexico_City").subtract(1, 'minutes').format('YYYYMMDDHHmmss');
var moreRecentExpireDateInt = 0;
var lastEffectiveDateInt=0;




if(typeof(offerings) !== 'undefined' && offerings !== null && offerings !== "" ){
	if(offerings.length>0){
    	var supplementaries = {};
        var supplementaryOfferings = [];
        var i;
        for(i = 0; i < offerings.length; i++){
            	var supplementaries = {};
              	supplementaries.offeringId = ( offerings[i].OfferingId.OfferingId !== 'undefined' && offerings[i].OfferingId.OfferingId !== null && offerings[i].OfferingId.OfferingId !== "" ) ? offerings[i].OfferingId.OfferingId.toString() : '';
              	supplementaries.purchaseSeq = ( offerings[i].OfferingId.PurchaseSeq !== 'undefined' && offerings[i].OfferingId.PurchaseSeq !== null && offerings[i].OfferingId.PurchaseSeq !== "" ) ? offerings[i].OfferingId.PurchaseSeq.toString() : '';
              	supplementaries.offeringName = offerings[i].OfferingName;
              	supplementaries.effectiveDate = offerings[i].EffectiveDate;
              	supplementaries.expireDate = offerings[i].ExpireDate;
	            supplementaryOfferings.push(supplementaries);
        }
        //context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));    
    }else{
          	var supplementaries = {};
          	supplementaries.offeringId = offerings.OfferingId.OfferingId.toString();
          	supplementaries.offeringName = offerings.OfferingName;
          	supplementaries.purchaseSeq = offerings.OfferingId.PurchaseSeq.toString();
          	supplementaries.effectiveDate = offerings.EffectiveDate;
          	supplementaries.expireDate = offerings.ExpireDate;
          	var supplementaryOfferings = [];
          	supplementaryOfferings.push(supplementaries);
          	//context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));
    }	   
}else{
	 var supplementaryOfferings = []
}

if(supplementaryOfferings.length>0){
    
    if( operacion=="COMPRA"){
        
        //Adicion de nuevas condiciones para tomar la fecha de expiracion mas reciente
        //Se deben excluir tambien bonos que tengan el offeringId del parametro de entrada que tengan un rango de 
        // fecha efectiva de hora actual - 3 hrs al presente
        print('| todayLessMinutes: '+todayLessMinutes+' |');
    	for(z = 0; z < supplementaryOfferings.length; z++){
    	    var offeringNameSupp = supplementaryOfferings[z].offeringName;
    	    if(offeringNameSupp.includes(" DS")){

    	        if((supplementaryOfferings[z].offeringId != offeringId) || (supplementaryOfferings[z].offeringId == offeringId  && parseInt(supplementaryOfferings[z].effectiveDate) <= parseInt(todayLessMinutes))){
        	        if(parseInt(supplementaryOfferings[z].effectiveDate) >  moreRecentEffectiveDateInt){
                	moreRecentEffectiveDateInt = parseInt(supplementaryOfferings[z].effectiveDate);
                	moreRecentExpireDateInt = parseInt(supplementaryOfferings[z].expireDate);
                    }   
        	    }    
    	    }
        }

        

    }
    
}

print("| moreRecentExpireDateInt" +  moreRecentExpireDateInt.toString());

//se usa para determinar un bono por vigencia solo para compra de DNs que no vienen de una portabilidad
context.setVariable("moreRecentExpireDateInt", moreRecentExpireDateInt);
