require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;
const nasabahRoutes = require('./routes/nasabah.routes');
const akunBankRoutes = require('./routes/akun_bank.routes');
const transaksiRoutes = require('./routes/transaksi.routes');
const cors = require ('cors');

app.use(cors());
app.use(express.json());
app.use('/nasabah', nasabahRoutes);
app.use('/akun', akunBankRoutes);
app.use('/transaksi', transaksiRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'tidak di temukan',
        data: null
    });
    next(); 
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        data: err.message
    });
    next(); 
});

app.listen(PORT, () => console.log('listening on port', PORT));

module.exports=app;