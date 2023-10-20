const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../../app');

describe('Create Akun Bank (POST)', () => {
  it('Harus membuat Akun Bank baru', async () => {
    const response = await request(app)
      .post('/akun')
      .send({
        NasabahID: 3,
        Saldo: 15000
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('NasabahID', 3);
    expect(response.body.data).toHaveProperty('Saldo', 15000);
  });
});
describe('Get Akun Bank Detail by ID (GET)', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('Harus menampilkan detail Akun Bank dari ID', async () => {
      const akunID = 6;
  
      const response = await request(app)
        .get(`/akun/${akunID}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', true);
      expect(response.body).toHaveProperty('data');

      const akunBank = await prisma.akun_bank.findUnique({
        where: { AkunID: akunID }
      });
      expect(akunBank).toBeTruthy();
      expect(response.body.data.AkunID).toBe(akunID);
      expect(response.body.data.Saldo).toBe(akunBank.Saldo);
    });
  });
  describe('Get All Akun Bank (GET)', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('Harus menampilkan daftar Akun Bank', async () => {
      const response = await request(app)
        .get('/akun');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });
  describe('Update Akun Bank (PUT)', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('Harus memperbarui Akun Bank lewat ID', async () => {
      const akunID = 6;

      const response = await request(app)
        .put(`/akun/${akunID}`)
        .send({
          Saldo: 58000 
        });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', true);
      expect(response.body).toHaveProperty('data');
      const akunBank = await prisma.akun_bank.findUnique({
        where: { AkunID: akunID }
      });
      expect(akunBank).toBeTruthy();
      expect(akunBank.Saldo).toBe(58000);
    });
  });
  describe('Delete Akun Bank (DELETE)', () => {
    afterAll(async () => {
      await prisma.$disconnect();
    });
  
    it('Harus menghapus Akun Bank', async () => {
      const akunID = 12;
      const response = await request(app)
        .delete(`/akun/${akunID}`);
      expect(response.body).toHaveProperty('status', true);
      expect(response.body).toHaveProperty('data', null);
      const akunBank = await prisma.akun_bank.findUnique({
        where: { AkunID: akunID }
      });
      expect(akunBank).toBeNull();
    });
  });
  
  
  
  