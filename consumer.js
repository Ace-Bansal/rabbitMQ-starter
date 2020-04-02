var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", function (err, conn) {
    if (err) {
        throw err;
    }
    conn.createChannel(function (err, channel) {
        if (err) {
            throw err;
        }
        var queue = 'myFirstQueue';

        channel.assertQueue(queue, {
            durable: false
        });

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            setTimeout(function () {
                console.log(" [x] Done");
            }, 3000);
        }, {
            noAck: false
        });
    })
})