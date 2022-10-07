import { Request, Response } from 'express';
import { Controller, Get } from '../../Shared/infrastructure/decorators/Routes';

@Controller('/api')
export default class Api {

  @Get('/')
  async getStatus(_req: Request, res: Response) {
    try {
      return res.sendStatus(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  }

}