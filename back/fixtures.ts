import mongoose from "mongoose";
import config from "./config";
import {randomUUID} from "crypto";
import User from "./models/User";
import Category from "./models/Category";
import Product from "./models/Product";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('products');
        await db.dropCollection('categories');
    } catch (e) {
        console.log("Collection were not present, skipping drop...");
    }

    const [firstUser, secondUser] = await User.create(
        {
            username: 'Violetta',
            password: '123',
            token: randomUUID(),
            phone: '0505909909',
            displayName: 'Vi'
        }, {
            username: 'Magomed',
            password: '123',
            token: randomUUID(),
            phone: '0508709909',
            displayName: 'Maga'
        }
    );

    const [
        headphones,
        television,
        camera,
        video,
        telephone
    ] = await Category.create(
        {
            title: 'Headphones'
        },
        {
            title: 'Television'
        },
        {
            title: 'Camera'
        },
        {
            title: 'Video'
        },
        {
            title: 'Telephone'
        }
    );

    await Product.create(
        {
            user: firstUser._id,
            category: headphones._id,
            title: 'JBL Tune Buds',
            description: "BL Pure Bass Sound: Smartly designed 10mm drivers enhanced by the buds' form factor deliver JBL's Pure Bass Sound so you'll feel every pulsing beat",
            price: 99,
            image: 'fixtures/jbl.png'
        },
        {
            user: firstUser._id,
            category: television._id,
            title: 'SAMSUNG 32-inch Class LED Smart TV',
            description: 'Smart TV - Get to your entertainment the faster, easier, and more intelligent way. Easily access your streaming services all in one place using the Samsung Remote Control.',
            price: 799,
            image: 'fixtures/smartTv.png'
        },
        {
            user: firstUser._id,
            category: telephone._id,
            title: 'iPhone 13 Pro',
            description: 'Includes a brand new, generic charging cable that is certified Mfi (Made for iPhone) and a brand new, generic wall plug that is UL certified for performance and safety. Also includes a SIM tray removal tool but does not come with headphones or a SIM card.',
            price: 870,
            image: 'fixtures/iphone.png'
        },
        {
            user: secondUser._id,
            category: camera._id,
            title: 'WYZE Cam Pan v3 Indoor',
            description: 'Pan, tilt, and zoom in full 1080p HD: Livestream from anywhere and control remotely using the Wyze app to check any part of the room, fast.',
            price: 39,
            image: 'fixtures/camPan.png'
        },
        {
            user: secondUser._id,
            category: video._id,
            title: 'ViewSonic PA503S 3800 ',
            description: 'VERSATILE PROJECTOR: High brighness 3800 Lumens SVGA projector with advanced visual features',
            price: 329,
            image: 'fixtures/viewSonic.png'
        },
        {
            user: secondUser._id,
            category: telephone._id,
            title: 'SAMSUNG Galaxy Z Flip 5',
            description: 'LARGE SCREEN, EASIER ACCESS: With customizable widgets and a full cover screen, Galaxy Z Flip5 is always open — even when it’s closed; Complete tasks in a flash, like sending texts, answering calls, accessing your calendar and even snapping selfies',
            price: 999,
            image: 'fixtures/samsung.png'
        },
    )

    await db.close();
};

run().catch(console.error);