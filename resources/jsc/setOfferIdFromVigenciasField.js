var offerIdVigencias = context.getVariable('responseCatalogPromotions.offerIdVigencias');
var moreRecentExpireDateInt = context.getVariable('moreRecentExpireDateInt');
var offerIdFromVigencias = '';
var timestamp_mx = context.getVariable("timestamp_mex");
var formatDate = "YYYYMMDDHHmmss";
var format = "YYYYMMDD";
var today = moment().tz("America/Mexico_City").format(format);
var moreRecentExpireDateStr = moreRecentExpireDateInt.toString(10);

print(' | today ' +  today );
if(moreRecentExpireDateStr != '0'){
    var endDay = moment( moreRecentExpireDateStr.substring(0,8));
    print(' | moreRecentExpireDateStr: '+moreRecentExpireDateStr);
    print(' | endDay::' +  endDay.format(format) );

    if((typeof(offerIdVigencias) !== 'undefined' || offerIdVigencias !== null || offerIdVigencias !== "")){
        
        var days = endDay.diff(today,'days');
        print(' |days' +  days);
        
        firstArrFromOffersVigencias = offerIdVigencias.split(",");
        for(var x = 0; x<firstArrFromOffersVigencias.length; x++){

            secondArrFromOffersVigencias = firstArrFromOffersVigencias[x].split("|");
            print('[ secondArrFromOffersVigencias: '+secondArrFromOffersVigencias[0]);
            print('| secondArrFromOffersVigencias: '+secondArrFromOffersVigencias[1]+' ]');

            if( Math.abs( secondArrFromOffersVigencias[0] ) == days){
                print('****dentro de ultimo if****')
                offerIdFromVigencias = secondArrFromOffersVigencias[1];
            }
        }
        print(' | today ' +  today );
        print(' | moreRecentExpireDateStr: '+moreRecentExpireDateStr);
        print(' | endDay::' +  endDay.format(format) );
        print(' | days between two Dates::' +  days);
    }    
}

context.setVariable('offerIdFromVigencias', offerIdFromVigencias);


