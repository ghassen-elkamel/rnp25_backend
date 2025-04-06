import { CreationEntity } from "src/common/entities/creation.entity";
import { PositionType } from "src/enums/position-type.enum";
import { RoomType } from "src/enums/room-tyoe.enum";
import { Olm } from "src/modules/olm/entities/olm.entity";
import { SubscriptionOption } from "src/modules/subscription-option/entities/subscription-option.entity";
import { User } from "src/modules/users/entities/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class SubscirptionForm extends CreationEntity {
  @OneToOne(() => User, (user) => user.subscirptionForm)
  @JoinColumn()
  user: User;
  @Column()
  positionType: PositionType;

  @Column()
  positionTitle: string;
  @ManyToOne(() => Olm, (olm) => olm.susbcriptionForms)
  @JoinColumn()
  olm: Olm;
  @ManyToOne(() => SubscriptionOption, (subscriptionOption) => subscriptionOption.subscirptionForms)
  @JoinColumn()
  subscriptionOption: SubscriptionOption;
  @Column({ nullable: true })
  pathReciept: string;
  @Column({ unique:true })
  uuid: string;
  @Column()
  roomType: RoomType;
  
 @Column()
  roommates: String ;
}
