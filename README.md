# Simple Message Server with Node.js, Express and Faye

## Built with

* [node.js](http://nodejs.org/)
* [express](http://expressjs.com/)
* [Faye](http://faye.jcoglan.com/)

## Usage

POST json messages to the `/messages` url and they are displayed on connected clients.

`% curl -v -H "Content-Type: application/json" -X POST -d '{"msg" : "contents"}' http://127.0.0.1:8000/messages`