import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const accessToken = process.argv[2];

if (!accessToken) {
  console.error('Access token is required');
  process.exit(1);
}

const LIMIT = 50;
const PAGES = 2;

const genres = [
  'rap',
  'rock',
  'pop',
  'country',
  'edm',
  'jazz',
  'classical',
  'indie',
  'rock',
  'r&b',
];

const makeRequest = async (genre, page = 1) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=${LIMIT}&offset=${
      (page - 1) * LIMIT
    }`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
};

const processSongs = (songs) => {
  const uniqueNames = new Set();
  const includedSongs = [];

  songs.forEach((song) => {
    if (uniqueNames.has(song.name)) {
      return;
    }

    uniqueNames.add(song.name);
    includedSongs.push({ name: song.name, id: song.id });
  });

  return { count: includedSongs.length, songs: includedSongs };
};

const createGenre = async (genre) => {
  const existingGenre = await prisma.genre.findUnique({
    where: { value: genre },
  });

  if (existingGenre) {
    console.log('Genre', genre, 'already exists');
    return existingGenre;
  }

  console.log('Creating genre', genre);
  return prisma.genre.create({ data: { value: genre.toLowerCase() } });
};

const createSong = async (song, genre) => {
  const existingSong = await prisma.song.findUnique({
    where: { trackID: song.id },
  });

  if (existingSong) {
    console.log('Song', song.name, 'already exists');
    return existingSong;
  }

  const createdSong = await prisma.song.create({
    data: {
      trackID: song.id,
      genre: { connect: { value: genre } },
    },
    include: { genre: true },
  });
  console.log('Created song', song.name);
  return createdSong;
};

const handleGenre = async (genre, page = 1) => {
  const data = await makeRequest(genre, page);
  const { count, songs } = processSongs(data);

  console.log('Found', count, 'unique songs for genre', genre);

  for (const song of songs) {
    await createSong(song, genre);
  }

  console.log('Finished genre', genre, 'with', count, 'songs');
};

const run = async () => {
  for (const genre of genres) {
    await createGenre(genre);
  }

  for (const genre of genres) {
    for (let page = 1; page <= PAGES; page++) {
      console.log('Processing genre', genre, 'page', page);
      await handleGenre(genre, page);
      console.log('Finished genre', genre, 'page', page);
    }
    console.log('Finished genre', genre);
  }

  console.log('Finished all genres');
};

run();
