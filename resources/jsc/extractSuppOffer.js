var freeUnits = JSON.parse(context.getVariable("responseQueryFreeUnit.freeUnits"));
var unusedAmt = "";
var initialAmt = "";
var offeringName = "";
var offeringId = "";
var suppOffersData = (context.getVariable("SuppOfferings.suppOff")!== 'undefined' && context.getVariable("SuppOfferings.suppOff") !== null && context.getVariable("SuppOfferings.suppOff") !== "")?context.getVariable("SuppOfferings.suppOff"):"";
var primaryOffering = context.getVariable("responsePrimaryOffering.offeringId").toString();
var queryBalanceInfo = (context.getVariable("queryBalance.acctBalance")!== 'undefined' && context.getVariable("queryBalance.acctBalance") !== null && context.getVariable("queryBalance.acctBalance") !== "")?JSON.parse(context.getVariable("queryBalance.acctBalance")):"";
var latitude = context.getVariable("latitude");
var longitude = context.getVariable("longitude");
var profileVersion = context.getVariable("profileVersion");
var queryBalanceOffer = 'Bonus_NR-IR-LDI_USA';
var expireDateBalanceInfo = "";
var freeDataBalance = {};
var beid = context.getVariable("PartnerId").toString();

profileVersion = ((typeof(profileVersion) !== 'undefined') && (profileVersion !== null) && (profileVersion !== "")) ? profileVersion.toString() : "";



if(typeof(latitude) !== 'undefined' && latitude !== null && typeof(longitude) !== 'undefined' && longitude !== null){
    context.setVariable("coordinates", latitude+","+longitude);
}else{
    context.setVariable("coordinates", "");
}

if(profileVersion === "2"){
    var msisdnReasonCode = context.getVariable("reasonCode");
    msisdnReasonCode = (typeof( msisdnReasonCode) !== 'undefined' &&  msisdnReasonCode !== null) ? context.getVariable("reasonCode").toString() : "";
    var subStatus = context.getVariable("responseQuerySubStatus.subStatus");
      
      
    context.setVariable("debug.validateStatus", ( (subStatus === "Status B07" || subStatus === "Suspend (B2W)" || subStatus === "Predeactivate") && (msisdnReasonCode === "1")) );  
    if(subStatus === "Suspend (B2W)"){
        if(msisdnReasonCode === "1"){
            context.setVariable("responseQuerySubStatus.subStatus", subStatus.concat(" (Notified by client)"));
        }
        if(msisdnReasonCode === "2"){
            context.setVariable("responseQuerySubStatus.subStatus", subStatus.concat(" (By mobility)"));
        }
        if(msisdnReasonCode === "3"){
            context.setVariable("responseQuerySubStatus.subStatus", subStatus.concat(" (By IMEI locked)"));
        }
        
    }
    
    if( subStatus === "Predeactivate"){
        if(msisdnReasonCode === "1"){
            context.setVariable("responseQuerySubStatus.subStatus", subStatus.concat(" (Notified by client)"));
        }
        
    }
    
    
    var speed = Number(primaryOffering.substr(3,2));
    if(speed === 99){
        context.setVariable("speedPrimary", "Best Effort");
    }else if(speed === 0){
        context.setVariable("speedPrimary", "Without Speed (Default Offer)");
    }else{
        context.setVariable("speedPrimary", speed + " Mbps");
    }
}


