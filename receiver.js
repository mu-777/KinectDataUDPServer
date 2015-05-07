/**
 * Created by ryosuke on 2015/05/07.
 */
/* global require, module, exports, console */
(function () {
    'use strict';
    var receiver = require('dgram').createSocket("udp4"),
        senderAddress = [];

    receiver.bind(8000);
    receiver.on('message', function (buf, rinfo) {
        if (senderAddress.indexOf(rinfo.address) == -1) {
            senderAddress.push(rinfo.address);
        }
        console.log(JSON.parse(buf.toString()));
    });
})();