import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/auth.guard';
import { UserService } from './user.service';
import {
  ProfileResultSchema,
  UpdateProfileInput,
  UpdateProfileInputSchema,
  UpdateProfileOutput,
} from '@repo/dto';
import { IRequester, Requester } from '@src/util/user-decorator';
import { transformTo } from '@src/util/transformer.util';
import { ZodInput } from '@src/util/zod-validation.pipe';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ZodInput(UpdateProfileInputSchema)
  async updateProfile(
    @Requester() requester: IRequester,
    @Param('id') id: string,
    @Body() { name }: UpdateProfileInput
  ): Promise<UpdateProfileOutput> {
    const { user } = await this.userService.updateProfile({
      id,
      name,
      requester,
    });

    return { profile: transformTo(ProfileResultSchema, user) };
  }
}
