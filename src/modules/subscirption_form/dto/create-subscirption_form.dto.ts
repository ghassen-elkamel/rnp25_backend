import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty } from "class-validator";
import { Subscription } from "rxjs";
import { PositionType } from "src/enums/position-type.enum";
import { Olm } from "src/modules/olm/entities/olm.entity";
import { SubscriptionOption } from "src/modules/subscription-option/entities/subscription-option.entity";
import { CreateUserDto } from "src/modules/users/dto/create-user.dto";
import { User } from "src/modules/users/entities/user.entity";

export class CreateSubscirptionFormDto  {
    @ApiProperty()
    createUserDto: CreateUserDto;
    @ApiProperty()
    postionType: PositionType;
    @ApiProperty()
    postionTitle: string;
    @ApiProperty()
    subscriptionTypeId: number;
    @ApiProperty()
    olmId: number;
    olm:Olm;
    user :User
subscriptionOption:SubscriptionOption
pathReciept:string

    

}
