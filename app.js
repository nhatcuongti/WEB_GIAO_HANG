import express from'express';
import { engine } from 'express-handlebars';
import numeral from 'numeral';
import test from "./models/testdb.js";

const app = express()
const port = 9000

app.engine('hbs', engine({
    defaultLayout: 'main.hbs',
    helpers: {
        format_number(val) {
            return numeral(val).format('0, 0');
        }
    }
}));

app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', async function (req, res) {
    let a = await test();
    console.log(a);
    res.render('test');
});

app.listen(port, function ()  {
    console.log(`Example app listening at http://localhost:${port}`)
});