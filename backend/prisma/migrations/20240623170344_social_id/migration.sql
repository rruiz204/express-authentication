-- AlterTable
ALTER TABLE "User" ADD COLUMN     "github_id" INTEGER,
ADD COLUMN     "google_id" INTEGER,
ALTER COLUMN "password" DROP NOT NULL;
