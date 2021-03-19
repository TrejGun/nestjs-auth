import {Module, Logger} from "@nestjs/common";

import {EventGateway} from "./event.gateway";

@Module({
  providers: [Logger, EventGateway],
})
export class EventModule {}
