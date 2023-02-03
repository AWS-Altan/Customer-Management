var operation = context.getVariable("operation");
var offeringsString = '';
var isPossiblePurchase = 'true';
var deleteOffersWithOrderId = 'false';

switch(operation) {
    case "PORT-IN":
        offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotionPorta');
        break;
    case "UNBARRING":
        offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotion');
        break;
    case "ALTA":
        offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotion');
        break;
    case "COMPRA":
        var ported = context.getVariable('responseControlPromotions.ported');
        var incrementalBonus = context.getVariable('responseCatalogPromotions.incrementalBonus');
        var incrementalOfferId = context.getVariable('responseCatalogPromotions.incrementalOfferId');
        var purchaseCounter = context.getVariable('responseControlPromotions.purchaseCounter');
        var operationSubType = context.getVariable('operationSubType');
        var getPortabilitiesPorted = context.getVariable('getPortabilitiesPorted')
        
        if(ported == 'SI' || getPortabilitiesPorted == 'SI'){
            offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotionPorta'); 
        }
        if((ported == 'NO' || getPortabilitiesPorted == 'NO') && incrementalBonus == 'NO'){
            offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotion');
        }
        if((ported == 'NO' || getPortabilitiesPorted == 'NO') && incrementalBonus == 'SI'){
            purchaseCounter = (typeof(purchaseCounter) !== 'undefined' && purchaseCounter !== null && purchaseCounter !== "" && purchaseCounter !== "None")?parseInt(purchaseCounter):0;
            incrementalOfferIdArr = incrementalOfferId.split('|');
            if(operationSubType == '1'){
                if(purchaseCounter<=(incrementalOfferIdArr.length + 1)){
                    purchaseCounterAfterPurchase = purchaseCounter + 1;
                    context.setVariable('purchaseCounterAfterPurchase', purchaseCounterAfterPurchase.toString());
                    offeringsString = incrementalOfferIdArr[purchaseCounter];    
                }else{
                    isPossiblePurchase = 'false';
                }
            }
            if(operationSubType == '2'){
                if(incrementalOfferIdArr.length>0){
                    offeringsString = incrementalOfferIdArr[0]; 
                }else{
                    isPossiblePurchase = 'false';
                }
            }
        }   
        break;
    case "CAMBIO":
        var getPortabilitiesPorted = context.getVariable('getPortabilitiesPorted');
        var hasSuppOffersToDelete = 'false';
        if(getPortabilitiesPorted == 'SI'){
            offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotionPorta');
            hasSuppOffersToDelete = 'true'; 
            deleteOffersWithOrderId = 'true';
        }else{
            offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotion');
        }
        context.setVariable('hasSuppOffersToDelete', hasSuppOffersToDelete);
        break;
    case "REANUDACION":
        offeringsString = context.getVariable('responseCatalogPromotions.offerIdPromotion');
        break;
    default:
        offeringsString = '';
}
if(isPossiblePurchase == 'true'){
    
    context.setVariable('offeringIdPromotionalToPurchase', offeringsString);
    var offerings = offeringsString.split("|");
    var timestamp_mx = context.getVariable("timestamp_mex");
    var formatDate = "YYYYMMDDHHmmss";
    var format = "YYYYMMDD";
    var today = moment().tz("America/Mexico_City").format(format);
    var payload = '';
    var mode='';
    
    mode = '<com:Mode>0</com:Mode>';
    
    for (i = 0; i < offerings.length; i++) { 
        payload = payload+'               <off:AddOffering>'  +
            '                   <com:OfferingId>'  +
            '                       <com:OfferingId>'+offerings[i].toString()+'</com:OfferingId>'  +
            '                   </com:OfferingId>'  +
            '                   <!--Optional:-->'  +
            '                   <!--0 to 100 repetitions:-->'  +
            '                   <off:EffectiveMode>'  
                                + mode +
            '                   </off:EffectiveMode>'  +
            '                   <off:ExpirationDate>'+context.getVariable("timestamp_mex")+'</off:ExpirationDate>'  +
            '                   <off:ActiveMode>'  +
            '                       <com:Mode>A</com:Mode>'  +
            '                       <!--You have a CHOICE of the next 2 items at this level-->'  +
            '                       <com:ActiveDate>'+context.getVariable("timestamp_mex")+'</com:ActiveDate>'  +
            '                   </off:ActiveMode>'  +
            '               </off:AddOffering>';
    }
    
    
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
    '               <!--0 to 100 repetitions:-->'  + payload;
    
    
    context.setVariable("payloadPurchase", payloadPurchase);   
    
}

context.setVariable('isPossiblePurchase', isPossiblePurchase);
context.setVariable('deleteOffersWithOrderId', deleteOffersWithOrderId);