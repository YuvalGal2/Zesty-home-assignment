import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { readFileSync, writeFileSync } from 'fs';
import * as AWS from 'aws-sdk';
import { join } from "path";
@Injectable()
export class ExtractorService {
  // you can supply it directly or it will be default of regions.txt
  private readonly regionsFile = process.argv[2] || 'regions.txt';

  private async getRegions(): Promise<string[]> {
    // read from the file
    try {
      const content = join(__dirname, '../../assets/', `${this.regionsFile}`);
      return content.split(',').map((region) => region.trim());
    } catch (e) {
      throw new HttpException('region file was not found!', 404);
    }
    // split by commas and for each one trim the spaces if there are any.
  }

  // helper function
  dateTimeConverter(obj: any): any {
    if (obj instanceof DateTime || obj instanceof Date) {
      return obj.toISO();
    }
    throw new TypeError(`Type ${typeof obj} is not serializable`);
  }

  async extractData(): Promise<void> {
    const regions = await this.getRegions();
    if (!regions || regions.length === 0) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    const ec2 = new AWS.EC2({ endpoint: 'http://localhost:4000' });
    for (const region of regions) {
      // the below code is the sdk way of filtering instances by params, in our case - region.
      const instances = await ec2
        .describeInstances({
          Filters: [{ Name: 'region-name', Values: [region] }],
        })
        .promise();
      // using promise() to work with the data and not the AWS.Request

      // flatting it one level
      const sortedInstances = instances.Reservations.flatMap(
        (reservation) =>
          // looping over it and converting the time for each instance.
          reservation.Instances.map((instance) => {
            instance.LaunchTime = this.dateTimeConverter(instance.LaunchTime);
            return instance; // returning the modifyed object.
          }),
        // sorting it.
      ).sort((a, b) => a.LaunchTime.getTime() - b.LaunchTime.getTime());
      const filename = `${region}.json`;
      const data = JSON.stringify(sortedInstances);
      writeFileSync(filename, data);
    }
  }
}
