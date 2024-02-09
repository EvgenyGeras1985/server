require("dotenv").config();
const sequelize = require('./db.config');
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandlingMiddleWare");
const PORT = 9100;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static',express.static( 'static'));
app.use(fileUpload({}));
app.use('/api', router);

app.use(errorHandler)


const start = async () => {
    try{
        await sequelize.authenticate()
        app.listen(PORT, ()=> console.log("Server start at " + PORT))
        await  sequelize.sync()
    }catch (err){
        console.log(err);
    }
}

start();







