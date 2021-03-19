import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserService} from "./user.service";
import {UserEntity} from "./user.entity";
import {UserResolver} from "./user.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
