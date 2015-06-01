/**
 * Created by ryosuke on 2015/05/07.
 */
/* global require, module, exports, console */
(function () {
    'use strict';
    var ipAddress = '10.249.255.185',
        port = 8000,
        Kinect2 = require('kinect2'),
        kinect = new Kinect2(),
        sender = require('dgram').createSocket("udp4"),
        ipAddress = "10.249.255.191",//"localhost",
        port = 8000,
        message = {};

    if (kinect.open()) {
        kinect.on('bodyFrame', function (bodies) {
            message = new Buffer(JSON.stringify(bodies[0].joints3d));
            sender.send(message, 0, message.length, port, ipAddress);
            for (var i = 0; i < bodies.length; i++) {
                console.log(bodies[i].joints3d);
            }
        });
        kinect.openBodyReader();
    }

    sender.bind(8888);
    sender.on("listening", function () {
        var address = sender.address();
        console.log("listening " + address.address + ":" + address.port);
    });
})();
