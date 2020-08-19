const axios = require('axios')


const API_url = `https://api.cloudflare.com/client/v4/zones`;

getHeaders = () => {
    return {
        'X-Auth-Key': process.env.API_KEY,
        'X-Auth-Email': process.env.API_EMAIL
    }
};

/** 
 * 
 * checking for zone by domain name
 * ${domain} = String - domain name
*/
getZones = async (domain) => {
    let url = `${API_url}?name=${domain}`;
    let headers = getHeaders();
    let answer = axios({
        method: 'get',
        url,
        headers
    })
    return answer
}

/** 
 * 
 * set a new zone by domain name
 * ${domain} = String - domain name
*/
setNewZone = async (domain) => {
    let url = `${API_url}`;

    let headers = getHeaders();

    let answer = await axios({
        method: 'post',
        url,
        data: {
            name: domain,
            account: {
                id: process.env.ACCOUNT_ID
            }
        },
        headers
    })

    return answer
}

/**
 * check if a record exists in cloudflare
 * ${domain} = String - domain name
 * ${zoneID} = String - zone id
 */
asDNSRecord = async (domain, zoneID) => {
    let url = `${API_url}/${zoneID}/dns_records?name=${domain}`;
    console.log(`asDNSRecord -- > `, asDNSRecord)
    let headers = getHeaders();
    let answer = axios({
        method: 'get',
        url,
        headers
    })
    return answer
};

/** 
 * 
 * set a record in cloudflare
 * ${domain} = String - domain name
 * ${ip} = String - ip 
 * ${zoneID} = String - zone id
*/
setDNSRecord = async (domain, ip, zoneID) => {
    let url = `${API_url}/${zoneID}/dns_records`;

    let headers = getHeaders();

    let answer = await axios({
        method: 'post',
        url,
        data: {
            type: "A",
            name: domain,
            content: ip,
            ttl: 120
        },
        headers
    })

    return answer
};


module.exports = {
    setNewZone,
    getZones,
    asDNSRecord,
    setDNSRecord
}