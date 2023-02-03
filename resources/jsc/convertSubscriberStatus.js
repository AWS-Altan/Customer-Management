var subStatus = context.getVariable("responseQuerySubsInfo.SubStatus");
subStatus = String(subStatus);
subStatus = subStatus.trim();
var subStatusConvert = "";
print(typeof(subStatus));
print("subStatus:"+subStatus+" |||| ");
    switch(subStatus) {
        case "1":
            subStatusConvert ="Idle";
            break;
        case "2":
            subStatusConvert ="Active"
            break;
        case "3":
            subStatusConvert = "Baring (B1W)";
            break;
        case "4":
            subStatusConvert = "Suspend (B2W)";
            break;
        case "5":
            subStatusConvert = "Predeactivate";
            break;
        case "B07":
            subStatusConvert = "Predeactivate";
            break;
      default:
            subStatusConvert = "Deactivate";
    }
print("subStatusConvert:"+subStatusConvert);
context.setVariable("responseQuerySubsInfo.subStatusConvert", subStatusConvert); 