import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CreateUserEventDto } from "./dto/create-user-event.dto";
import { UpdateUserEventDto } from "./dto/update-user-event.dto";
import { Repository } from "typeorm";
import { UserEvent } from "./entities/user-event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "../users/users.service";
import { EventsService } from "../events/events.service";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UserEventService {
  constructor(
    @InjectRepository(UserEvent)
    private readonly repository: Repository<UserEvent>,
        @Inject(forwardRef(() => UsersService))
    
    private readonly userService: UsersService,
    private readonly eventService: EventsService
  ) {}
async  create(createUserEventDto: CreateUserEventDto) {
  console.log('aaaaaa');
  
    let user =await this.userService.findOne(createUserEventDto.userId)
    let event =await this.eventService.findOne(createUserEventDto.eventId)
    createUserEventDto.user = user
    createUserEventDto.event = event
    createUserEventDto.uuid=uuidv4()
return this.repository.save(createUserEventDto);
  }

  findAll() {
    return `This action returns all userEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEvent`;
  }

  update(id: number, updateUserEventDto: UpdateUserEventDto) {
    return `This action updates a #${id} userEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEvent`;
  }
  async verifyUuid(uuid: string) {
    let item=await this.repository.findOne({
      where: { uuid: uuid },
      relations: {
        user: true,
        event: true,
      },
    });


    return item;
    
  }
  findUserEventByEvent(eventId: number, userId: number) {
    return this.repository.findOne({
      where: { event: {
        id: eventId
      }, user: {
        id: userId
      } },
      relations: {
        user: true,
        event: true,
      },
    });
  }
  


}
