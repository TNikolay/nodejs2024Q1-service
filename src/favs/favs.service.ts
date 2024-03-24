import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from '../album/entities/album.entity';
import { Artist } from '../artist/entities/artist.entity';
import { DatabaseService } from '../database/database.service';
import { Track } from '../track/entities/track.entity';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  static FAVS_ID_NAME = '*';

  async findAll() {
    return this.prisma.favorites.findUnique({
      where: { id: FavsService.FAVS_ID_NAME },
      include: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
  }

  async addAlbum(id: string) {
    try {
      const res = await this.prisma.album.update({
        where: { id },
        data: { favoritesId: FavsService.FAVS_ID_NAME },
      });
      return `Album "${res.name}" added to favs`;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnprocessableEntityException('Album not found');
      else throw error;
    }
  }

  async removeAlbum(id: string) {
    try {
      const currentStatus = await this.prisma.album.findUnique({
        where: { id },
        select: { favoritesId: true },
      });

      if (!currentStatus.favoritesId)
        throw new NotFoundException('Album not found');

      await this.prisma.album.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Track not found');
      else throw error;
    }
  }

  async addArtist(id: string) {
    try {
      const res = await this.prisma.artist.update({
        where: { id },
        data: { favoritesId: FavsService.FAVS_ID_NAME },
      });
      return `Artist "${res.name}" added to favs`;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnprocessableEntityException('Artist not found');
      else throw error;
    }
  }

  async removeArtist(id: string) {
    try {
      const currentStatus = await this.prisma.artist.findUnique({
        where: { id },
        select: { favoritesId: true },
      });

      if (!currentStatus.favoritesId)
        throw new NotFoundException('Artist not found');

      await this.prisma.artist.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Artist not found');
      else throw error;
    }
  }

  async addTrack(id: string) {
    try {
      const res = await this.prisma.track.update({
        where: { id },
        data: { favoritesId: FavsService.FAVS_ID_NAME },
      });
      return `Track "${res.name}" added to favs`;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new UnprocessableEntityException('Track not found');
      else throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      const currentStatus = await this.prisma.track.findUnique({
        where: { id },
        select: { favoritesId: true },
      });

      if (!currentStatus.favoritesId)
        throw new NotFoundException('Track not found');

      await this.prisma.track.update({
        where: { id },
        data: { favoritesId: null },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Track not found');
      else throw error;
    }
  }
}
