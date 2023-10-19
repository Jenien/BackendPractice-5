-- CreateTable
CREATE TABLE "Nasabah" (
    "NasabahID" SERIAL NOT NULL,
    "NamaNasabah" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,

    CONSTRAINT "Nasabah_pkey" PRIMARY KEY ("NasabahID")
);

-- CreateTable
CREATE TABLE "Akun_bank" (
    "AkunID" SERIAL NOT NULL,
    "Saldo" INTEGER NOT NULL,
    "NasabahID" INTEGER NOT NULL,

    CONSTRAINT "Akun_bank_pkey" PRIMARY KEY ("AkunID")
);

-- CreateTable
CREATE TABLE "Transaksi" (
    "TransaksiID" SERIAL NOT NULL,
    "JenisTransaksi" TEXT NOT NULL,
    "Jumlah" INTEGER NOT NULL,
    "AkunID" INTEGER NOT NULL,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("TransaksiID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nasabah_Email_key" ON "Nasabah"("Email");

-- AddForeignKey
ALTER TABLE "Akun_bank" ADD CONSTRAINT "Akun_bank_NasabahID_fkey" FOREIGN KEY ("NasabahID") REFERENCES "Nasabah"("NasabahID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaksi" ADD CONSTRAINT "Transaksi_AkunID_fkey" FOREIGN KEY ("AkunID") REFERENCES "Akun_bank"("AkunID") ON DELETE RESTRICT ON UPDATE CASCADE;
