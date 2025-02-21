import { CreationEntity } from "src/common/entities/creation.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from "typeorm";
import { Event } from "../../events/entities/event.entity";
@Entity()
export class UserEvent extends CreationEntity{
    @ManyToOne(()=>User, user=>user.events)
    @JoinColumn()
    user:User
    @ManyToOne(()=>Event, event=>event.users)
    @JoinColumn()
    event:Event
    @Column()
    uuid:string
}
