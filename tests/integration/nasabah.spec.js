const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const request = require('supertest');
const app = require('../../app');

describe('Register Nasabah (POST)', () => {
  it('Harus mendaftarkan Nasabah baru', async () => {
    const response = await request(app)
      .post('/nasabah/register')
      .send({
        NamaNasabah: 'Tidaktahuya',
        Email: 'okelah@email.com',
        Password: 'TestPassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('NamaNasabah', 'Tidaktahuya');
    expect(response.body.data).toHaveProperty('Email', 'okelah@email.com');
  });
});

describe('Login Nasabah (POST)', () => {
  it('Harus login sebagai Nasabah', async () => {
    const response = await request(app)
      .post('/nasabah/login')
      .send({
        Email: 'oke@email.com',
        Password: 'TestPassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
  });
});

describe('Get Nasabah Detail by ID (GET)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Harus menampilkan detail Nasabah dari ID', async () => {
    const nasabahID = 3;

    const response = await request(app)
      .get(`/nasabah/${nasabahID}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data');

    const nasabah = await prisma.nasabah.findUnique({
      where: { NasabahID: nasabahID }
    });
    expect(nasabah).toBeTruthy();
    expect(response.body.data.NasabahID).toBe(nasabahID);
    expect(response.body.data.NamaNasabah).toBe(nasabah.NamaNasabah);
  });
});

describe('Update Nasabah (PUT)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Harus memperbarui Nasabah lewat ID', async () => {
    const nasabahID = 3;

    const response = await request(app)
      .put(`/nasabah/${nasabahID}`)
      .send({
        NamaNasabah: 'Updated ya'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data');

    const updatedNasabah = await prisma.nasabah.findUnique({
      where: { NasabahID: nasabahID }
    });
    expect(updatedNasabah).toBeTruthy();
    expect(updatedNasabah.NamaNasabah).toBe('Updated ya');
  });
});

describe('Delete Nasabah (DELETE)', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('Harus menghapus Nasabah', async () => {
    const nasabahID = 130;

    const response = await request(app)
      .delete(`/nasabah/${nasabahID}`);

    expect(response.body).toHaveProperty('status', true);
    expect(response.body).toHaveProperty('data', null);

    const deletedNasabah = await prisma.nasabah.findUnique({
      where: { NasabahID: nasabahID }
    });
    expect(deletedNasabah).toBeNull();
  });
});
