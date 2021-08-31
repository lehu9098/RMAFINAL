const request = require('request');
//const https = require('https');

var initalize = function(site) {
  //const site = 'BOCOROCO';
  return new Promise(function(resolve, reject){
  request('https://dwr.state.co.us/Rest/GET/api/v2/telemetrystations/telemetrystation/?format=json&abbrev='+site+'&includeThirdParty=true&apiKey=97Of3gCrwIBy7k1a6ukG2eSqjdPFp8J%2B', function(err, res, body){
    if(err)
    {
      reject(err);
    }
    else{
      resolve(JSON.parse(body));
    }
  });
});
}
//'+lad+','+long


var weather = function(lad, long){
  return new Promise(function(resolve, reject){
  request('https://api.openweathermap.org/data/2.5/onecall?lat='+lad+'&lon='+long+'&units=imperial&appid=73d23538e6b5517307472c51f898e8a8', function(err, res, body){
    if(err)
    {
      reject(err);
    }
    else{
      //console.log(JSON.parse(body))
      resolve(JSON.parse(body));
    }
  });
});
}

/*request('https://www.fishwatch.gov/api/species/pink-salmon', function(err, res, body) {

      if (err) { return console.log(err); }
      console.log(body);

});*/
/*weather('41', '43').then((result) => {
  console.log(result.latitude)
})*/
module.exports.initalize = initalize;
module.exports.weather = weather;
