import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAllNews(): string[] {
    return [
      'test 1',
      'test 2'
    ];
  }
}
