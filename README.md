# Simple Message Server with Node.js, Express and Faye

## Built with

* [node.js](http://nodejs.org/)
* [express](http://expressjs.com/)
* [Faye](http://faye.jcoglan.com/)
* [Smoothie Charts](http://smoothiecharts.org/)

## Usage

Server runs on port 8000 by default.
POST json messages to the `/data` url and they are graphed on connected clients.

    % node server.js
    % curl -v -H "Content-Type: application/json" -X POST -d '{"id": 1, "data" : 1.5}' http://127.0.0.1:8000/data