if(typeof(freeUnits)!== 'undefined' && freeUnits !== null && freeUnits !== ""){
    
    if(Array.isArray(freeUnits)){
        var freeUnitsArray = [];
        var i;
        var u;
        
        for(i = 0; i < freeUnits.length; i++){
            var freeUnitsTypeId = freeUnits[i].TypeId;
            if(!freeUnitsTypeId.includes('RG998') && !freeUnitsTypeId.includes('_MT')){
                //freeUnitsTypeId !== 'C_Free_DATA_RG998'

                var freeUnitsObject = {};
                freeUnitsObject.name = ( typeof(freeUnits[i].TypeName) !== 'undefined' && freeUnits[i].TypeName !== null && freeUnits[i].TypeName !== "" ) ? freeUnits[i].TypeName.toString() : '';


                var amountFreeUnits = {};
                var isMobility = false;

                /*If TypeName includes TimeLine then the data will not appear */
                if(freeUnitsObject.name.includes("TimeLine")){
                    continue;
                }

                if ( freeUnitsObject.name.includes ("SMS") && !isMobilityFunc(primaryOffering)) {
                    print('Identificado como SMS y diferente de mobilidad');
                    continue;
                }


                if(freeUnitsObject.name.includes ("Minutes") || freeUnitsObject.name.includes ("SMS")){
                    isMobility = true;
                    var freeUnitsTotalAmt = ( typeof(freeUnits[i].TotalAmt) !== 'undefined' && freeUnits[i].TotalAmt !== null && freeUnits[i].TotalAmt !== "" ) ? freeUnits[i].TotalAmt : '';
                    var freeUnitsUnusedAmt = ( typeof(freeUnits[i].UnusedAmt) !== 'undefined' && freeUnits[i].UnusedAmt !== null && freeUnits[i].UnusedAmt !== "" ) ? freeUnits[i].UnusedAmt : '';
                }
                else{
                    var freeUnitsTotalAmt = ( typeof(freeUnits[i].TotalAmt) !== 'undefined' && freeUnits[i].TotalAmt !== null && freeUnits[i].TotalAmt !== "" ) ? (freeUnits[i].TotalAmt  / 1048576) : '';
                    var freeUnitsUnusedAmt = ( typeof(freeUnits[i].UnusedAmt) !== 'undefined' && freeUnits[i].UnusedAmt !== null && freeUnits[i].UnusedAmt !== "" ) ? (freeUnits[i].UnusedAmt  / 1048576) : '';
                }
                amountFreeUnits.totalAmt = freeUnitsTotalAmt.toString();
                amountFreeUnits.unusedAmt = freeUnitsUnusedAmt.toString();
                freeUnitsObject.freeUnit = amountFreeUnits;
                var detailOfferings = freeUnits[i].Detail;
                
                if(profileVersion === "2"){
                    if(freeUnits[i].TypeName.includes("Throttling_")){
                        freeUnitsObject.throttlingSpeed = extractSpeed(freeUnits[i].TypeName);
                    }
                }
                
                
                if(Array.isArray(detailOfferings)){
                    var supplementaries = {};
                    var supplementaryOfferings = [];
                    var j;
                   
                    print("NombreBolsa 1.0:"+freeUnitsObject.name);
                    
                    for(j = 0; j < detailOfferings.length; j++){
                        var supplementaries = {};
                        supplementaries.offeringId = ( typeof(detailOfferings[j].Origin.OfferingId) !== 'undefined' && detailOfferings[j].Origin.OfferingId !== null && detailOfferings[j].Origin.OfferingId !== "" ) ? detailOfferings[j].Origin.OfferingId.OfferingId.toString() : '';
                        supplementaries.purchaseSecuence = ( typeof(detailOfferings[j].Origin.OfferingId) !== 'undefined' && detailOfferings[j].Origin.OfferingId !== null && detailOfferings[j].Origin.OfferingId !== "" ) ? detailOfferings[j].Origin.OfferingId.PurchaseSeq.toString() : '';
                        var initialAmt = (isMobility) ? detailOfferings[j].InitialAmt : detailOfferings[j].InitialAmt / 1048576;
                        var unusedAmt = (isMobility) ? detailOfferings[j].UnusedAmt : detailOfferings[j].UnusedAmt / 1048576;
                        supplementaries.initialAmt = initialAmt.toString();
                        supplementaries.unusedAmt = unusedAmt.toString();
                        supplementaries.effectiveDate = detailOfferings[j].EffectiveDate.toString();
                        /* If TypeName includes Promo, then replace expire date is not required */
                        var newExpDate = (freeUnitsObject.name.includes("Promo")) ? "" : replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                        supplementaries.expireDate = (newExpDate !== "") ? newExpDate : detailOfferings[j].ExpireDate.toString();
                        supplementaryOfferings.push(supplementaries);
                        if(freeUnitsObject.name.includes("Free Units") || freeUnitsObject.name == "FreeData_AltanCoverage"){
                            freeDataBalance = supplementaryOfferings;
                        }                       
                    }
                    
                    print("freeDataBalance 1.0: "+JSON.stringify(freeDataBalance));
                    freeUnitsObject.detailOfferings = supplementaryOfferings;
                    
                }else if(typeof(detailOfferings) !== 'undefined' && detailOfferings !== null && detailOfferings !== ""){
                        print("NombreBolsa 1.1:"+freeUnitsObject.name);
                        var supplementaries = {};
                        supplementaries.offeringId = detailOfferings.Origin.OfferingId.OfferingId.toString();
                        supplementaries.purchaseSecuence = detailOfferings.Origin.OfferingId.PurchaseSeq.toString();
                        var initialAmt = (isMobility) ? detailOfferings.InitialAmt : detailOfferings.InitialAmt / 1048576;
                        var unusedAmt = (isMobility) ? detailOfferings.UnusedAmt : detailOfferings.UnusedAmt / 1048576;
                        supplementaries.initialAmt = initialAmt.toString();
                        supplementaries.unusedAmt = unusedAmt.toString();
                        supplementaries.effectiveDate = detailOfferings.EffectiveDate.toString();
                        /* If TypeName includes Promo, then replace expire date is not required */
                        var newExpDate = (freeUnitsObject.name.includes("Promo")) ? "" : replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                        supplementaries.expireDate = (newExpDate !== "") ? newExpDate : detailOfferings.ExpireDate.toString();

                        if(expireDateBalanceInfo === ""){
                            expireDateBalanceInfo =(freeUnitsObject.name.includes("Free Units") || freeUnitsObject.name == "FreeData_AltanCoverage")?supplementaries.expireDate:"";    
                        }
                        print("expireDateBalanceInfo 1.1: "+expireDateBalanceInfo);
                        
                        var supplementaryOfferings = [];
                        supplementaryOfferings.push(supplementaries);
                    
                    freeUnitsObject.detailOfferings = supplementaryOfferings;
                    
                }else{
                    freeUnitsObject.detailOfferings = [];
                }
                
                
                freeUnitsArray.push(freeUnitsObject);

            }
        }

        if(queryBalanceInfo !== ''){
            if(Array.isArray(queryBalanceInfo)){
                print("NombreBolsaQB 1.0:");
                for(var t = 0; t < queryBalanceInfo.length; t++){
                    if(queryBalanceInfo[t].BalanceTypeName.toLowerCase().startsWith('bonus')){
                        var queryBalanceObj = {};
                        queryBalanceObj.name = queryBalanceInfo[t].BalanceTypeName.toString();
                        queryBalanceObj.totalAmount = ( ( (parseInt(queryBalanceInfo[t].TotalAmount)) / (1024*1024) ) / (100) ).toString();
                        var balanceDetail = queryBalanceInfo[t].BalanceDetail;
                        var balanceArray = [];
                        if(Array.isArray(balanceDetail)){

                            for(var u = 0; u < balanceDetail.length; u++){
                                var queryBalanceDetail = {};
                                queryBalanceDetail.effectiveDate = balanceDetail[u].EffectiveTime.toString();
                                //queryBalanceDetail.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:balanceDetail[u].ExpireTime.toString();
                                queryBalanceDetail.expireDate = replaceExpiDateQueryBalance(queryBalanceDetail.effectiveDate, balanceDetail[u].ExpireTime.toString(), freeDataBalance);
                                queryBalanceDetail.amount = ( ( (parseInt(balanceDetail[u].Amount)) / (1024*1024) ) / (100) ).toString();
                                balanceArray.push(queryBalanceDetail);
                            }
                        queryBalanceObj.balanceDetail = balanceArray;
                        freeUnitsArray.push(queryBalanceObj);
                        }
                        else{
                        var queryBalanceDetail = {};
                        queryBalanceDetail.effectiveDate = queryBalanceInfo[t].BalanceDetail.EffectiveTime.toString();
                        queryBalanceDetail.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:queryBalanceInfo[t].BalanceDetail.ExpireTime.toString();
                        //queryBalanceDetail.expireDate = replaceExpiDateQueryBalance(queryBalanceDetail.effectiveDate, queryBalanceInfo[t].BalanceDetail.ExpireTime.toString(), freeDataBalance);
                        queryBalanceDetail.totalAmount = ( ( (parseInt(queryBalanceInfo[t].TotalAmount)) / (1024*1024) ) / (100) ).toString();
                        balanceArray.push(queryBalanceDetail);
                        queryBalanceObj.balanceDetail = balanceArray;
                        freeUnitsArray.push(queryBalanceObj);
                        }
                    }   
                }
            }
            else{
                print("NombreBolsaQB 1.1:");
                if(queryBalanceInfo.BalanceTypeName.toLowerCase().startsWith('bonus')){
                    var queryBalanceObj = {};
                        queryBalanceObj.name = queryBalanceInfo.BalanceTypeName.toString();
                        queryBalanceObj.totalAmount = ( ( (parseInt(queryBalanceInfo.TotalAmount)) / (1024*1024) ) / (100) ).toString();
                        var balanceDetail = queryBalanceInfo.BalanceDetail;
                        //print('balanceDetail' + JSON.stringify(balanceDetail))
                        var balanceArray = [];
                        if(Array.isArray(balanceDetail)){
                            for(var u = 0; u < balanceDetail.length; u++){
                                var queryBalanceDetail = {};
                                queryBalanceDetail.effectiveDate = balanceDetail[u].EffectiveTime.toString();
                                //queryBalanceDetail.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:balanceDetail[u].ExpireTime.toString();
                                queryBalanceDetail.expireDate = replaceExpiDateQueryBalance(queryBalanceDetail.effectiveDate, balanceDetail[u].ExpireTime.toString(), freeDataBalance);        
                                queryBalanceDetail.amount = ( ( (parseInt(balanceDetail[u].Amount)) / (1024*1024) ) / (100) ).toString();
                                balanceArray.push(queryBalanceDetail);
                            }
                        queryBalanceObj.balanceDetail = balanceArray;
                        freeUnitsArray.push(queryBalanceObj);
                        }
                        else{
                        var queryBalanceDetail = {};
                        queryBalanceDetail.effectiveDate = queryBalanceInfo.BalanceDetail.EffectiveTime.toString();
                        queryBalanceDetail.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:queryBalanceInfo.BalanceDetail.ExpireTime.toString();
                        queryBalanceDetail.totalAmount = ( ( (parseInt(queryBalanceInfo.TotalAmount)) / (1024*1024) ) / (100) ).toString();
                        balanceArray.push(queryBalanceDetail);
                        queryBalanceObj.balanceDetail = balanceArray;
                        freeUnitsArray.push(queryBalanceObj);
                    }
                }
            }
        }
        
        context.setVariable("freeUnitsArray", JSON.stringify(freeUnitsArray));
    
    }else{
        
        var freeUnitsArray = [];
        var i;
        var freeUnitsTypeId = freeUnits.TypeId;
        if(!freeUnitsTypeId.includes('RG998') && !freeUnitsTypeId.includes('_MT')){
        //freeUnitsTypeId !== 'C_Free_DATA_RG998' 

            var freeUnitsObject = {};
            freeUnitsObject.name = ( typeof(freeUnits.TypeName) !== 'undefined' && freeUnits.TypeName !== null && freeUnits.TypeName !== "" ) ? freeUnits.TypeName.toString() : '';
            var amountFreeUnits = {};
            var isMobility = false;
            
            if ( freeUnitsObject.name.includes ("SMS") && !isMobilityFunc(primaryOffering)) {
                print('Identificado como SMS y diferente de mobilidad');
                
            }
            
            if(freeUnitsObject.name.includes ("Minutes") || freeUnitsObject.name.includes ("SMS")){
                isMobility = true;
                var freeUnitsTotalAmt = ( typeof(freeUnits.TotalAmt) !== 'undefined' && freeUnits.TotalAmt !== null && freeUnits.TotalAmt !== "" ) ? freeUnits.TotalAmt : '';
                var freeUnitsUnusedAmt = ( typeof(freeUnits.UnusedAmt) !== 'undefined' && freeUnits.UnusedAmt !== null && freeUnits.UnusedAmt !== "" ) ? freeUnits.UnusedAmt : '';
            }
            else{
                var freeUnitsTotalAmt = ( typeof(freeUnits.TotalAmt) !== 'undefined' && freeUnits.TotalAmt !== null && freeUnits.TotalAmt !== "" ) ? freeUnits.TotalAmt  / 1048576 : '';
                var freeUnitsUnusedAmt = ( typeof(freeUnits.UnusedAmt) !== 'undefined' && freeUnits.UnusedAmt !== null && freeUnits.UnusedAmt !== "" ) ? freeUnits.UnusedAmt  / 1048576 : '';
            }
            amountFreeUnits.totalAmt = freeUnitsTotalAmt.toString();
            amountFreeUnits.unusedAmt = freeUnitsUnusedAmt.toString();
            freeUnitsObject.freeUnit = amountFreeUnits;
            var detailOfferings = freeUnits.Detail;
            
            if(profileVersion === "2"){
                if(freeUnits.TypeName.includes("Throttling_")){
                    freeUnitsObject.throttlingSpeed = extractSpeed(freeUnits.TypeName);
                }
            }
            
            if(Array.isArray(detailOfferings)){
                var supplementaries = {};
                var supplementaryOfferings = [];
                var j;
                
                for(j = 0; j < detailOfferings.length; j++){
                    var supplementaries = {};
                    supplementaries.offeringId = ( typeof(detailOfferings[j].Origin.OfferingId) !== 'undefined' && detailOfferings[j].Origin.OfferingId !== null && detailOfferings[j].Origin.OfferingId !== "" ) ? detailOfferings[j].Origin.OfferingId.OfferingId.toString() : '';
                    supplementaries.purchaseSecuence = ( typeof(detailOfferings[j].Origin.OfferingId) !== 'undefined' && detailOfferings[j].Origin.OfferingId !== null && detailOfferings[j].Origin.OfferingId !== "" ) ? detailOfferings[j].Origin.OfferingId.PurchaseSeq.toString() : '';
                    var initialAmt = (isMobility) ? detailOfferings[j].InitialAmt : detailOfferings[j].InitialAmt / 1048576;
                    var unusedAmt = (isMobility) ? detailOfferings[j].UnusedAmt : detailOfferings[j].UnusedAmt / 1048576;
                    supplementaries.initialAmt = initialAmt.toString();
                    supplementaries.unusedAmt = unusedAmt.toString();
                    supplementaries.effectiveDate = detailOfferings[j].EffectiveDate.toString();
                    //var newExpDate = replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                    /* If TypeName includes Promo, then replace expire date is not required */
                    var newExpDate = (freeUnitsObject.name.includes("Promo")) ? "" : replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                    supplementaries.expireDate = (newExpDate !== "") ? newExpDate : detailOfferings[j].ExpireDate.toString();
                    supplementaryOfferings.push(supplementaries);
                    if(freeUnitsObject.name.includes("Free Units") || freeUnitsObject.name == "FreeData_AltanCoverage"){
                        freeDataBalance = supplementaryOfferings;
                    }                   
                }
                print("freeDataBalance 2.0: "+expireDateBalanceInfo);
                freeUnitsObject.detailOfferings = supplementaryOfferings;
                
            }else if(typeof(detailOfferings) !== 'undefined' && detailOfferings !== null && detailOfferings !== ""){
                    print("detailOfferings es un objeto");
                    var supplementaries = {};
                    supplementaries.offeringId = detailOfferings.Origin.OfferingId.OfferingId.toString();
                    supplementaries.purchaseSecuence = detailOfferings.Origin.OfferingId.PurchaseSeq.toString();
                    var initialAmt = (isMobility) ? detailOfferings.InitialAmt : detailOfferings.InitialAmt / 1048576;
                    var unusedAmt = (isMobility) ? detailOfferings.UnusedAmt : detailOfferings.UnusedAmt / 1048576;
                    supplementaries.initialAmt = initialAmt.toString();
                    supplementaries.unusedAmt = unusedAmt.toString();
                    supplementaries.effectiveDate = detailOfferings.EffectiveDate.toString();
                    //var newExpDate = replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                    /* If TypeName includes Promo, then replace expire date is not required */
                    var newExpDate = (freeUnitsObject.name.includes("Promo")) ? "" : replaceExpireEffectiveDate(supplementaries.purchaseSecuence, suppOffersData);
                    supplementaries.expireDate = (newExpDate !== "") ? newExpDate : detailOfferings.ExpireDate.toString();
                    
                    if(expireDateBalanceInfo == ""){
                            expireDateBalanceInfo =(freeUnitsObject.name.includes("Free Units") || freeUnitsObject.name == "FreeData_AltanCoverage")?supplementaries.expireDate:"";    
                    }
                    print("expireDateBalanceInfo 2.1: "+expireDateBalanceInfo);
                    var supplementaryOfferings = [];
                    supplementaryOfferings.push(supplementaries);
                
                freeUnitsObject.detailOfferings = supplementaryOfferings;
                
            }else{
                freeUnitsObject.detailOfferings = [];
            }

            /*If TypeName includes TimeLine then the data will not appear */
            if(freeUnitsObject.name.includes("TimeLine")){
                freeUnitsObject = {};
            }

            freeUnitsArray.push(freeUnitsObject);

        }

        if(queryBalanceInfo !== ''){
            var queryBalanceObj = {};
            if(Array.isArray(queryBalanceInfo)){
                for(var t = 0; t < queryBalanceInfo.length; t++){
                    if(queryBalanceInfo.BalanceTypeName.toLowerCase().startsWith('bonus')){
                        queryBalanceObj.name = queryBalanceInfo[t].BalanceTypeName.toString();
                        queryBalanceObj.totalAmount = ( ( (parseInt(queryBalanceInfo[t].TotalAmount)) / (1024*1024) ) / (100) ).toString();
                        queryBalanceObj.effectiveDate = queryBalanceInfo[t].BalanceDetail.EffectiveTime.toString();
                        //queryBalanceObj.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:queryBalanceInfo[t].BalanceDetail.ExpireTime.toString();
                        queryBalanceObj.expireDate = replaceExpiDateQueryBalance(queryBalanceObj.effectiveDate, queryBalanceInfo[t].BalanceDetail.ExpireTime.toString(), freeDataBalance);
                        freeUnitsArray.push(queryBalanceObj);           
                    }   
                }
            }else{
                if(queryBalanceInfo.BalanceTypeName.toLowerCase().startsWith('bonus')){
                    queryBalanceObj.name = queryBalanceInfo.BalanceTypeName.toString();
                    queryBalanceObj.totalAmount = ( ( (parseInt(queryBalanceInfo.TotalAmount)) / (1024*1024) ) / (100) ).toString();
                    queryBalanceObj.effectiveDate = queryBalanceInfo.BalanceDetail.EffectiveTime.toString();
                    queryBalanceObj.expireDate = ( typeof(expireDateBalanceInfo) !== 'undefined' && expireDateBalanceInfo !== null && expireDateBalanceInfo !== "" )?expireDateBalanceInfo:queryBalanceInfo.BalanceDetail.ExpireTime.toString();
                    freeUnitsArray.push(queryBalanceObj);           
                }
            }
        }

        context.setVariable("freeUnitsArray", JSON.stringify(freeUnitsArray));
    }
    
    
    
}else{
    context.setVariable("freeUnitsArray","[]");
}


