var CryptoJS = require("./crypto-js.js");

function getNowFormatDate() {
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
    Year = day.getUTCFullYear();//支持IE和火狐浏览器.
    Month = day.getUTCMonth() + 1;
    Day = day.getUTCDate();
    CurrentDate += Year;
    if (Month >= 10) {
        CurrentDate += Month;
    }
    else {
        CurrentDate += "0" + Month;
    }
    if (Day >= 10) {
        CurrentDate += Day;
    }
    else {
        CurrentDate += "0" + Day;
    }
    return CurrentDate;
}

//生成HHmmss格式时间
function formateDateAndTimeToString() {
    var date = new Date();
    console.log("date = " + date);
    var hours = date.getUTCHours();
    var mins = date.getUTCMinutes();
    var secs = date.getUTCSeconds();
    var currentTime = '';

    console.log('hours', hours)
    console.log('mins', mins)
    console.log('secs', secs)

    if (hours < 10) {
        currentTime += '0' + hours;
    } else {
        currentTime += hours;
    }

    if (mins < 10) {
        currentTime += '0' + mins;
    } else {
        currentTime += mins;
    }

    if (secs < 10) {
        currentTime += '0' + secs
    } else {
        currentTime += secs;
    }
    console.log("the current time is " + currentTime);
    return currentTime;
}

//亚马逊sigv4签名算法
function SigV4Utils() { }

SigV4Utils.sign = function (key, msg) {
    var hash = CryptoJS.HmacSHA256(msg, key);
    return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.sha256 = function (msg) {
    var hash = CryptoJS.SHA256(msg);
    return hash.toString(CryptoJS.enc.Hex);
};

SigV4Utils.getSignatureKey = function (key, dateStamp, regionName, serviceName) {
    var kDate = CryptoJS.HmacSHA256(dateStamp, 'AWS4' + key);
    var kRegion = CryptoJS.HmacSHA256(regionName, kDate);
    var kService = CryptoJS.HmacSHA256(serviceName, kRegion);
    var kSigning = CryptoJS.HmacSHA256('aws4_request', kService);

    console.log("kSigning = " + kSigning);

    return kSigning;
};

//计算websocket访问的url地址

function computeUrl() {
    //UTC时间格式
    var dateStamp = getNowFormatDate();
    var amzdate = dateStamp + 'T' + formateDateAndTimeToString() + 'Z';
    console.log('amzdate = ' + amzdate);

    //service参数
    var service = 'iotdevicegateway';

    //regionName参数
    var region = 'us-east-1';

    //secretKey参数
    var secretKey = 'hYr1y1RGZo0izAcA+j/IbTq339rJIO+OFZ+OTZtc';

    //accessKey参数
    var accessKey = 'AKIAISDWOX2IFTYBVW6Q';

    //algorithm参数
    var algorithm = 'AWS4-HMAC-SHA256';

    var method = 'GET';
    var canonicalUri = '/mqtt';

    //endpoint参数
    var host = 'a26ktsy790d3lc.iot.us-east-1.amazonaws.com';

    //credentialScope(证书范围)参数
    var credentialScope = dateStamp + '/' + region + '/' + service + '/' + 'aws4_request';

    //生成canonicalQuerystring参数
    var canonicalQuerystring = 'X-Amz-Algorithm=AWS4-HMAC-SHA256';
    canonicalQuerystring += '&X-Amz-Credential=' + encodeURIComponent(accessKey + '/' + credentialScope);//encodeURIComponent() 函数可把字符串作为 URI 组件进行编码
    canonicalQuerystring += '&X-Amz-Date=' + amzdate;
    canonicalQuerystring += '&X-Amz-Expires=86400';
    canonicalQuerystring += '&X-Amz-SignedHeaders=host';

    var canonicalHeaders = 'host:' + host + '\n';
    var payloadHash = SigV4Utils.sha256('');
    var canonicalRequest = method + '\n' + canonicalUri + '\n' + canonicalQuerystring + '\n' + canonicalHeaders + '\nhost\n' + payloadHash;
    console.log('canonicalRequest ' + canonicalRequest);

    var stringToSign = algorithm + '\n' + amzdate + '\n' + credentialScope + '\n' + SigV4Utils.sha256(canonicalRequest);

    console.log("secretKey = " + secretKey);
    console.log("dateStamp = " + dateStamp);
    console.log("region = " + region);
    console.log("service = " + service);

    var signingKey = SigV4Utils.getSignatureKey(secretKey, dateStamp, region, service);
    console.log('stringToSign ' + stringToSign);
    console.log('------------------');
    console.log('signingKey ' + signingKey);

    var signature = SigV4Utils.sign(signingKey, stringToSign);
    console.log('signature', signature)

    canonicalQuerystring += '&X-Amz-Signature=' + signature;
    var requestUrl = 'wss://' + host + canonicalUri + '?' + canonicalQuerystring;

    console.log('requestUrl', requestUrl);

    return requestUrl;
}
module.exports = {
    computeUrl: computeUrl
}