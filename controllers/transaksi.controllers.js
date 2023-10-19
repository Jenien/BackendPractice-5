const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaksi = async (req, res, next) => {
    try {
        const { AkunID, JenisTransaksi, Jumlah } = req.body;

        const akun = await prisma.akun_bank.findUnique({
            where: {
                AkunID
            }
        });

        if (!akun) {
            return res.status(404).json({
                status: false,
                message: 'Akun tidak di temukan',
                data: null
            });
        }

        let newSaldo;

        if (JenisTransaksi === 'withdraw') {
            newSaldo = akun.Saldo - Jumlah;
        } else if (JenisTransaksi === 'deposit') {
            newSaldo = akun.Saldo + Jumlah;
        } else {
            return res.status(400).json({
                status: false,
                message: 'Invalid JenisTransaksi'
            });
        }

        const transaksi = await prisma.transaksi.create({
            data: {
                JenisTransaksi,
                Jumlah,
                Akun_bank: {
                    connect: {
                        AkunID
                    }
                }
            }
        });

        await prisma.akun_bank.update({
            where: {
                AkunID
            },
            data: {
                Saldo: newSaldo
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi sukses di bikin',
            data: transaksi
        });
    } catch (error) {
        next(error);
    }
};

const getTransaksiList = async (req, res, next) => {
    try {
        const transaksiList = await prisma.transaksi.findMany({
            include: {
                Akun_bank: {
                    include: {
                        Nasabah: true 
                }
            }
        }});

        const formattedTransaksiList = transaksiList.map(item => ({
            TransaksiID: item.TransaksiID,
            JenisTransaksi: item.JenisTransaksi,
            Jumlah: item.Jumlah,
            AkunID: item.AkunID,
            Nasabah: {
                NasabahID: item.Akun_bank.Nasabah.NasabahID,
                NamaNasabah: item.Akun_bank.Nasabah.NamaNasabah,
                Saldo: item.Akun_bank.Saldo
            }
        }));

        res.status(200).json({
            status: true,
            message: 'Transaksi di temukan',
            data: formattedTransaksiList
        });
    } catch (error) {
        next(error);
    }
};


const getTransaksiDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaksi = await prisma.transaksi.findUnique({
            where: {
                TransaksiID: parseInt(id),
            },
            include: {
                Akun_bank: {
                    include: {
                        Nasabah: true
                    }
                }
            }
        });

        if (!transaksi) {
            return res.status(404).json({
                status: false,
                message: 'Transaksi tidak di temukan',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'Transaksi detail di temukan',
            data: {
                TransaksiID: transaksi.TransaksiID,
                JenisTransaksi: transaksi.JenisTransaksi,
                Jumlah: transaksi.Jumlah,
                Akun_bank: {
                    AkunID: transaksi.Akun_bank.AkunID,
                    Saldo: transaksi.Akun_bank.Saldo,
                    Nasabah: {
                        NasabahID: transaksi.Akun_bank.Nasabah.NasabahID,
                        NamaNasabah: transaksi.Akun_bank.Nasabah.NamaNasabah
                    }
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

const updateTransaksi = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { JenisTransaksi, Jumlah } = req.body;

        const transaksi = await prisma.transaksi.findUnique({
            where: {
                TransaksiID: parseInt(id)
            },
            include: {
                Akun_bank: {
                    include: {
                        Nasabah: true
                    }
                }
            }
        });

        if (!transaksi) {
            return res.status(404).json({
                status: false,
                message: 'Transaksi tidak di temukan',
                data: null
            });
        }

        let newSaldo;

        if (JenisTransaksi === 'withdraw') {
            newSaldo = transaksi.Akun_bank.Saldo - Jumlah;
        } else if (JenisTransaksi === 'deposit') {
            newSaldo = transaksi.Akun_bank.Saldo + Jumlah;
        } else {
            return res.status(400).json({
                status: false,
                message: 'Invalid JenisTransaksi'
            });
        }

        const updatedTransaksi = await prisma.transaksi.update({
            where: {
                TransaksiID: parseInt(id)
            },
            data: {
                JenisTransaksi,
                Jumlah
            }
        });

        await prisma.akun_bank.update({
            where: {
                AkunID: transaksi.Akun_bank.AkunID
            },
            data: {
                Saldo: newSaldo
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi sukses di apdet',
            data: updatedTransaksi
        });
    } catch (error) {
        next(error);
    }
};
const deleteTransaksi = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.transaksi.delete({
            where: {
                TransaksiID: parseInt(id)
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi berhasil di hapus',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTransaksi, getTransaksiList, getTransaksiDetail, updateTransaksi, deleteTransaksi };