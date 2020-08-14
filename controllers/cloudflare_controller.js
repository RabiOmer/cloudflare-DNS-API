const express = require('express');
const router = express.Router();
module.exports = router;

const CloudflareModule = require('../modules/cloudflare_module');


router.post('/dns',setDns);

// dns record file!!
// here is the POST input this function validate the data from the client
async function setDns(req,res){
    try {
        let Domain_Name,Domain_IP,asDomain,isSetDomain;
        Domain_Name = req.body.domain;
        Domain_IP = req.body.ip;

        // test domain name
        if(!Domain_Name) throw "Missing Domain Name";
        if(!CloudflareModule.isValidDomain(Domain_Name)) throw "invalid Domain Name";

        // test ip 
        if(!Domain_IP) throw "Missing Domain IP";
        if(!CloudflareModule.isValidIP(Domain_IP)) throw "invalid IP";

        // checking if domain exist
        asDomain = await CloudflareModule.asDomainCloudflare(Domain_Name)
        if(!asDomain.status) throw asDomain.error;

        // set domain in cloudflare
        isSetDomain = await CloudflareModule.setCloudflareDomain(Domain_Name,Domain_IP)
        if(!isSetDomain.status) throw isSetDomain.error;

        res.json({
            success:true,
        })
    }
    catch(e){
        console.log(`e : `,e)
        res.json({
            success:false,
            error: e
        })
    }
}