import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-custom";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";

import { UserEntity } from "../../user/user.entity";
import { UserService } from "../../user/user.service";
import { IMetamaskDto } from "../interfaces";

@Injectable()
export class MetamaskStrategy extends PassportStrategy(Strategy, "metamask") {
  static key = "metamask";

  constructor(private readonly userService: UserService) {
    super();
  }

  public async validate(req: Request<any, any, IMetamaskDto>): Promise<UserEntity> {
    const { signature, wallet, nonce } = req.body;

    if (!this.validateSignature(nonce, signature, wallet.toLowerCase())) {
      throw new UnauthorizedException("signatureDoesNotMatch");
    }

    let userEntity = await this.userService.findOne({ wallet: wallet.toLowerCase() });

    if (!userEntity) {
      userEntity = await this.userService.create({ wallet: wallet.toLowerCase() });
    }

    return userEntity;
  }

  public validateSignature(nonce: string, signature: string, wallet: string): boolean {
    const recovered = recoverPersonalSignature({
      data: `0x${Buffer.from(nonce).toString("hex")}`,
      signature,
    });

    return recovered === wallet;
  }
}
