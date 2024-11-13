/*
  Warnings:

  - You are about to drop the column `type` on the `BlogPost` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- Step 1: Alter BlogPost table to remove the old "type" column and add the "typeId" column as NULLABLE initially
ALTER TABLE "BlogPost" 
DROP COLUMN "type",
ADD COLUMN "typeId" INTEGER;

-- Step 2: Create the BlogType table if it doesn't exist
CREATE TABLE IF NOT EXISTS "BlogType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BlogType_pkey" PRIMARY KEY ("id")
);

-- Step 3: Insert a new row into BlogType with the name 'post'
INSERT INTO "BlogType" ("name") VALUES ('post')
ON CONFLICT DO NOTHING;  -- Ensures no duplicate rows if 'post' already exists

-- Step 4: Retrieve the ID of the newly added 'post' row and update BlogPost typeId
DO $$
DECLARE
    postTypeId INTEGER;
BEGIN
    -- Capture the ID of the 'post' row (assuming 'post' name is unique)
    SELECT "id" INTO postTypeId FROM "BlogType" WHERE "name" = 'post';

    -- Update all BlogPost entries to set typeId to the postTypeId
    UPDATE "BlogPost" SET "typeId" = postTypeId;
END $$;

-- Step 5: Alter the typeId column to NOT NULL after populating it
ALTER TABLE "BlogPost" 
ALTER COLUMN "typeId" SET NOT NULL;

-- Step 6: Add a foreign key constraint to enforce the relationship between BlogPost and BlogType
ALTER TABLE "BlogPost" 
ADD CONSTRAINT "BlogPost_typeId_fkey" 
FOREIGN KEY ("typeId") 
REFERENCES "BlogType"("id") 
ON DELETE RESTRICT 
ON UPDATE CASCADE;
