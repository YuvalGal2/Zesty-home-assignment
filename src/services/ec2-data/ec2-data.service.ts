import { HttpException, Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
@Injectable()
export class Ec2DataService {
  getEc2Instances(region: string) {
    const filePath = join(__dirname, '../../assets/', `${region}.txt`);
    try {
      const fileContent = readFileSync(filePath, { encoding: 'utf-8' });
      return JSON.stringify(fileContent);
    } catch (e) {
      throw new HttpException('File not found!', 404);
    }
  }
}
