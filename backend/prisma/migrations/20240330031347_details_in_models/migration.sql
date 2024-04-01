/*
  Warnings:

  - You are about to drop the `Saves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `created_at` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Post` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Saves_post_id_key";

-- DropIndex
DROP INDEX "Saves_user_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Saves";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "SavedPosts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "post_id" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedPosts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedPosts_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author_id" INTEGER NOT NULL,
    "stars" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("author_id", "content", "id", "stars", "title") SELECT "author_id", "content", "id", "stars", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
