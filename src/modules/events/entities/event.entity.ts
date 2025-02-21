import { CreationEntity } from "src/common/entities/creation.entity";
import { Company } from "src/modules/company/entities/company.entity";
import { UserEvent } from "src/modules/user-event/entities/user-event.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
@Entity()
export class Event extends CreationEntity{
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    startDate: Date
    @Column()
    endDate: Date
    @Column({
        nullable:true
    })
    location: string;
    @Column({nullable:true})
    pathPicture :string
    @ManyToOne(()=>Company,(company=>company.events))
    @JoinColumn()
    company:Company
    @OneToMany(()=>UserEvent,(userEvent=>userEvent.event))
    users:UserEvent[]


    

}
