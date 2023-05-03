const connectDb = require('./db');
const Item = require('../models/Item');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

(async () => {
    const db = await connectDb();

    // Delete all existing users and properties
    await User.deleteMany({});
    await Item.deleteMany({});

    // Create a new user
    const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: "password123",
        username: "jonnydoe",
        user_type: "admin",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
    });
    const user2 = await User.create({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@example.com',
        password: "password123",
        username: "emily",
        user_type: "client",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    });

    // Create some items
    const itemNames = [
        "Paper Towels",
        "Sani Wipes",
        "Soap (gallon)",
        "CaviCide",
        "CoeCide",
        "Needles 27Ga Short",
        "Needles 27Ga Long",
        "Needles 30 GA Short",
        "Lidocaine Red",
        "Cotton Tip Apllicators",
        "LightBody Impression (RegulatSet)",
        "HeavyBody Impression (RegularSet)",
        "HeaveyBody Impression (FastSet)",
        "Masks",
        "Gloves (Small)",
        "Gloves (Medium)",
        "Gloves(Large)",
        "Gloves(XS)",
        "3x10 Pouches",
        "Plastic Cups",
        "Xray Barriers Size 0",
        "Xray Barriers Size 2",
        "Bitewing Tabs",
        "Clear Barrier",
        "Sharps Containers",
        "Prophy Paste",
        "Saliva Ejectors",
        "HVE Disposable Tips",
        "2x2 Gauze",
        "Tray Covers",
        "Hand Sanitizer *Dispenser type",
        "Soap *Dispenser type",
        "Bibs",
        "Alginate",
        "Head Covers",
        "Composite A1",
        "Composite A2",
        "Composite A3",
        "Composite A3.5",
        "Composite B1",
        "Flowable A1",
        "Flowable B1",
        "GC Cement",
        "GC Bond",
        "Water Distilled (gallon)",
        "Citrisil Tablets",
        "Missing Tips (purple)",
        "Missing Tips (yellow)",
        "Evacuation Traps (2200)",
        "Chlorhexidine",
        "Hydrogen Peroxicide",
        "Alcohol",
        "Intramural Tips (yellow)",
        "Topical Anesthetic",
        "Rubber Dam",
        "Dental Floss",
        "Sporox (gallon)"
    ];

    const items = await Item.insertMany(itemNames.map(name => ({ name, totalItems: 50, items_left: 50 })));

    console.log(`User ${user.email} created with items:`);
    console.log(items);

    // Close the database connection
    process.exit(1)
})();


