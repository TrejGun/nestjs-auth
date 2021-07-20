import { Inject, Logger, LoggerService, UseGuards } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from "@nestjs/websockets";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Server, Socket } from "socket.io";

import { Public } from "../common/decorators";
import { UserEntity } from "../user/user.entity";
import { JwtWsGuard } from "./guards/jwt";
import { User } from "./decorators/user";

@UseGuards(JwtWsGuard)
@WebSocketGateway()
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(Logger) private readonly loggerService: LoggerService) {}

  @Public()
  @SubscribeMessage("events")
  observable(): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: "events", data: item })));
  }

  @Public()
  @SubscribeMessage("identity")
  promise(@MessageBody() data: number): Promise<number> {
    return Promise.resolve(data);
  }

  @SubscribeMessage("profile")
  plain(@User() userEntity: UserEntity): UserEntity {
    return userEntity;
  }

  public afterInit(): void {
    this.loggerService.log("Init", EventGateway.name);
  }

  public handleDisconnect(client: Socket): void {
    this.loggerService.log(`Client disconnected: ${client.id}`, EventGateway.name);
  }

  public handleConnection(client: Socket): void {
    this.loggerService.log(`Client connected: ${client.id}`, EventGateway.name);
  }
}
