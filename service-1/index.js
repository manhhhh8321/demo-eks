const express = require("express");
const amqp = require("amqplib");

const app = express();
const PORT = 5001;
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function sendToQueue(message) {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const queue = "task_queue";

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

    console.log(`[x] Sent: ${message}`);
    setTimeout(() => connection.close(), 500);
}

app.get("/send-message", async (req, res) => {
    const message = "Hello from Service1!";
    await sendToQueue(message);
    res.json({ success: true, message: "Message sent to queue!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Service 1 running on http://localhost:${PORT}`);
});
