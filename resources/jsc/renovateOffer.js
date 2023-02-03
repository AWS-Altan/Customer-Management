var formatDate = "YYYYMMDDHHmmss";
var offeringId = context.getVariable("responsePrimaryOffering.offeringId").toString();
var expireDate = context.getVariable("rspQFU.expireDate");
expireDate = ( expireDate !== 'undefined' && expireDate !== null && expireDate !== "" ) ? expireDate : '';
var today = context.getVariable("timestamp_mex").toString();
var effectiveDate = null;
var activeMode = null;
expireDate = expireDate !== '' ? moment(expireDate, formatDate).format(formatDate) : '';
today = moment(today, formatDate).format(formatDate);

print("Oferta actual: " + offeringId);
print("Today " + today);
print("ExpireDate " + expireDate);

processOfferId();


function processOfferId(){
  if ( offeringId !== 'undefined' && offeringId !== null && offeringId !== "" ) {
      if(offeringId[1] == "0"){
          print("La oferta es renovable...");
          context.setVariable("changeOffering.errorCode", "400");
          context.setVariable("changeOffering.errorMessage", "You can not renew this offer.");
      }else{
          print("La oferta no es renovable...");
          /*if (expireDate !== '' && expireDate > today) {
              activeMode = "2";
              effectiveDate = moment(expireDate, formatDate).add(1, 'seconds').format(formatDate);
              print("Fecha efectiva: " + effectiveDate);
              context.setVariable("effectiveDate",effectiveDate.toString());
          }else{
              activeMode = "0";
              context.setVariable("effectiveDate",today.toString());
          }*/
          activeMode = "0";
          context.setVariable("effectiveDate",today.toString());
          context.setVariable("activeMode", activeMode);    
          
          if(offeringId[9] == "1"){
              context.setVariable("offeringId", offeringId.substr(0,9).concat("2") );
          }else{
              context.setVariable("offeringId", offeringId.substr(0,9).concat("1"));
          }
      }
  }
}