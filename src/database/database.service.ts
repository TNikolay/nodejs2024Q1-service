import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
  tracks: Track[] = [];

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
  }
}
