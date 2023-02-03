 var cadena = response.content.asJSON;
cadena = ( cadena !== 'undefined' && cadena !== null && cadena !== "" ) ? cadena : [];

var arregloFinal = [];

for(var i = 0; i < cadena.length; i++){
	var resultado = {};
    var request = {};
    var response = {};
    
	subCadenas = cadena[i].resp.split("|");
    
    resultado.be = subCadenas[0];
    
    resultado.request = request;
    request.resource = subCadenas[1];
    request.payload = subCadenas[5];
    request.timestamp = subCadenas[3];
    
    resultado.response = response;
    response.payload = subCadenas[5];
    response.timestamp = subCadenas[4];
    
    arregloFinal.push(resultado);
    
}

context.setVariable("arregloFinal", JSON.stringify(arregloFinal));