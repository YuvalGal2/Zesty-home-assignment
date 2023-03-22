import { Module } from '@nestjs/common';
import { ExtractorService } from '../services/extractor/extractor.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ExtractorService],
  exports: [ExtractorService],
})
export class ExtractorModule {}
