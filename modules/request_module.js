const zone_identifier = 'ca83590ee2fef6c683752e1a9373a5a1';
const request_url = 'https://api.cloudflare.com/client/v4/zones/';
const headers = {
    'Authorization': 'Bearer kfyUvr1bxS5JttvDOP3MqmVPhDYM0W0rdmkfQ941',
    'Content-Type': 'application/json'
}
const request = require('request')
module.exports = {
        // check if a record exists in cloudflare
    asDomain(domain) {
        try {
            return new Promise((resolve, reject) => {
                request({
                    url: `${request_url}${zone_identifier}/dns_records?name=${domain}`,
                    headers
                }, function (error, response, body) {
                    if (error) resolve({
                        status: false,
                        error
                    });
                    if (body) {
                        let res = JSON.parse(body);
                        // if as result record is exist
                        if(res.result.length) resolve({
                            status: false,
                            error: 'domain already in cloudflare'
                        })
                        resolve({status: true})
                    }
                });
            });

        } catch (error) {
            console.log(`error -`, error)
        }
    },
    // set a record in cloudflare
    setDomain(domain,ip){
        try {
            return new Promise((resolve, reject) => {
                request({
                    url: `${request_url}${zone_identifier}/dns_records`,
                    headers,
                    method :"POST",
                    json: true,
                    body: {
                        type: "A",
                        name: domain,
                        content: ip,
                        ttl: 120
                    }
                }, function (error, response, body) {
                    if (error) resolve({
                        status: false,
                        error
                    });
                    if (body) {
                        if(body.success) resolve({status: true})
                        else resolve({status: false,error: body.errors})
                    }
                });
            });

        } catch (error) {
            console.log(`error -`, error)
        }
    }
}