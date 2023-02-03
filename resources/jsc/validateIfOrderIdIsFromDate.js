var changePrimeryOfferOrderId = context.getVariable("changePrimaryOrderIdFromJs") ;
var cpoOrderIdIsFromApigeeLogs = "false";

changePrimeryOfferOrderId = (typeof(changePrimeryOfferOrderId) == "number")?changePrimeryOfferOrderId.toString():changePrimeryOfferOrderId;

if (typeof(changePrimeryOfferOrderId) !== undefined && changePrimeryOfferOrderId !== null && changePrimeryOfferOrderId !==  ""){
    cpoOrderIdIsFromApigeeLogs = changePrimeryOfferOrderId.startsWith('9')?'true':cpoOrderIdIsFromApigeeLogs;
}

context.setVariable("cpoOrderIdIsFromApigeeLogs", cpoOrderIdIsFromApigeeLogs);

if(cpoOrderIdIsFromApigeeLogs == 'true'){
    context.setVariable("orderId", changePrimeryOfferOrderId);
}

