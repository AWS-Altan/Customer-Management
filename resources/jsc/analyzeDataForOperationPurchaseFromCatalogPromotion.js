var recurrenceType = context.getVariable('responseCatalogPromotions.recurrenceType');
var purchaseCounter = (typeof(context.getVariable('responseControlPromotions.purchaseCounter')) === 'undefined' || context.getVariable('responseControlPromotions.purchaseCounter') === null || context.getVariable('responseControlPromotions.purchaseCounter') === "" || context.getVariable('responseControlPromotions.purchaseCounter') === "None")?'0':context.getVariable('responseControlPromotions.purchaseCounter');
var recurrence = (typeof(context.getVariable('responseCatalogPromotions.recurrence')) === 'undefined' || context.getVariable('responseCatalogPromotions.recurrence') === null || context.getVariable('responseCatalogPromotions.recurrence') === "")?'0':context.getVariable('responseCatalogPromotions.recurrence');
var limitDate = context.getVariable('responseControlPromotions.limitDate');
var timestamp_mx = context.getVariable("timestamp_mex");
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);

limitDate = moment(limitDate).format(format);
print('today: '+today+' limitDate: '+limitDate);
var operationSubType = context.getVariable('operationSubType');
var closeRegister = 'false';

if(operationSubType == '1'){
    
    var goToPurchase = 'false';
    var needUpdateControlPromotion = 'false';
    
    
    if(recurrenceType == 'CANTIDAD_COMPRAS'){
        if(parseInt(purchaseCounter)< parseInt(recurrence)){
            goToPurchase = 'true';
            context.setVariable('updateControlPromotionFromCantidadCompras', 'true');
            context.setVariable('insertControlPromotionFromGetPortabilities', 'false');
            purchaseCounterAfterPurchase = parseInt(purchaseCounter) + 1;
            context.setVariable('purchaseCounterAfterPurchase', purchaseCounterAfterPurchase.toString());
            //PASO 14
        }
        if(parseInt(purchaseCounter)>= parseInt(recurrence)){
            needUpdateControlPromotion = 'true';
            closeRegister = 'true';
            //PASO 11 Y LUEGO 17
        }
    }
    
    if(recurrenceType == 'CANTIDAD_DIAS'){
        
        if(parseInt(today) <= parseInt(limitDate)){
            goToPurchase = 'true';
            // PASO 14
        }
        if(parseInt(today) > parseInt(limitDate)){
            needUpdateControlPromotion = 'true';
            closeRegister = 'true';
            //PASO 11 Y LUEGO 17
        }
    }
    
    context.setVariable('needUpdateControlPromotion', needUpdateControlPromotion);
    context.setVariable('goToPurchase', goToPurchase);
    context.setVariable('closeRegister', closeRegister);
    
    if(needUpdateControlPromotion == 'true'){
        context.setVariable('recallOfPurchaseOperationProcess', 'true');
    }
}