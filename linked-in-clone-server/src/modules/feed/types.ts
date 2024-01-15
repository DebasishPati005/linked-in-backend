import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from '../user/types';

export class FeedPostResponse {
  @ApiProperty()
  body: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  author: UserResponse;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}
