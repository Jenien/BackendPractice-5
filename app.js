require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000, JWT_SECRET } = process.env;
const nasabahRoutes = require('./routes/nasabah.routes');
const akunBankRoutes = require('./routes/akun_bank.routes');
const transaksiRoutes = require('./routes/transaksi.routes');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('morgan');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            status: false,
            message: 'Token tidak disediakan',
            data: null
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: false,
                message: 'Token tidak valid',
                data: null
            });
        }

        req.user = decoded;
        next();
    });
};

app.use(cors());
app.use(express.json());
app.use(logger('dev'));
app.use('/nasabah', nasabahRoutes);
app.use('/akun', verifyToken, akunBankRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'Tidak ditemukan xixixi',
        data: null
    });
    next();
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        status: false,
        message: 'Data salah, coba yg bner y',
        data: err.message
    });
    next();
});

app.listen(PORT, () => console.log('Jalan di port', PORT));

module.exports = app;