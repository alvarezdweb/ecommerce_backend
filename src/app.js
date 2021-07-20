import config from './config/index.js';
import express from "express";
import routes from './api/index.js'
const app = express();
import mongoose from 'mongoose';

mongoose.connect(config.url_local, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('conexion exitosa!'))
    .catch(err => console.log(err))

app.listen(config.port).on("error", (err) => {
    console.log("Error: ", err);
    process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes());

export default app; 