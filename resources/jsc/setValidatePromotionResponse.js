var returnCodeChangeSuppOffering = context.getVariable('responseChangeSupOffering.returnCode');
var orderIdChangeSuppOffering = context.getVariable('responseChangeSupOffering.orderId');
var returnMessageChangeSuppOffering = (typeof(context.getVariable('responseChangeSupOffering.returnMsg')) !== 'undefined' && context.getVariable('responseChangeSupOffering.returnMsg') !== null && context.getVariable('responseChangeSupOffering.returnMsg') !== "")?context.getVariable('responseChangeSupOffering.returnMsg'):'';

var promotion_applied = 'no';
var status_code = '400'

if(returnCodeChangeSuppOffering == '0000'){
    promotion_applied = 'yes';
    status_code = '200'
}

context.setVariable('promotion_applied', promotion_applied);
context.setVariable('status_code', status_code);
context.setVariable('error_description', returnMessageChangeSuppOffering);