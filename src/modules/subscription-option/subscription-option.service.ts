import { Injectable } from "@nestjs/common";
import { CreateSubscriptionOptionDto } from "./dto/create-subscription-option.dto";
import { UpdateSubscriptionOptionDto } from "./dto/update-subscription-option.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscriptionOption } from "./entities/subscription-option.entity";
import { Repository } from "typeorm";

@Injectable()
export class SubscriptionOptionService {
  constructor(
    @InjectRepository(SubscriptionOption)
    private readonly repository: Repository<SubscriptionOption>,
  ) {}
  create(createSubscriptionOptionDto: CreateSubscriptionOptionDto) {
    return "This action adds a new subscriptionOption";
  }

  async findAll() {
    let items = await this.repository.find();
    return { items };
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateSubscriptionOptionDto: UpdateSubscriptionOptionDto) {
    return `This action updates a #${id} subscriptionOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriptionOption`;
  }
}
