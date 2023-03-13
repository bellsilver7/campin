import { Controller, Get, Render } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
