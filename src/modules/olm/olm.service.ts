import { Injectable } from "@nestjs/common";
import { CreateOlmDto } from "./dto/create-olm.dto";
import { UpdateOlmDto } from "./dto/update-olm.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Olm } from "./entities/olm.entity";
import { Repository } from "typeorm";

@Injectable()
export class OlmService {
  constructor(
    @InjectRepository(Olm)
    private repository: Repository<Olm>,
  ) {}
  create(createOlmDto: CreateOlmDto) {
    return "This action adds a new olm";
  }

 async findAll() {
    let items =await this.repository.find()
    return {items}

  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateOlmDto: UpdateOlmDto) {
    return `This action updates a #${id} olm`;
  }

  remove(id: number) {
    return `This action removes a #${id} olm`;
  }
}