function replaceExpireEffectiveDate(purchaseSecuence, suppOffersData){
    
    var expireEffectiveDateF = "";
    var isExpireEffectiveOffer = context.getVariable("isExpireEffectiveOffer");
    var supDataJson = (suppOffersData!=='undefined' && suppOffersData!== null && suppOffersData!=='')?JSON.parse(suppOffersData):'';
    
    //print("Tipo de Dato: "+typeof(supDataJson));
    //print("Es arreglo: "+Array.isArray(supDataJson));
    if(isExpireEffectiveOffer === 'true'){

        if(supDataJson!=='undefined' && supDataJson!== null && supDataJson!==''){
            if (Array.isArray(supDataJson)){
                for(var w=0; w<supDataJson.length; w++){
                    if(parseInt(purchaseSecuence) === parseInt(supDataJson[w].OfferingId.PurchaseSeq)){
                        var expDate = supDataJson[w].ExpireDate;
                        expireEffectiveDateF = expDate.toString();
                        //print("newExpireEffDateIf: "+expireEffectiveDateF);
                    }  
                }
            }else{
                if(parseInt(purchaseSecuence) === parseInt(supDataJson.OfferingId.PurchaseSeq)){
                    var expDate = supDataJson.ExpireDate;
                    expireEffectiveDateF = expDate.toString();
                    //print("newExpireEffDateElseIf: "+expireEffectiveDateF);
                }
            }
        }
    }

    return expireEffectiveDateF;
}

function isHBB(primaryOffering){
    return ( primaryOffering[1] == '0' || primaryOffering[1] == '1' || primaryOffering[1] == '2');
}

function isMobilityFunc(primaryOffering){
    return ( primaryOffering[1] == '6' || primaryOffering[1] == '7' || primaryOffering[1] == '8');
}

function extractSpeed(typeId) {
    var number;
    var res;
    number = typeId.match(/\d+/)[0];
   res=typeId.indexOf(number);
   return typeId.substr(res);
}

function replaceExpiDateQueryBalance(effectiveDate, expireDate, freeDataBalance){
    var expirationDate = expireDate;
    for(x=0; x<freeDataBalance.length; x++){
        if(freeDataBalance[x].effectiveDate.toString()===effectiveDate.toString()){
            expirationDate = freeDataBalance[x].expireDate;
        }
    }
    return expirationDate;
}