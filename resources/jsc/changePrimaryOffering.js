var newOfferingId = context.getVariable("offeringId");
var currentOfferingId = context.getVariable("responsePrimaryOffering.offeringId");
var formatDate = "YYYYMMDDHHmmss";

var expireDate = context.getVariable("rspQFU.expireDate");
expireDate = ( expireDate !== 'undefined' && expireDate !== null && expireDate !== "" ) ? expireDate : '';

var today = context.getVariable("timestamp_mex").toString();
var effectiveDate = null;
var activeMode = null;
expireDate = expireDate !== '' ? moment(expireDate, formatDate).format(formatDate) : '';
today = moment(today, formatDate).format(formatDate);

print("Oferta actual: " + currentOfferingId);
print("Today " + today);
print("ExpireDate " + expireDate);

processOfferId();

function processOfferId(){
  if ( currentOfferingId !== 'undefined' && currentOfferingId !== null && currentOfferingId !== "" ) {
      /*if(currentOfferingId[1] == "0"){
          print("La oferta es renovable...");
          activeMode = "2";
          effectiveDate = moment(expireDate, formatDate).add(1, 'seconds').format(formatDate);
          print("Fecha efectiva: " + effectiveDate);
          context.setVariable("effectiveDate",effectiveDate.toString());
      }else{
          print("La oferta no es renovable...");
          if (expireDate !== '' && expireDate > today) {
              activeMode = "2";
              effectiveDate = moment(expireDate, formatDate).add(1, 'seconds').format(formatDate);
              print("Fecha efectiva: " + effectiveDate);
              context.setVariable("effectiveDate",effectiveDate.toString());
          }else{
              activeMode = "0";
              context.setVariable("effectiveDate",today.toString());
          }
      }*/
    activeMode = "0";
    context.setVariable("effectiveDate",today.toString());
    context.setVariable("activeMode", activeMode);    
    context.setVariable("offeringId", newOfferingId );
  }
}