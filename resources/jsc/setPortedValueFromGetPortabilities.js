var totalCount = context.getVariable('responseGP.totalCount');
var ported = 'NO';
ported = parseInt(totalCount)>0?'SI':ported;

context.setVariable('getPortabilitiesPorted', ported);