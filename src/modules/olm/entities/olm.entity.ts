import { AbstractEntity } from "src/common/entities/abstract.entity";
import { CreationEntity } from "src/common/entities/creation.entity";
import { zone } from "src/enums/zone.enum";
import { SubscirptionForm } from "src/modules/subscirption_form/entities/subscirption_form.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
@Entity()
export class Olm extends AbstractEntity {
  @Column()
  zone: zone;
@Column()
  name: string;
  @OneToMany(() => SubscirptionForm, (SubscirptionForm) => SubscirptionForm.olm)
  susbcriptionForms: SubscirptionForm[];
}
