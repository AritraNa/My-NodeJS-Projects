const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: "new-kafka-app",
    brokers: ["192.168.29.212:9092"]
}
);