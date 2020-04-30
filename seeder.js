const fs = require('fs');
const path = require('path');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Project = require('./models/Project');


dotenv.config({
    path: './config/config.env'
});

const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'projects.json'), 'utf-8'));

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});

const importData = async () => {
    try {
        await Project.create(projects);
        console.log("Data Imported".green.underline);
        process.exit();
    } catch (err) {
        console.error(err.message.red);
    }
}

//Clear data from DB
const deleteData = async () => {
    try {
        await Project.deleteMany();
        console.log("Data Destroyed".red.underline.bold);
        process.exit();
    } catch (err) {
        console.error(err.message.red);
    }
}

if (process.argv[2] == "-i") {
    importData()
} else if (process.argv[2] == "-d") {
    deleteData()
} else {
    console.log("Wrong arguement".red);
    process.exit(1);
}