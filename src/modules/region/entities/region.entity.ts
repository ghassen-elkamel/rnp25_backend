import { Country } from "src/modules/country/entities/country.entity";
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";

@Entity()
export class Region {
  @PrimaryColumn()
  public id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  nameSecondary: string;

  @Column({ length: 100 })
  nameThird: string;

  @ManyToOne((type) => Country)
  country: Country;

  @Column()
  countryId: number;
}
