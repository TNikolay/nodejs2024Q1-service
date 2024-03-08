import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return plainToInstance(Album, this.db.albums);
  }

  findOne(id: string) {
    const album = this.db.albums.find((v) => v.id === id);
    console.log('id : ', id, album);
    if (album) return plainToInstance(Album, album);
    throw new NotFoundException('Album not found');
  }

  create(createAlbumDto: CreateAlbumDto) {
    const album: Album = { id: randomUUID(), ...createAlbumDto };
    if (album.artistId === undefined) album.artistId = null;

    this.db.albums.push(album);
    return plainToInstance(Album, album);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.db.albums.find((v) => v.id === id);
    if (!album) throw new NotFoundException('Album not found');

    album.name = updateAlbumDto.name;
    album.artistId = updateAlbumDto.artistId ? updateAlbumDto.artistId : null;
    album.year = updateAlbumDto.year;

    return plainToInstance(Album, album);
  }

  remove(id: string) {
    const index = this.db.albums.findIndex((v) => v.id === id);
    if (index === -1) throw new NotFoundException('Album not found');

    this.db.albums.splice(index, 1);
    for (const track of this.db.tracks)
      if (track.albumId === id) track.albumId = null;
  }
}
