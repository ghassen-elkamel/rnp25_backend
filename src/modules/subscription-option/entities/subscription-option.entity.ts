import { CreationEntity } from "src/common/entities/creation.entity";
import { SubscirptionForm } from "src/modules/subscirption_form/entities/subscirption_form.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class SubscriptionOption extends CreationEntity {
    @Column()
    subscriptionType: String;
    @Column(
        {type: 'decimal', precision: 10, scale: 2}
    )
    price: number;
    @OneToMany(()=>SubscirptionForm, (subscirptionForm)=>subscirptionForm.subscriptionOption)
@JoinColumn()
    subscirptionForms: SubscirptionForm[];
  

}
