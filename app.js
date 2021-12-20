import express from'express';
import { engine } from 'express-handlebars';
import numeral from 'numeral';
import guestRouter from "./routes/guest.router.js";
import adminRouter from "./routes/admin.router.js";
import driverRouter from "./routes/driver.router.js";
import staffRouter from "./routes/staff.router.js";
import hbs_sections from 'express-handlebars-sections';
import morgan from 'morgan'

const app = express()
const port = 3000

app.use(morgan('dev'));
import test from "./models/testdb.js";
import client from './routes/client.js'
import company from './routes/company.js'

app.engine('hbs', engine({
    defaultLayout: 'main.hbs',
    helpers: {
        format_number(val) {
            return numeral(val).format('0, 0');
        },
        section: hbs_sections()
    }
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.use('/', guestRouter);
app.use('/admin', adminRouter);
app.use('/driver', driverRouter);
app.use('/staff', staffRouter);



app.use('/client', client);
app.use('/company', company);



app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
});