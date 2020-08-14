const requestModule = require('./request_module');
module.exports = {
    // test if the domain is valid input
    isValidDomain(domain){
        let regex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
        if(!isNaN(domain)) return false;
        if(!regex.test(domain)) return false;
         return true;
    },
    // test if the ip is valid input
    isValidIP(IP){
        let regex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
        if(!isNaN(IP)) return false;
        if(!regex.test(IP)) return false;
         return true;
    },

    // checking for domain
    async asDomainCloudflare(domain){
        try {
            let checkForDomain = await requestModule.asDomain(domain);
            return checkForDomain;
        } catch (error) {
            console.log('error - ',error)
        }
    },
        // set domain for domain
    async setCloudflareDomain(domain,ip){
        try {
            let setDomain = await requestModule.setDomain(domain,ip);
            return await setDomain;
        } catch (error) {
            console.log('error - ',error)
        }

    }


}