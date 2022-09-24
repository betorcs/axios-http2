const axios = require('axios');
const http2 = require('http2-wrapper');

const http2Transport = {
    request: request = (options, handleResponse) => {
        const req = http2.request(options, handleResponse);
        setImmediate(() => {
            const listeners = req.listeners('socket');
            if (listeners.length) {
                req.removeListener('socket', listeners[0]);
            }
        });
        return req;
    }
};

const client = {
    fetchProducts: async () => {
        let url = 'https://apigateway.nike.com.br/nike-bff/search?term=air+jordan+1&sorting=relevance&resultsPerPage=999&scoringProfile=scoreByRanking&multiFilters=false';
        let res = await axios.get(url, {transport: http2Transport});

        if (res.status !== 200) {
            throw 'Unexpected status code ${res.status}';
        }

        return res.data['products'];
    }
}

module.exports.client = client;
