import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { plainToInstance } from 'class-transformer';
import { Artist } from './entities/artist.entity';
import { DatabaseService } from '../database/database.service';
import { randomUUID } from 'crypto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return plainToInstance(Artist, this.db.artists);
  }

  findOne(id: string) {
    const artist = this.db.artists.find((v) => v.id === id);
    if (artist) return plainToInstance(Artist, artist);
    throw new NotFoundException('Artist not found');
  }

  create(createArtistDto: CreateArtistDto) {
    const artist: Artist = { id: randomUUID(), ...createArtistDto };
    this.db.artists.push(artist);
    return plainToInstance(Artist, artist);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.db.artists.find((v) => v.id === id);
    if (!artist) throw new NotFoundException('Artist not found');

    artist.name = updateArtistDto.name;
    artist.grammy = updateArtistDto.grammy;
    return plainToInstance(Artist, artist);
  }

  remove(id: string) {
    const index = this.db.artists.findIndex((v) => v.id === id);
    if (index === -1) throw new NotFoundException('Artist not found');

    this.db.artists.splice(index, 1);
    for (const track of this.db.tracks)
      if (track.artistId === id) track.artistId = null;
    for (const album of this.db.albums)
      if (album.artistId === id) album.artistId = null;
  }
}
