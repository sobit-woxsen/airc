-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "issue" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "topics" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Newsletter_issue_key" ON "Newsletter"("issue");

-- CreateIndex
CREATE INDEX "Newsletter_issue_idx" ON "Newsletter"("issue");

-- CreateIndex
CREATE INDEX "Newsletter_featured_idx" ON "Newsletter"("featured");

-- CreateIndex
CREATE INDEX "Newsletter_published_idx" ON "Newsletter"("published");

-- CreateIndex
CREATE INDEX "Newsletter_createdById_idx" ON "Newsletter"("createdById");

-- AddForeignKey
ALTER TABLE "Newsletter" ADD CONSTRAINT "Newsletter_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
