var profileVersion = context.getVariable("profileVersion");
profileVersion = ((typeof(profileVersion) !== 'undefined') && (profileVersion !== null) && (profileVersion !== "")) ? profileVersion.toString() : "";
print("profileVersion: "+ profileVersion);
if(profileVersion === "2"){
    var msisdnReasonCode = context.getVariable("reasonCode");
    msisdnReasonCode = (typeof( msisdnReasonCode) !== 'undefined' &&  msisdnReasonCode !== null) ? context.getVariable("reasonCode").toString() : "";
    var subStatus = context.getVariable("responseQuerySubsInfo.subStatusConvert");
      
      
    context.setVariable("debug.validateStatus", ( (subStatus === "Status B07" || subStatus === "Suspend (B2W)" || subStatus === "Predeactivate") && (msisdnReasonCode === "1")) );  
    if(subStatus === "Suspend (B2W)"){
        if(msisdnReasonCode === "1"){
            context.setVariable("responseQuerySubsInfo.subStatusConvert", subStatus.concat(" (Notified by client)"));
        }
        if(msisdnReasonCode === "2"){
            context.setVariable("responseQuerySubsInfo.subStatusConvert", subStatus.concat(" (By mobility)"));
        }
        if(msisdnReasonCode === "3"){
            context.setVariable("responseQuerySubsInfo.subStatusConvert", subStatus.concat(" (By IMEI locked)"));
        }
        
    }
    
    if( subStatus === "Predeactivate"){
        if(msisdnReasonCode === "1"){
            context.setVariable("responseQuerySubsInfo.subStatusConvert", subStatus.concat(" (Notified by client)"));
        }
        
    }
}