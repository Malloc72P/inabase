const express = require('express');
const app = express();
const port = 3000;
const os = require('os');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health_check', (req, res) => {
    const ip = getServerIPAddress();

    req.res.send({
        status: 'ok',
        ip,
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

function getServerIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1'; // 기본값 (localhost)
}
