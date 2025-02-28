import { CreationEntity } from "src/common/entities/creation.entity";
import { PositionType } from "src/enums/position-type.enum";
import { Olm } from "src/modules/olm/entities/olm.entity";
import { SubscriptionOption } from "src/modules/subscription-option/entities/subscription-option.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
@Entity()
export class SubscirptionForm extends CreationEntity {
  @ManyToOne(() => User, (user) => user.subscirptionForm)
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
}
