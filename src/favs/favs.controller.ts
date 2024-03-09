import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('album/:id')
  createAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addAlbum(id);
  }

  @HttpCode(204)
  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  createArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addArtist(id);
  }

  @HttpCode(204)
  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeArtist(id);
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.addTrack(id);
  }

  @HttpCode(204)
  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favsService.removeTrack(id);
  }
}
