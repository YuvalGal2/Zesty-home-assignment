import { Controller, Get, Param } from '@nestjs/common';
import { Ec2DataService } from '../../services/ec2-data/ec2-data.service';

@Controller('instances')
export class Ec2InstanceController {
  constructor(private ec2DataService: Ec2DataService) {}
  @Get(':region')
  getEc2Instances(@Param('region') region: string):any {
    return this.ec2DataService.getEc2Instances(region);
  }
}
