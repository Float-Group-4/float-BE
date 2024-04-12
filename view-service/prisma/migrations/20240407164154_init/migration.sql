-- CreateTable
CREATE TABLE "View" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "personal" BOOLEAN NOT NULL,
    "settings" JSONB NOT NULL,
    "filters" JSONB NOT NULL,
    "pinned" BOOLEAN NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER NOT NULL,
    "modified_by" INTEGER NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);
