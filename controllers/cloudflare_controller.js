const express = require('express');

const CloudflareModule = require('../modules/cloudflare_module');

const router = express.Router();


/**
 * here is the POST input this function validate the data from the client
 */
setDNS = async(req,res) =>{
    try {
        let Domain_Name,Domain_IP,ZoneID,isSetDomain;
        Domain_Name = req.body.domain;
        Domain_IP = req.body.ip;

        if(!Domain_Name) throw "Missing Domain Name";
        if(!CloudflareModule.isValidDomain(Domain_Name)) throw "invalid Domain Name";

        if(!Domain_IP) throw "Missing Domain IP";
        if(!CloudflareModule.isValidIP(Domain_IP)) throw "invalid IP";

        ZoneID = await CloudflareModule.manageDomainZone(Domain_Name)
        if(!ZoneID) throw 'undefined ZoneID';

        isSetDomain = await CloudflareModule.ManageARecord(Domain_Name,Domain_IP,ZoneID)
        if(!isSetDomain.success) throw isSetDomain.error

        
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

router.post('/dns',setDNS);

module.exports = router;