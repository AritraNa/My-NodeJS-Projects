const {kafka} = require("./client")

async function init() {
    const admin = kafka.admin();
    console.log("admin connecting...")
    admin.connect();
    console.log("admin connected!");
    console.log("creating Topic [rider-updates]");

    await admin.createTopics({
        topics: [{
            topic: "rider-updates",
            numPartitions: 2
        }]
    });
    console.log("Topic [rider-updates] created");
    console.log("Disconnecting Admin");

    await admin.disconnect();
}

init();