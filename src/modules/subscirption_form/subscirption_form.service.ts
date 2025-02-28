import { Injectable } from '@nestjs/common';
import { CreateSubscirptionFormDto } from './dto/create-subscirption_form.dto';
import { UpdateSubscirptionFormDto } from './dto/update-subscirption_form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscirptionForm } from './entities/subscirption_form.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { OlmService } from '../olm/olm.service';
import { SubscriptionOptionService } from '../subscription-option/subscription-option.service';

@Injectable()
export class SubscirptionFormService {
  constructor(
    @InjectRepository(SubscirptionForm)
    private repository: Repository<SubscirptionForm>,
    private readonly userService :UsersService,
    private readonly olmService :OlmService,
    private readonly subscriptionOptionService :SubscriptionOptionService,

  ){}
 async  create(createSubscirptionFormDto: CreateSubscirptionFormDto) {

  
  
    const user= await this.userService.create(createSubscirptionFormDto.createUserDto)
    if(user){
      let  olm =await this.olmService.findOne(createSubscirptionFormDto.olmId)
      let subscriptionOption =await this.subscriptionOptionService.findOne(createSubscirptionFormDto.subscriptionTypeId)
      createSubscirptionFormDto.olm=olm
      createSubscirptionFormDto.user=user
    createSubscirptionFormDto.subscriptionOption=subscriptionOption
      return this.repository.save(createSubscirptionFormDto)
    }


  }

  findAll() {
    return `This action returns all subscirptionForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscirptionForm`;
  }

  update(id: number, updateSubscirptionFormDto: UpdateSubscirptionFormDto) {
    return `This action updates a #${id} subscirptionForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscirptionForm`;
  }
}
