/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

module.exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;
  var bullshitObjLit = {
    one: "pizza",
    two: "pepperoni"
  }

  //handles requests made for classes/messages
  if(request.method === "OPTIONS") {
    //figure out how to send static files.

      response.writeHead(200, headers);
      response.end();
  } else if (new RegExp(/\/classes\/.+/).test(request.url) && request.method === "GET"){
      console.log("received classes/messages request");
      responseData = {};
      responseData.results = serverData;
      response.writeHead(200, headers);
      response.end(JSON.stringify(responseData));
  } else if(request.method === "POST") {
      console.log("received POST request")
      request.on("data", function(data){
        serverData.push(JSON.parse(data));
      });
      response.writeHead(201, headers);
      response.end();
  } else {
      console.log("Falling back to 404 response- this may be bad!")
      response.writeHead(404, headers);
      response.end("you done fucked up!");
  }

  //handles requests for /send



  };

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var serverData = [{text: "Hello World!", username: "Kyle and Eden", roomname: "Main"}];

