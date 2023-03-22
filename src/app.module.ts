import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Ec2DataService } from './services/ec2-data/ec2-data.service';
import { Ec2InstanceController } from './controllers/ec2-instance/ec2-instance.controller';
import { ExtractorModule } from './extractor/extractor.module';

@Module({
  imports: [ExtractorModule],
  controllers: [AppController, Ec2InstanceController],
  providers: [Ec2DataService],
})
export class AppModule {}
