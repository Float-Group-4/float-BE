-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "estimatedHours" DOUBLE PRECISION NOT NULL,
    "assigneeId" INTEGER NOT NULL,
    "assigneeName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'To Do',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_title_key" ON "Task"("title");
