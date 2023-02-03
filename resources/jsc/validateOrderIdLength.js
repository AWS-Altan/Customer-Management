var orderId = context.getVariable("orderId") ;
var orderIdIsFromTransactionId = "false";

orderId = (typeof(orderId) == "number")?orderId.toString():orderId;

if (typeof(orderId) !== undefined && orderId !== null && orderId !==  ""){
    orderIdIsFromTransactionId = orderId.length>12 ?'true':orderIdIsFromTransactionId;
}

context.setVariable("orderIdIsFromTransactionId", orderIdIsFromTransactionId);