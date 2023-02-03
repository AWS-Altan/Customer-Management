//var offeringIdPromo = context.getVariable('responseCatalogPromotions.offerIdPromotionPorta');
var operacion = context.getVariable('operation');
var offerIdCompraAsociada = context.getVariable('responseCatalogPromotions.offerIdCompraAsociada');
var offeringIdPromo = context.getVariable('offeringIdPromotionalToPurchase');
var offeringIdPromoArr = offeringIdPromo.split("|");
var offerings = JSON.parse(context.getVariable("SuppOfferings.suppOff"));
var hasSuppOffersToDelete = "false";
var moreRecentEffectiveDateInt = 0;
var moreRecentExpireDate = '';
var offeringId = context.getVariable('offeringId');
var timestamp_mx = context.getVariable("timestamp_mex");
var formatDate = "YYYYMMDDHHmmss";
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);
var todayComplete = moment().tz("America/Mexico_City").format(formatDate);
var todayLessThreeHours = moment.tz("America/Mexico_City").subtract(3, 'hours').format('YYYYMMDDHHmmss');
var moreRecentExpireDateInt = 0;
var lastEffectiveDateInt=0;
var lastPurchaseSeq="";

offerIdCompraAsociada = ( typeof(offerIdCompraAsociada) !== undefined && offerIdCompraAsociada !== null && offerIdCompraAsociada !== "" ) ? offerIdCompraAsociada.toString() : '';
offeringId = ( typeof(offeringId) !== undefined && offeringId !== null && offeringId !== "" ) ? offeringId.toString() : '';


context.setVariable('offeringIdPromo', offeringIdPromo);

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
    

    
    if( operacion=="PORT-IN" ){
        print("Operacion::"+ operacion + "\n");
        if(typeof(offerIdCompraAsociada) !== 'undefined' && offerIdCompraAsociada !== null && offerIdCompraAsociada !== "" ){
    		//Elimina otras ofertas diferentes a la offerIdCompraAsociada
    		for(z = 0; z < supplementaryOfferings.length; z++){
            	if( offerIdCompraAsociada!=supplementaryOfferings[z].offeringId){
            	    print("\n PORT-IN quita oferta del proceso de borrado::" + supplementaryOfferings[z].offeringId + "\n" );
                	supplementaryOfferings.splice(z, 1);
                }
            }
            
            //Busca la offerIdCompraAsociada más reciente
            if(supplementaryOfferings.length>0){
                for(z = 0; z < supplementaryOfferings.length; z++){
                        var offeringNameSupplementary = supplementaryOfferings[z].offeringName.toString();
                        print("offeringNameSupplementary::" + offeringNameSupplementary + "\n" );
                	    if( offeringNameSupplementary.includes("DS")){
                            print("\n PORT-IN Compra Asociada\n");
                            print("parseInt effectiveDate::"+ parseInt(supplementaryOfferings[z].effectiveDate) );
                	        if( parseInt(lastEffectiveDateInt) < parseInt(supplementaryOfferings[z].effectiveDate)  ){
                            	lastEffectiveDateInt = parseInt(supplementaryOfferings[z].effectiveDate);
                            	lastExpireDateInt = parseInt(supplementaryOfferings[z].expireDate);
                            	lastPurchaseSeq=supplementaryOfferings[z].purchaseSeq.toString();
                            }
                        }
                }
            }
            
            print("\n PORT-IN lastPurchaseSeq::" + lastPurchaseSeq + "\n");
            //Elimina offerIdCompraAsociada  más reciente
            if(supplementaryOfferings.length>0 && lastPurchaseSeq!=="" ){
                for(z = 0; z < supplementaryOfferings.length; z++){
                    if ( supplementaryOfferings[z].purchaseSeq.toString()!=lastPurchaseSeq.toString() ){
                	    print("\n PORT-IN quita del proceso de borrado  oferta offerIdCompraAsociada anterior::" + supplementaryOfferings[z].offeringId + " lastPurchaseSeq::"+ lastPurchaseSeq +"\n");
                    	supplementaryOfferings.splice(z, 1);
                    }    
                }
            }
            
        }
    
        
    }else if( operacion=="COMPRA"){
        
        //Adicion de nuevas condiciones para tomar la fecha de expiracion mas reciente
        //Se deben excluir tambien bonos que tengan el offeringId del parametro de entrada que tengan un rango de 
        // fecha efectiva de hora actual - 3 hrs al presente
        print('| todayLessThreeHours: '+todayLessThreeHours+' |');
    	for(z = 0; z < supplementaryOfferings.length; z++){
    	    var offeringNameSupp = supplementaryOfferings[z].offeringName;
    	    if(offeringNameSupp.includes("DS")){
    	        if((supplementaryOfferings[z].offeringId != offeringId) || (supplementaryOfferings[z].offeringId == offeringId  && parseInt(supplementaryOfferings[z].effectiveDate) <= parseInt(todayLessThreeHours))){
        	        if(parseInt(supplementaryOfferings[z].effectiveDate) >  moreRecentEffectiveDateInt){
                    	moreRecentEffectiveDateInt = parseInt(supplementaryOfferings[z].effectiveDate);
                    	moreRecentExpireDateInt = parseInt(supplementaryOfferings[z].expireDate);
                    }   
        	    }    
    	    }
        }

        
        print("Operacion::"+ operacion + "\n");
        var deletedSupplementaryOfferings = [];
        if(typeof(offeringId) !== 'undefined' && offeringId !== null && offeringId !== "" ){
    		for(z = 0; z < supplementaryOfferings.length; z++){
            	if( offeringId.toString()===supplementaryOfferings[z].offeringId){
            	    print("\n COMPRA quita otra oferta del proceso de borrado::" + supplementaryOfferings[z].offeringId  + "\n");
                	//supplementaryOfferings.splice(z, 1);
                	var supplementary = {};
                  	supplementary.offeringId = supplementaryOfferings[z].offeringId.toString();
                  	supplementary.offeringName = supplementaryOfferings[z].offeringName;
                  	supplementary.purchaseSeq = supplementaryOfferings[z].purchaseSeq;
                  	supplementary.effectiveDate = supplementaryOfferings[z].effectiveDate;
                  	supplementary.expireDate = supplementaryOfferings[z].expireDate;
                  	deletedSupplementaryOfferings.push( supplementary );
                    
                }
            } 
            supplementaryOfferings=deletedSupplementaryOfferings;
            
        }    

    }else{  
    	if(typeof(offeringIdPromoArr) !== 'undefined' && offeringIdPromoArr !== null && offeringIdPromoArr !== "" ){
        	if(offeringIdPromoArr.length>0){
      			for(y = 0; y < offeringIdPromoArr.length; y++){
            		for(z = 0; z < supplementaryOfferings.length; z++){
                    	if(offeringIdPromoArr[y]==supplementaryOfferings[z].offeringId){
                        	supplementaryOfferings.splice(z, 1);
                        }
                    
                    }	
        		}
      		}
    	}
    }
    
    
	if(supplementaryOfferings.length>0){
	    hasSuppOffersToDelete = "true";
	}
	
	
	
}
context.setVariable("supplementaryOfferings", JSON.stringify(supplementaryOfferings));
context.setVariable("hasSuppOffersToDelete", hasSuppOffersToDelete);
//se usa para determinar un bono por vigencia solo para compra de DNs que no vienen de una portabilidad
context.setVariable("moreRecentExpireDateInt", moreRecentExpireDateInt);
