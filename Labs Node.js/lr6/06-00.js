const http = require("http");
const queryProcessor = require('./querryProcessing')

http.createServer(function(request, response){
    if (request.method === 'GET') {
        queryProcessor.getRequest(request, response);
    } else if (request.method === 'POST') {
        queryProcessor.postRequest(request, response);
    }

}).listen(5000, "127.0.0.1", function(){
    console.log("Server is running on port 5000");
});