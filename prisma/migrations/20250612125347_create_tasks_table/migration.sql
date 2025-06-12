-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "task_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_completed" TEXT NOT NULL,
    "Isdeleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
