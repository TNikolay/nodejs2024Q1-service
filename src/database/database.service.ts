import { Injectable } from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Track } from '../track/entities/track.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  favs: {
    artists: Set<string>; // favorite artists ids
    albums: Set<string>; // favorite albums ids
    tracks: Set<string>; // favorite tracks ids
  } = {
    artists: new Set<string>(),
    albums: new Set<string>(),
    tracks: new Set<string>(),
  };

  constructor() {
    this.fillTestData();
  }

  fillTestData() {
    this.users = [
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000001',
        login: '1',
        password: '1',
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000002',
        login: '2',
        password: '2',
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ];

    this.tracks = [
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000001',
        name: '1',
        artistId: null,
        albumId: null,
        duration: 1,
      },
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000002',
        name: '2',
        artistId: null,
        albumId: null,
        duration: 2,
      },
    ];

    this.artists = [
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000001',
        name: '1',
        grammy: true,
      },
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000002',
        name: '2',
        grammy: false,
      },
    ];

    this.albums = [
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000001',
        name: '1',
        year: 1,
        artistId: null,
      },
      {
        id: 'b47ee57c-51e9-4de0-8c64-000000000002',
        name: '2',
        year: 2,
        artistId: null,
      },
    ];
  }
}
