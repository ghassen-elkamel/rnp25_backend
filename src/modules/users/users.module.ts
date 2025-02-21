import { forwardRef, Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";

import { NotificationsModule } from "../notifications/notifications.module";
import { NotificationTokenModule } from "../notification-token/notification-token.module";
import { UserEventModule } from "../user-event/user-event.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    NotificationTokenModule,
    forwardRef(() => NotificationsModule),
    forwardRef(() => UserEventModule),

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
