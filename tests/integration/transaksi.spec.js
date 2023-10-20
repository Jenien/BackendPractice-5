const request = require('supertest');
const app = require('../../app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Integration Testing Transaksi Endpoints', () => {
  it('should create a new transaction', async () => {
    const response = await request(app)
      .post('/transaksi')
      .send({
        AkunID: 3,
        JenisTransaksi: 'deposit',
        Jumlah: 1000
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Transaksi sukses di bikin');
    expect(response.body.data).toHaveProperty('TransaksiID');
  });

  it('should get a list of transactions', async () => {
    const response = await request(app)
      .get('/transaksi');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Transaksi di temukan');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get details of a transaction', async () => {
    const response = await request(app)
      .get('/transaksi/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Transaksi detail di temukan');
    expect(response.body.data).toHaveProperty('TransaksiID');
  });

  it('should update a transaction', async () => {
    const response = await request(app)
      .put('/transaksi/1')
      .send({
        JenisTransaksi: 'deposit',
        Jumlah: 2000
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Transaksi sukses di apdet');
    expect(response.body.data).toHaveProperty('TransaksiID');
  });

  it('should delete a transaction', async () => {
    const response = await request(app)
      .delete('/transaksi/2');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(true);
    expect(response.body.message).toBe('Transaksi berhasil di hapus');
    expect(response.body.data).toBeNull();
  });
});
