import { CreationEntityDto } from "src/common/dto/creation.dto";
import { Event } from "src/modules/events/entities/event.entity";
import { User } from "src/modules/users/entities/user.entity";

export class CreateUserEventDto extends CreationEntityDto {
    userId: number;
    eventId: number;
    uuid: string;
    user :User;
    event:Event;
}
