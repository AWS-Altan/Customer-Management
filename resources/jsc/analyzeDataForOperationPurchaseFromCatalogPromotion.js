var recurrenceType = context.getVariable('responseCatalogPromotions.recurrenceType');
var purchaseCounter = (typeof(context.getVariable('responseControlPromotions.purchaseCounter')) === 'undefined' || context.getVariable('responseControlPromotions.purchaseCounter') === null || context.getVariable('responseControlPromotions.purchaseCounter') === "" || context.getVariable('responseControlPromotions.purchaseCounter') === "None")?'0':context.getVariable('responseControlPromotions.purchaseCounter');
var recurrence = (typeof(context.getVariable('responseCatalogPromotions.recurrence')) === 'undefined' || context.getVariable('responseCatalogPromotions.recurrence') === null || context.getVariable('responseCatalogPromotions.recurrence') === "")?'0':context.getVariable('responseCatalogPromotions.recurrence');
var limitDate = context.getVariable('responseControlPromotions.limitDate');
var timestamp_mx = context.getVariable("timestamp_mex");
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);

var operationSubType = context.getVariable('operationSubType');
var closeRegister = 'false';

if(operationSubType == '1'){
    
    var goToPurchase = 'false';
    var needUpdateControlPromotion = 'false';
    
    
    if(recurrenceType == 'CANTIDAD_COMPRAS'){
        if(parseInt(purchaseCounter)==9999){
            print("|purchaseCounter::9999");
            goToPurchase = 'true';
            context.setVariable('updateControlPromotionFromCantidadCompras', 'true');
            context.setVariable('insertControlPromotionFromGetPortabilities', 'false');
            purchaseCounterAfterPurchase = 0;
            context.setVariable('purchaseCounterAfterPurchase', purchaseCounterAfterPurchase.toString());
            
        }else if(parseInt(purchaseCounter)< parseInt(recurrence)){
            print("|purchaseCounter menor a  recurrence");
            goToPurchase = 'true';
            context.setVariable('updateControlPromotionFromCantidadCompras', 'true');
            context.setVariable('insertControlPromotionFromGetPortabilities', 'false');
            purchaseCounterAfterPurchase = parseInt(purchaseCounter) + 1;
            context.setVariable('purchaseCounterAfterPurchase', purchaseCounterAfterPurchase.toString());
            //PASO 14
        }else if(parseInt(purchaseCounter)>= parseInt(recurrence)){
            print("|purchaseCounter mayorigual a recurrence");
            needUpdateControlPromotion = 'true';
            closeRegister = 'true';
            //PASO 11 Y LUEGO 17
            queryByFirstAssignment="false";
            context.setVariable('queryByFirstAssignment', queryByFirstAssignment);
            context.setVariable('responseControlPromotions.ported', "NO");
            
        }
    }
    
    if(recurrenceType == 'CANTIDAD_DIAS'){
        limitDate = moment(limitDate).format(format);
        print('today: '+today+' limitDate: '+limitDate);

        if( limitDate == '20990909'){
            print("|limitDate::20990909");
            needUpdateControlPromotion = 'true';
            goToPurchase = 'true';
            
            context.setVariable('updateControlPromotionFromCantidadDias', 'true');
            context.setVariable('insertControlPromotionFromGetPortabilities', 'false');
            //limitDate = moment().tz("America/Mexico_City").add(parseInt(recurrence), "days").format(formatDate);
            
        }else if(parseInt(today) <= parseInt(limitDate)){
            print("|limitDate menor a  hoy");
            goToPurchase = 'true';
            // PASO 14
            context.setVariable('updateControlPromotionFromCantidadDias', 'true');
            context.setVariable('insertControlPromotionFromGetPortabilities', 'false');

        }else if(parseInt(today) > parseInt(limitDate)){
            print("|limitDate mayor a hoy");
            needUpdateControlPromotion = 'true';
            closeRegister = 'true';
            //PASO 11 Y LUEGO 17
            queryByFirstAssignment="false";
            context.setVariable('queryByFirstAssignment', queryByFirstAssignment);
            context.setVariable('promotionId', "");
            context.setVariable('responseControlPromotions.ported', "NO");

        }
    }
    
    context.setVariable('needUpdateControlPromotion', needUpdateControlPromotion);
    context.setVariable('goToPurchase', goToPurchase);
    context.setVariable('closeRegister', closeRegister);
    
    if(needUpdateControlPromotion == 'true'){
        context.setVariable('recallOfPurchaseOperationProcess', 'true');
    }
}