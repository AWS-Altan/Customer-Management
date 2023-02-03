var response = context.getVariable("responseScheduledOrders.content");
response = (typeof(response) !== undefined && response !== null && response  !== "") ? JSON.parse(response) : '';
var id = '';
var operation = '';
var areThereOperations = false;

if(response !== ''){
    if(Array.isArray(response.data)){
        if(response.data.length > 0){
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].status === "Processing" || response.data[i].status === "Scheduled" || response.data[i].status === "In Progress"){
                    areThereOperations = true;
                    if(id === '' && operation === ''){
                        id += response.data[i].id.toString();
                        operation += response.data[i].operation;
                    }else{
                        id += ', ' + response.data[i].id.toString();
                        operation += ', ' + response.data[i].operation;
                    }
                }
            }
        }
    }
    
    if(areThereOperations){
        var description = "You have the following pending operations, id: " + id + ",  name: " + operation;
        context.setVariable("errorMessage.code", "400");
        context.setVariable("errorMessage.status", "400");
        context.setVariable("errorMessage.message", description);
        context.setVariable("areThereOperations", "true");
    }
}

    