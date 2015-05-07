/**
 * Created by ryosuke on 2015/05/07.
 */
/* global require, module, exports, console */
(function () {
    'use strict';
    var Kinect2 = require('kinect2'),
        kinect = new Kinect2(),
        sender = require('dgram').createSocket("udp4"),
        message = {};

    if (kinect.open()) {
        kinect.on('bodyFrame', function (bodies) {
            message = new Buffer(JSON.stringify(bodies[0].joints3d));
            sender.send(message, 0, message.length, 8000, "localhost");
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