const https = require("https");

module.export = {
    // utility method to make http request and convert to promise
    makeRequest(options, data) {
        return new Promise((resolve, reject) => {
            const req = https.request(options, function (res) {
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
        });

    }
}