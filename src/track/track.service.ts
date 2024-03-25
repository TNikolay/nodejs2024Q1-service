import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (track) return track;
    throw new NotFoundException('Album not found');
  }

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
      return track;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      )
        throw new NotFoundException('Track not found');
      else throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.track.delete({ where: { id } });
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
