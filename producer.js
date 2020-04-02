var amqp = require("amqplib/callback_api")

amqp.connect("amqp://localhost", function (err, connection) {
    if (err) {
        throw err
    }
    connection.createChannel(function (err, channel) {
        if (err) {
            throw err
        }
        var queue = 'myFirstQueue';
        var msg = "Message Number -"

        channel.assertQueue(queue, {
            durable: false
        });

        for(var i = 1; i <= 100; i++){
            var finalMsg = `${msg} ${i}`
            channel.sendToQueue(queue, Buffer.from(finalMsg));
        }
        
        console.log(" [x] Sent '%s'", msg);

        setTimeout(function () {
            connection.close();
            process.exit(0)
        }, 500);
    })
})
