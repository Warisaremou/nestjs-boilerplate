import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FollowService } from './follow.service';

@ApiTags('Follow')
@Controller({
  path: 'follow',
  version: '1',
})
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Get()
  findAll() {
    return this.followService.findAll();
  }
}
