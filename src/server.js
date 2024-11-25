import express from 'express';
import 'dotenv/config';
import HttpTraceLogger from './middleware/http-trace-log';
import {userRoute} from './route';
const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extends: true }));

app.use(HttpTraceLogger);

app.use('/user', userRoute);

app.listen(PORT, (error) => {
    if(error) {
        console.error("Error starting server ... ", error);
        process.exit(0);
    }
    console.log(`Server started in port  ${PORT}`);
})

