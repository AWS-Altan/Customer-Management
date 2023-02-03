var offeringId = context.getVariable("offeringId");
var offeringDetail = context.getVariable("offeringDetail");
offeringDetail = ( typeof(offeringDetail) !== undefined && offeringDetail !== null && offeringDetail !== "" ) ? JSON.parse(offeringDetail) : "";
var scheduleDate = context.getVariable("scheduleDate");
var timestamp_mx = context.getVariable("timestamp_mex");
var formatDate = "YYYYMMDDHHmmss";
var payload = '';
var mode='';

var newDate =  moment(timestamp_mx, 'YYYYMMDDHHmmss').add(5,'seconds').format('YYYYMMDDHHmmss');

if(offeringDetail !== ""){
    if(Array.isArray(offeringDetail)){
        for(var i = 0; i< offeringDetail.length; i++){
            payload='               <off:DeleteOffering>'  +
            '                       <off:OfferingId>'  +
            '                           <com:OfferingId>'+offeringDetail[i].OfferingId.OfferingId.toString()+'</com:OfferingId>'  +
            '                           <com:PurchaseSeq>'+offeringDetail[i].OfferingId.PurchaseSeq.toString()+'</com:PurchaseSeq>'  +
            '                        </off:OfferingId>'  +
            '                        <off:ExpireMode>'  +
            '                           <off:Mode>I</off:Mode>' +
            '                        </off:ExpireMode>'  +
            '               </off:DeleteOffering>';
        }
    }else{
        payload='               <off:DeleteOffering>'  +
        '                       <off:OfferingId>'  +
        '                           <com:OfferingId>'+offeringDetail.OfferingId.OfferingId.toString()+'</com:OfferingId>'  +
        '                           <com:PurchaseSeq>'+offeringDetail.OfferingId.PurchaseSeq.toString()+'</com:PurchaseSeq>'  +
        '                        </off:OfferingId>'  +
        '                        <off:ExpireMode>'  +
        '                           <off:Mode>I</off:Mode>' +
        '                        </off:ExpireMode>'  +
        '               </off:DeleteOffering>';
    }
}else{
    payload='               <off:DeleteOffering>'  +
        '                       <off:OfferingId>'  +
        '                           <com:OfferingId>'+offeringId.toString()+'</com:OfferingId>'  +
        '                        </off:OfferingId>'  +
        '                        <off:ExpireMode>'  +
        '                           <off:Mode>I</off:Mode>' +
        '                        </off:ExpireMode>'  +
        '               </off:DeleteOffering>';
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
'                       <com:TimeType>2</com:TimeType>'  +
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
'               <!--0 to 100 repetitions:-->'  + payload;


context.setVariable("payloadPurchase", payloadPurchase);