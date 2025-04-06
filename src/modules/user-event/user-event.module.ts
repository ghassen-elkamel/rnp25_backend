import { forwardRef, Module } from "@nestjs/common";
import { UserEventService } from "./user-event.service";
import { UserEventController } from "./user-event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEvent } from "./entities/user-event.entity";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/users.module";
import { EventsModule } from "../events/events.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserEvent]), forwardRef(() => UsersModule), EventsModule],
  controllers: [UserEventController],
  providers: [UserEventService],
  exports: [UserEventService],
})
export class UserEventModule {}
