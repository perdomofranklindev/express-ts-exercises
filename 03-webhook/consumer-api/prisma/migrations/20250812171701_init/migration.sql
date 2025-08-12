-- CreateTable
CREATE TABLE "EnvironmentEnv" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "secretKey" TEXT NOT NULL,
    "provider" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "EnvironmentEnv_name_key" ON "EnvironmentEnv"("name");
