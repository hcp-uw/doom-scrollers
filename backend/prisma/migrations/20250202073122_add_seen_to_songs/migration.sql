-- CreateTable
CREATE TABLE "_SongSeenBy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_SongSeenBy_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_SongSeenBy_B_index" ON "_SongSeenBy"("B");

-- AddForeignKey
ALTER TABLE "_SongSeenBy" ADD CONSTRAINT "_SongSeenBy_A_fkey" FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongSeenBy" ADD CONSTRAINT "_SongSeenBy_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
