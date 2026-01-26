import { http, HttpResponse } from 'msw';

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
    { id: '3', title: 'Fake Song 3', artist: 'Fake Artist 3', genre: 'Jazz', duration: 240 },
];

const fakeSongDetails: Record<string, Song> = {
    '1': {
        id: '1',
        title: 'Fake Song 1',
        artist: 'Fake Artist 1',
        genre: 'Pop',
        duration: 180,
        song: '/songs/fake-song-1.mp3',
        cover: '/covers/fake-cover-1.jpg',
    },
    '2': {
        id: '2',
        title: 'Fake Song 2',
        artist: 'Fake Artist 2',
        genre: 'Rock',
        duration: 200,
        song: '/songs/fake-song-2.mp3',
        cover: '/covers/fake-cover-2.jpg',
    },
    '3': {
        id: '3',
        title: 'Fake Song 3',
        artist: 'Fake Artist 3',
        genre: 'Jazz',
        duration: 240,
        song: '/songs/fake-song-3.mp3',
        cover: '/covers/fake-cover-3.jpg',
    },
};

export const handlers = [
    http.get('/api/v1/playlist', () => {
        return HttpResponse.json(fakePlaylist, { status: 200 });
    }),

    http.get('/api/v1/songs/:id', ({ params }) => {
        const { id } = params;
        const song = fakeSongDetails[id as string] || fakeSongDetails['1'];
        return HttpResponse.json(song, { status: 200 });
    }),
];
