 var orderIdApigee = context.getVariable('orderIdApigee');
 var operation = context.getVariable("Auditor.operation");
if(       operation==='Valida Promocion' && orderIdApigee.length >0 
     && ( orderIdApigee.substring( (orderIdApigee.length - 2), orderIdApigee.length )==='01' ||  orderIdApigee.substring( (orderIdApigee.length - 2), orderIdApigee.length )==='02') 
  ){ 
         
          orderIdApigee=orderIdApigee.substring(0, orderIdApigee.length - 2) + '00'
          print('transactionIdToNumbersFinal adjusment to validatePromotion::'+ orderIdApigee );
}

 
 context.setVariable('orderIdApigee', orderIdApigee);
 