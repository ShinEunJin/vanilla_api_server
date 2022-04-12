import express from 'express';
import './db'

import { changeState, checkState, resetState } from './controllers/longPolling';
import EventEmiiter from './controllers/longPolling2';

const PORT = 5000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send('hi'));

app.post('/long', changeState)
app.get('/long', checkState)
app.post('/reset', resetState)

const eventEmitter = new EventEmiiter()

const sleep = async (ms) => {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    }).catch(() => { })
}

const main = async () => {
    while (true) {
        const waitTimeMS = Math.floor(Math.random() * 10000)
        await sleep(waitTimeMS)
        eventEmitter.fire({ time: waitTimeMS })
    }
}

app.get("/longPolling", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    const id = Date.now().toString();
    let timer = null
    const handler = function (event) {
        clearTimeout(timer)
        console.log('event', event);
        res.status(201);
        res.end(JSON.stringify(event));
    };
    eventEmitter.register(id, handler);
    timer = setTimeout(() => {
        console.log('timeout')
        const wasUnregistered = eventEmitter.unregister(id)
        console.log("wasUnregistered", wasUnregistered)
        if (wasUnregistered) {
            res.status(200)
            res.end()
        }
    }, 5000)
})

main()

app.listen(PORT, () => console.log(`✅ server is connected to ${PORT}`));
