var errorDescription = (typeof(context.getVariable("errorDescription")) !== undefined && context.getVariable("errorDescription") !== null && context.getVariable("errorDescription") !== '')? context.getVariable("errorDescription"):'';
var serviceabilityVersion = context.getVariable("serviceabilityVersion");
var isSatelliteHBBLine = context.getVariable("isSatelliteHBBLine");
var IsSatOfferIdAndSatAddress = 'false';

IsSatOfferIdAndSatAddress = (errorDescription == 'satelital' && isSatelliteHBBLine == 'true')?'true':IsSatOfferIdAndSatAddress;

context.setVariable('IsSatOfferIdAndSatAddress', IsSatOfferIdAndSatAddress);
