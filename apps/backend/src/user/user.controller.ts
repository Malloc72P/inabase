import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { UserService } from './user.service';
import { ProfileResult, UpdateProfileInput, UpdateProfileOutput } from '@repo/dto';
import { IRequester, Requester } from '@src/util/user-decorator';
import { transformTo } from '@src/util/transformer.util';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Requester() requester: IRequester,
    @Body() { name }: UpdateProfileInput
  ): Promise<UpdateProfileOutput> {
    const { user } = await this.userService.findByIdOrThrow({ id: requester.id });

    return { profile: transformTo(ProfileResult, user) };
  }
}
