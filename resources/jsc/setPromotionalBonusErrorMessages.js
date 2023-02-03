var msisdn = context.getVariable("msisdn");
var NotApplyPromotionalBonusErrorMessage ="Promotions does not apply for this MSISDN " + msisdn

context.setVariable("NotApplyPromotionalBonusErrorMessage", NotApplyPromotionalBonusErrorMessage); 

