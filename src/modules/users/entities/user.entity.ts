import { AbstractEntity } from "src/common/entities/abstract.entity";
import { Role } from "src/modules/users/entities/role.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

import { NotificationToken } from "src/modules/notification-token/entities/notification-token.entity";
import { Company } from "src/modules/company/entities/company.entity";
import { UserEvent } from "src/modules/user-event/entities/user-event.entity";
import { SubscirptionForm } from "src/modules/subscirption_form/entities/subscirption_form.entity";

@Entity()
export class User extends AbstractEntity {
  @ManyToOne((type) => Role)
  @JoinColumn({ name: "role" })
  role: Role;

  @Column({ select: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ default: "" })
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column()
  countryCode: string;

  @Column({ nullable: true })
  pathPicture: string;

  @Column()
  isVerified: boolean;

  @Column()
  isActive: boolean;

  @Column()
  isBlocked: boolean;
  @OneToOne(() => Company, (company) => company.supervisor)
  company: Company;

  @OneToMany((type) => NotificationToken, (notificationToken) => notificationToken.user)
  notificationToken: NotificationToken[];

  @Column({ default: "en" })
  language: string;
  @OneToOne(() => SubscirptionForm, (SubscirptionForm) => SubscirptionForm.user)
  subscirptionForm: SubscirptionForm[];

  @OneToMany(() => UserEvent, (userEvent) => userEvent.user)
  events: UserEvent[];
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(userId?: number) {
    super();
    this.id = userId;
  }
  public toString(): string {
    return this.fullName;
  }
}
