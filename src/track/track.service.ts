import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { randomUUID } from 'crypto';
import { DatabaseService } from '../database/database.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return plainToInstance(Track, this.db.tracks);
  }

  findOne(id: string) {
    const track = this.db.tracks.find((v) => v.id === id);
    if (track) return plainToInstance(Track, track);
    throw new NotFoundException('Track not found');
  }

  create(createTrackDto: CreateTrackDto) {
    const track: Track = { id: randomUUID(), ...createTrackDto };
    if (track.albumId === undefined) track.albumId = null;
    if (track.artistId === undefined) track.artistId = null;

    this.db.tracks.push(track);
    return plainToInstance(Track, track);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.db.tracks.find((v) => v.id === id);
    if (!track) throw new NotFoundException('Track not found');

    track.name = updateTrackDto.name;
    track.albumId = updateTrackDto.albumId ? updateTrackDto.albumId : null;
    track.artistId = updateTrackDto.artistId ? updateTrackDto.artistId : null;
    track.duration = updateTrackDto.duration;

    return plainToInstance(Track, track);
  }

  remove(id: string) {
    const index = this.db.tracks.findIndex((v) => v.id === id);
    if (index === -1) throw new NotFoundException('Track not found');
    this.db.tracks.splice(index, 1);
  }
}
