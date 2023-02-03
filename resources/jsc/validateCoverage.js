var coverageData = context.getVariable("coverageData");
var offeringId = (typeof(context.getVariable("offeringId")) !== 'undefined') ? context.getVariable("offeringId").toString() : '';

if ( coverageData && offeringId) {
    var subsOfferId = offeringId.substr(2,2);
    var subsBroad = Number(coverageData.substring(9,11));
    
    print('offer' + offeringId + '; coverage: ' + subsBroad);
    
    if (Number(subsOfferId) <=  subsBroad){
        context.setVariable("evalCoverage", "true");
    }else{
        context.setVariable("evalCoverage", "false");
    }  

}else{
    print('No hay datos válidos para evaluar');
    context.setVariable("evalCoverage", "false");
}
