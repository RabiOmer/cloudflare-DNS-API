const API_Module = require('./API_module');


/**
 * test if the domain is valid input
 */
isValidDomain = (domain) => {
    let regex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    if (!isNaN(domain)) return false;
    if (!regex.test(domain)) return false;
    return true;
}


/**
 * test if the ip is valid input
 */
isValidIP = (IP) => {
    let regex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
    if (!isNaN(IP)) return false;
    if (!regex.test(IP)) return false;
    return true;
}

/**
 * this function need the domain name and return the zoneID;
 */
manageDomainZone = async (domain) => {
    let zoneID = null;
    let newZone, zoneList;

    zoneList = await API_Module.getZones(domain);
    
    // validate if zone exists
    if (zoneList.data && zoneList.data.result && zoneList.data.result.length && zoneList.data.result[0].id) zoneID = zoneList.data.result[0].id;
    else {
           // creating a new zone 
        newZone = await API_Module.setNewZone(domain);
        if (newZone.data && newZone.data.result && newZone.data.result.length && newZone.data.result[0].id) {
            zoneID = newZone.result[0].id
        }
    }
    return zoneID
}


/**
 * manage DNS record checking if record is exists if not set a new record
 */
ManageARecord = async (domain, ip, zoneID) => {
    let asRecord, isRecordSet;
    let response = {
        success: false,
        error: null
    };
    //checking for an A record is exists
    asRecord = await API_Module.asDNSRecord(domain, zoneID);
    
    //if as result data you already have a record
    if (asRecord.data && asRecord.data.result && asRecord.data.result.length) response.error = 'already as record for this domain ' + domain;
    else {
        // set a new record with the domain name | ip | zone id
        isRecordSet = await API_Module.setDNSRecord(domain, ip, zoneID);
        if (asRecord.data && isRecordSet.data.result && isRecordSet.data.result.length) response.success = true;
    }

    return response
}




module.exports = {
    isValidDomain,
    isValidIP,
    manageDomainZone,
    ManageARecord
}