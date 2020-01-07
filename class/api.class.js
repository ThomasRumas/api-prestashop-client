const axios = require('axios');

const headers = {
    'Io-Format': 'JSON'
};

class ApiClientPrestashop {
    /**
     * 
     * @param {String} prmApiKey your Prestashop API Key 
     * @param {String} prmHost your domain URL
     */
    constructor(prmApiKey, prmHost) {
        this.apiKey = prmApiKey; 
        this.host = prmHost;
    }

    /**
     * @return available routes with your API Key
     */
    getAvailablesEndpoint() {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: _constructGetUrl.call(this),
                headers: headers
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.message);
            });
        });
    }

    /**
     * 
     * @param {String} prmRoute the route you want to call, ex : products/1 
     * 
     * @return object definition awaited from endpoint pass on parameter
     */
    getSchemaDefinition(prmRoute) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: _constructGetUrl.call(this, prmRoute, { schema: 'synopsis' }),
                headers: headers
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.message);
            })
        });
    }

    /**
     * 
     * @param {String} prmRoute the route you want to call, ex : products 
     * 
     * @return object definition awaited from endpoint pass on parameter
     */
    getSchemaExample(prmRoute) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: _constructGetUrl.call(this, prmRoute, { schema: 'blank' }),
                headers: headers
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.message);
            })
        });
    }

    /**
     * 
     * @param {String} prmRoute the route you want to call, ex : products/1
     * 
     * @return requested data
     */
    get(prmRoute) {
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url: _constructGetUrl.call(this, prmRoute),
                headers: headers
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error.message);
            })
        });
    }
}

/**
 * 
 * @param {String} prmEndpoint the endpoint you want to call
 * @param {Object} prmQueryParams object that contains parameters for your request
 * 
 * @return URL to call with serialized data
 */
function _constructGetUrl(prmEndpoint = '', prmQueryParams = {}) {
    return `${this.host}/api/${prmEndpoint}?ws_key=${this.apiKey}&${Object.entries(prmQueryParams).map(([key, val]) => `${key}=${val}`).join('&')}`;
}

module.exports = ApiClientPrestashop;