/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_departmentId_fkey";

-- DropIndex
DROP INDEX "Project_departmentId_idx";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "departmentId",
ADD COLUMN     "previewUrl" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "roles" "Role"[] DEFAULT ARRAY['ENGINEER']::"Role"[];

-- CreateTable
CREATE TABLE "ProjectDepartment" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectDepartment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectDepartment_projectId_idx" ON "ProjectDepartment"("projectId");

-- CreateIndex
CREATE INDEX "ProjectDepartment_departmentId_idx" ON "ProjectDepartment"("departmentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDepartment_projectId_departmentId_key" ON "ProjectDepartment"("projectId", "departmentId");

-- AddForeignKey
ALTER TABLE "ProjectDepartment" ADD CONSTRAINT "ProjectDepartment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDepartment" ADD CONSTRAINT "ProjectDepartment_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
