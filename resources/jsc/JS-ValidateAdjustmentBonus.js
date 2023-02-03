/* Here we're getting data necessary to validate offering by company*/
var appName = context.getVariable("apigee.developer.app.name").toString();
print("AppName: " + appName);
var offeringsId = (typeof(context.getVariable("offerings")) !== 'undefined') ? JSON.parse(context.getVariable("offerings")) : [];
print("Offerings: " + offeringsId);
var adjustmentAppName = (typeof(context.getVariable("adjustmentAppName")) !== 'undefined') ? context.getVariable("adjustmentAppName").toString() : '';
print("AdjustmentCompany: " + adjustmentAppName);
var adjustmentOfferingPattern = (typeof(context.getVariable("adjustmentOfferingPattern")) !== 'undefined') ? context.getVariable("adjustmentOfferingPattern").toString() : '';
print("AdjustmentOfferingPattern: " + adjustmentOfferingPattern);

var sourceDeveloperApp = context.getVariable("sourceDeveloperApp");
sourceDeveloperApp = ( sourceDeveloperApp !== 'undefined' && sourceDeveloperApp !== null && sourceDeveloperApp !== "" ) ? sourceDeveloperApp : '';
var isInternalCall = context.getVariable("isInternalCall");
isInternalCall = ( isInternalCall !== 'undefined' && isInternalCall !== null && isInternalCall !== "" ) ? isInternalCall : '0';

var clienteHabilitadoCompraBonos190 = context.getVariable("clienteHabilitadoCompraBonos190");
clienteHabilitadoCompraBonos190 = ( clienteHabilitadoCompraBonos190 !== 'undefined' && clienteHabilitadoCompraBonos190 !== null && clienteHabilitadoCompraBonos190 !== "" ) ? clienteHabilitadoCompraBonos190 : '';

var isAllowedApp = evalOfferAndAppName();

context.setVariable("adjustmentOfferingId.isAllowedApp", isAllowedApp);

/* The purpose of this function is validate if the current offering id is allowed in order to be applied by the client app */
function evalOfferAndAppName(){
    print("ofertas compradas: " + offeringsId.length );
    for ( var i = 0; i < offeringsId.length && offeringsId ; i++  ){
        print("oferta siendo validada: " + offeringsId[i] + ";substring a comprar: " + offeringsId[i].substr(0,3) + "; ")
        if ( adjustmentOfferingPattern && offeringsId[i].startsWith(adjustmentOfferingPattern)){
            if ( isInternalCall == "0"){
                return clienteHabilitadoCompraBonos190 == "true";
            }
        }
    }
    return true;
}