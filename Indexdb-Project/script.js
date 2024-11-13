const indexedDB = window.indexedDB;



const request = indexedDB.open("CarsDataBase", 1);

request.onerror = function (event) {
    console.error("error");
    console.error(event);

};

request.onupgradeneeded = function () {
    const db = request.result;
    const store = db.createObjectStore("cars", { keyPath: "id" });
    store.createIndex("car_colour", ["colour"], { unique: false });
    store.createIndex("colour_and_make", ["colour", "make"], { unique: false });
};

request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("cars", "readwrite");

    const store = transaction.objectStore("cars");
    const colourIndex = store.index("car_colour");
    const colourAndMakeIndex = store.index("colour_and_make");

    store.put({ id: 1, colour: "red", make: "Toyota" });
    store.put({ id: 2, colour: "green", make: "Kia" });
    store.put({ id: 3, colour: "blue", make: "Subaru" });
    store.put({ id: 4, colour: "blue", make: "Toyota" });
    store.put({ id: 5, colour: "silver", make: "Honda" });

    const idQuery = store.get(4);
    const colourQuery = colourIndex.getAll(["blue"]);
    const colourMakeQuery = colourAndMakeIndex.getAll(["red", "Toyota"]);

    idQuery.onsuccess = function () {
        console.log("idQuery", idQuery.result)
    };
    colourQuery.onsuccess = function () {
        console.log("colourQuery", colourQuery.result)
    };
    colourMakeQuery.onsuccess = function () {
        console.log("colourMakeQuery", colourMakeQuery.result)
    };


    transaction.oncomplete = function () {
        db.close();
    };

};

