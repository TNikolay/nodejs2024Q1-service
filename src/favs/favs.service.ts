import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { DatabaseService } from '../database/database.service';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class FavsService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    const albums: Album[] = [];
    for (const item of this.db.favs.albums) {
      const album = this.db.albums.find((v) => v.id === item);
      if (album) albums.push(album);
    }

    const artists: Artist[] = [];
    for (const item of this.db.favs.artists) {
      const artist = this.db.artists.find((v) => v.id === item);
      if (artist) artists.push(artist);
    }

    const tracks: Track[] = [];
    for (const item of this.db.favs.tracks) {
      const track = this.db.tracks.find((v) => v.id === item);
      if (track) tracks.push(track);
    }

    return { artists, albums, tracks };
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((v) => v.id === id);
    if (!album) throw new UnprocessableEntityException('Album not found');
    this.db.favs.albums.add(id);
    return `Album "${album.name}" added to favs`;
  }

  removeAlbum(id: string) {
    const res = this.db.favs.albums.delete(id);
    if (!res) throw new NotFoundException('Album not found');
    return `Album ${id} was removed from favs`;
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((v) => v.id === id);
    if (!artist) throw new UnprocessableEntityException('Artist not found');
    this.db.favs.artists.add(id);
    return `Artist "${artist.name}" added to favs`;
  }

  removeArtist(id: string) {
    const res = this.db.favs.artists.delete(id);
    if (!res) throw new NotFoundException('Artist not found');
    return `Artist ${id} was removed from favs`;
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((v) => v.id === id);
    if (!track) throw new UnprocessableEntityException('Track not found');
    this.db.favs.tracks.add(id);
    return `Track "${track.name}" added to favs`;
  }

  removeTrack(id: string) {
    const res = this.db.favs.tracks.delete(id);
    if (!res) throw new NotFoundException('Track not found');
    return `Track ${id} was removed from favs`;
  }
}
