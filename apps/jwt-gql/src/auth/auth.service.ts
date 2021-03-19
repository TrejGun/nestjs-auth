import {Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindConditions, DeleteResult} from "typeorm";
import {v4} from "uuid";

import {UserService} from "../user/user.service";
import {UserEntity} from "../user/user.entity";
import {IAuth, ILoginFields} from "./interfaces";
import {AuthEntity} from "./auth.entity";
import {accessTokenExpiresIn, refreshTokenExpiresIn} from "./auth.constants";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authEntityRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(data: ILoginFields): Promise<IAuth> {
    const userEntity = await this.userService.getByCredentials(data.email, data.password);

    if (!userEntity) {
      throw new UnauthorizedException();
    }

    return this.loginUser(userEntity);
  }

  public async delete(where: FindConditions<AuthEntity>): Promise<DeleteResult> {
    return this.authEntityRepository.delete(where);
  }

  public async refresh(where: FindConditions<AuthEntity>): Promise<IAuth> {
    const authEntity = await this.authEntityRepository.findOne({where, relations: ["user"]});

    if (!authEntity || authEntity.refreshTokenExpiresAt > new Date().getTime()) {
      throw new UnauthorizedException();
    }

    return this.loginUser(authEntity.user);
  }

  public async loginUser(user: UserEntity): Promise<IAuth> {
    const refreshToken = v4();
    const date = new Date();

    await this.authEntityRepository
      .create({
        user,
        refreshToken,
        accessTokenExpiresAt: date.getTime() + accessTokenExpiresIn,
        refreshTokenExpiresAt: date.getTime() + refreshTokenExpiresIn,
      })
      .save();

    return {
      accessToken: this.jwtService.sign({email: user.email}, {expiresIn: accessTokenExpiresIn / 1000}),
      refreshToken: refreshToken,
      accessTokenExpiresAt: date.getTime() + accessTokenExpiresIn,
      refreshTokenExpiresAt: date.getTime() + refreshTokenExpiresIn,
    };
  }
}
