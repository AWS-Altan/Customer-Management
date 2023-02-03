var msisdnStatus = context.getVariable("responseQuerySubStatus.subStatus");


if(msisdnStatus == "3"){
    context.setVariable("msisdnStatus", "2");
    context.setVariable("nStatus", "Unbarring");
}

if(msisdnStatus == "4"){
    context.setVariable("msisdnStatus", "4");
    context.setVariable("nStatus", "Resumed");
}

