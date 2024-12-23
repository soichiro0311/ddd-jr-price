-- CreateTable
CREATE TABLE "Reservation" (
    "id" VARCHAR(255) NOT NULL,
    "roundTripType" TEXT NOT NULL,
    "departureStation" TEXT NOT NULL,
    "destinationStation" TEXT NOT NULL,
    "passengerCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasicFare" (
    "id" VARCHAR(255) NOT NULL,
    "reservationId" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BasicFare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasicFare" ADD CONSTRAINT "BasicFare_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
