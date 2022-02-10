const http = require("https");

module.exports = {
     // utility method to make http request and convert to promise
    makeRequest(options, data) {
        return new Promise((resolve, reject) => {
            const req = http.request(options, function (res) {
                const chunks = [];
            
                res.on("data", function (chunk) {
                chunks.push(chunk);
                });
            
                res.on("end", function () {
                    const body =  JSON.parse(Buffer.concat(chunks).toString());
                    resolve(body);
                });

                res.on("error", function(err){
                    reject(err);
                });

            });

            req.write(JSON.stringify(data));
            req.end();
        })
    }
};
