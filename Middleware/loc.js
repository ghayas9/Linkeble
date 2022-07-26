const getIP = require('ipware')().get_ip;
const geoip = require('geoip-lite');
module.exports = {
loc:async(req,res,next)=>{
        try{
            req.loc = {loc:geoip.lookup(getIP(req).clientIp),ip:getIP(req)}
        }catch(err){
            console.log(err);
        }finally{
            next() 
        }
    }
}