import { Inject, Logger, LoggerService, UseGuards } from "@nestjs/common";
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { User } from "./decorators/user";
import { UserEntity } from "../user/user.entity";
import { FirebaseWsGuard } from "../common/guards";

@UseGuards(FirebaseWsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(Logger) private readonly loggerService: LoggerService) {}

  @SubscribeMessage("profile")
  plain(@User() userEntity: UserEntity): UserEntity {
    return userEntity;
  }

  public afterInit(): void {
    this.loggerService.log("Init", EventGateway.name);
  }
}
