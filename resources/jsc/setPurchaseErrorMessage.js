 var msisdn = context.getVariable("msisdn");
var offerid = context.getVariable("offerId");

var NotApplyPromotionalBonusErrorMessage = "Can not be subscribed singly since it depends on the primary offering." + offerId

context.setVariable("PutchaseErrorMessage", NotApplyPromotionalBonusErrorMessage); 