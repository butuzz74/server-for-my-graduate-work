const express = require("express");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
// const initDatabase = require("./startUp/initDatabase");
const routes = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;
// const PORT = process.env.PORT || config.get("port");

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client")));
    const indexPath = path.join(__dirname, "client", "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
}
async function start() {
    try {
        // mongoose.connection.once("open", () => {
        //     initDatabase();
        // });
        await mongoose.connect(config.get("mongoUri"));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on ${PORT} port`));
        });
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}
start();
