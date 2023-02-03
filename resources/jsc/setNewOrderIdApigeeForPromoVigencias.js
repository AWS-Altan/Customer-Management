var orderIdApigeeJs = context.getVariable("orderIdApigee");
var newOrderIdApigeeJsForPromoVigencias = orderIdApigeeJs.substring(0, orderIdApigeeJs.length - 2);
newOrderIdApigeeJsForPromoVigencias = newOrderIdApigeeJsForPromoVigencias + '02';

print('newOrderIdApigeeJsForPromoVigencias: '+newOrderIdApigeeJsForPromoVigencias);
context.setVariable('externalOrderIdGeneric', newOrderIdApigeeJsForPromoVigencias);
context.setVariable('newOrderIdApigeeJsForPromoVigencias', newOrderIdApigeeJsForPromoVigencias);