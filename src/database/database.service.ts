import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DatabaseService {
  users: User[] = [];
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
  }
}
