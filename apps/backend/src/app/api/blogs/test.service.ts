import { Injectable } from '@nestjs/common';
import { CreateAnything } from '@finalproject/dtos';
@Injectable()
export class TestService {
  async testing(body: CreateAnything) {
    return 'null';
  }
}
