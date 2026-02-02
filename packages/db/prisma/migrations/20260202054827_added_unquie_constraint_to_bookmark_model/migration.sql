/*
  Warnings:

  - A unique constraint covering the columns `[blogId,userId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_blogId_userId_key" ON "Bookmark"("blogId", "userId");
