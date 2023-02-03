var offerings = JSON.parse(context.getVariable("offerings"));
var scheduleDate = context.getVariable("scheduleDate");
var timestamp_mx = context.getVariable("timestamp_mex");
var startEffectiveDate = context.getVariable("startEffectiveDate");
var formatDate = "YYYYMMDDHHmmss";
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);
var payload = '';
var mode='';
var isProcessBatch = (context.getVariable("sourceProcessBatch") !== null && context.getVariable("sourceProcessBatch") !== "" && typeof(context.getVariable("sourceProcessBatch")) !== 'undefined')?context.getVariable("sourceProcessBatch"):'false';
context.setVariable('isProcessBatchJS', isProcessBatch);
var todayCompleteFormat = moment().tz("America/Mexico_City").format(formatDate);
var todayAtFinalOfTheDay = moment(today).add(23, 'hours').add(30, 'minutes').format("YYYYMMDDHHmmss");
var tomorrow = moment(today).add(1, 'days').format("YYYYMMDD");
var tomorrowCompleteFormat= moment(tomorrow).add(1, 'seconds').format('YYYYMMDDHHmmss')
var orderIdApigeeJs = context.getVariable("orderIdApigee");
var externalOrderIdCommand = '<off:ExternalOrderID>'+orderIdApigeeJs+'</off:ExternalOrderID>';


if(isProcessBatch!='true'){
    var expirationAndActivateDate = timestamp_mx;
    mode = '<com:Mode>0</com:Mode>';
    if (startEffectiveDate !== null && startEffectiveDate !== "" && typeof(startEffectiveDate) !== 'undefined'){
        if(startEffectiveDate > today){
            startEffectiveDate = moment(startEffectiveDate, formatDate).format(formatDate);
            mode = '<com:Mode>2</com:Mode>'+
            '<com:EffectiveDate>'+startEffectiveDate+'</com:EffectiveDate>';
        }else{ 
            today = moment().tz("America/Mexico_City").format(formatDate);
            mode = '<com:Mode>0</com:Mode>'+
            '<com:EffectiveDate>'+today+'</com:EffectiveDate>';
        }
    }    
    
}else{
    var expirationAndActivateDate = todayAtFinalOfTheDay;
    if (startEffectiveDate !== null && startEffectiveDate !== "" && typeof(startEffectiveDate) !== 'undefined'){
        if(startEffectiveDate > today){
            startEffectiveDate = moment(startEffectiveDate, formatDate).format(formatDate);
            mode = '<com:Mode>2</com:Mode>'+
            '<com:EffectiveDate>'+startEffectiveDate+'</com:EffectiveDate>';
        }else{ 
            today = moment().tz("America/Mexico_City").format(formatDate);
            mode = '<com:Mode>2</com:Mode>'+
            '<com:EffectiveDate>'+tomorrowCompleteFormat+'</com:EffectiveDate>';
        }
    }else{
        mode = '<com:Mode>2</com:Mode>'+
            '<com:EffectiveDate>'+tomorrowCompleteFormat+'</com:EffectiveDate>';
    }
}


for (i = 0; i < offerings.length; i++) { 
    payload = payload+'               <off:AddOffering>'  +
        '                   <com:OfferingId>'  +
        '                       <com:OfferingId>'+offerings[i].toString()+'</com:OfferingId>'  +
        '                   </com:OfferingId>'  +
        '                   <!--Optional:-->'  +
        '                   <!--0 to 100 repetitions:-->'  +
        '                   <off:EffectiveMode>'  
                            + mode +
        '                   </off:EffectiveMode>'  +
        '                   <off:ExpirationDate>'+expirationAndActivateDate+'</off:ExpirationDate>'  +
        '                   <off:ActiveMode>'  +
        '                       <com:Mode>A</com:Mode>'  +
        '                       <!--You have a CHOICE of the next 2 items at this level-->'  +
        '                       <com:ActiveDate>'+expirationAndActivateDate+'</com:ActiveDate>'  +
        '                   </off:ActiveMode>'  +
        '               </off:AddOffering>';
}


var payloadPurchase = '               <com:ReqHeader>'  +
'                   <!--Optional:-->'  +
'                   <com:Version>1</com:Version>'  +
'                   <!--Optional:-->'  +
'                   <com:BusinessCode>ChangeSupplementaryOffering</com:BusinessCode>'  +
'                   <com:TransactionId>'+context.getVariable("transactionId")+'</com:TransactionId>'  +
'                   <com:Channel>51</com:Channel>'  +
'                   <!--Optional:-->'  +
'                   <com:PartnerId>'+context.getVariable("PartnerId")+'</com:PartnerId>'  +
'                   <!--Optional:-->'  +
'                   <com:BrandId>101</com:BrandId>'  +
'                   <com:ReqTime>'+context.getVariable("timestamp_mex")+'</com:ReqTime>'  +
'                   <!--Optional:-->'  +
'                   <com:TimeFormat>'  +
'                       <com:TimeType>1</com:TimeType>'  +
'                       <!--Optional:-->'  +
'                       <com:TimeZoneID>1083</com:TimeZoneID>'  +
'                   </com:TimeFormat>'  +
'                   <!--Optional:-->'  +
'                   <com:MsgLanguage>2049</com:MsgLanguage>'  +
'                   <com:AccessUser>'+context.getVariable("Operation-User")+'</com:AccessUser>'  +
'                   <com:AccessPassword>'+context.getVariable("Operation-Password")+'</com:AccessPassword>'  +
'                   <!--Optional:-->'  +
'                   <com:OperatorId>'+context.getVariable("OperatorId")+'</com:OperatorId>'  +
'                   <!--0 to 100 repetitions:-->'  +
'                   <com:AdditionalProperty>'  +
'                       <com:Code>1</com:Code>'  +
'                       <com:Value>1</com:Value>'  +
'                   </com:AdditionalProperty>'  +
'               </com:ReqHeader>'  +
'               <off:AccessInfo>'  +
'                   <com:ObjectIdType>4</com:ObjectIdType>'  +
'                   <com:ObjectId>'+context.getVariable("msisdn")+'</com:ObjectId>'  +
'               </off:AccessInfo>'  +
'               <off:FlagStatus>'+context.getVariable("flagStatusSuppPurchase")+'</off:FlagStatus>'+
'               <!--0 to 100 repetitions:-->'  + payload + externalOrderIdCommand;


context.setVariable("payloadPurchase", payloadPurchase);