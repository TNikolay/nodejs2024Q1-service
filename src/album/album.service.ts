import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (album) return album;
    throw new NotFoundException('Album not found');
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
      return album;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Album not found');
      else throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Album not found');
      else throw error;
    }

    // for (const track of this.db.tracks)
    //   if (track.albumId === id) track.albumId = null;
  }
}
