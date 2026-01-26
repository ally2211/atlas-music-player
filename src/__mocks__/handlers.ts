import { http } from 'msw';

interface Song {
    id: string;
    title: string;
    artist: string;
    genre: string;
    duration: number;
    song?: string;
    cover?: string;
}

const fakePlaylist: Song[] = [
    { id: '1', title: 'Fake Song 1', artist: 'Fake Artist 1', genre: 'Pop', duration: 180 },
    { id: '2', title: 'Fake Song 2', artist: 'Fake Artist 2', genre: 'Rock', duration: 200 },
];

const fakeSongDetail: Song = {
    id: '1',
    title: 'Fake Song 1',
    artist: 'Fake Artist 1',
    genre: 'Pop',
    duration: 180,
    song: '/songs/fake-song-1.mp3',
    cover: '/covers/fake-cover-1.jpg',
};

export const handlers = [
    http.get('/api/v1/playlist', () => {
        return Response.json(fakePlaylist, { status: 200 });
    }),

    http.get('/api/v1/songs/:id', ({ params }) => {
        const { id } = params;
        const song = fakePlaylist.find((s) => s.id === id) || fakeSongDetail;
        return Response.json(song, { status: 200 });
    }),
];
