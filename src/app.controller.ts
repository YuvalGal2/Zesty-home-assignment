import { Controller, Get } from '@nestjs/common';
import { ExtractorService } from './services/extractor/extractor.service';

@Controller()
export class AppController {
  constructor(private readonly extractorService: ExtractorService) {}

  @Get()
  extractData(): Promise<any> {
    return this.extractorService.extractData();
  }
}
