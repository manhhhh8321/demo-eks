const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = 5002;
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function consumeMessages() {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "task_queue";

    await channel.assertQueue(queue, { durable: true });

    console.log(" [*] Waiting for messages in", queue);
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            console.log(`[x] Received: ${msg.content.toString()}`);
            channel.ack(msg);
        }
    });
}

consumeMessages().catch(console.error);

app.listen(PORT, () => {
    console.log(`🚀 Service 2 running on http://localhost:${PORT}`);
});
