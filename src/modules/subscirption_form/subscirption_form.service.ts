import { Injectable } from "@nestjs/common";
import { CreateSubscirptionFormDto } from "./dto/create-subscirption_form.dto";
import { UpdateSubscirptionFormDto } from "./dto/update-subscirption_form.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscirptionForm } from "./entities/subscirption_form.entity";
import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from "../users/users.service";
import { OlmService } from "../olm/olm.service";
import { SubscriptionOptionService } from "../subscription-option/subscription-option.service";

import * as path from "path";
import * as QRCode from "qrcode";

import { PdfService } from "src/utils/pdf-service";

@Injectable()
export class SubscirptionFormService {
  constructor(
    @InjectRepository(SubscirptionForm)
    private repository: Repository<SubscirptionForm>,
    private readonly userService: UsersService,
    private readonly olmService: OlmService,
 
    private readonly pdfService: PdfService,
    private readonly subscriptionOptionService: SubscriptionOptionService,
  ) { }
  async create(createSubscirptionFormDto: CreateSubscirptionFormDto) {
    createSubscirptionFormDto.createUserDto.isVerified = false;

    const user = await this.userService.create(createSubscirptionFormDto.createUserDto);
    if (user) {
      let olm = await this.olmService.findOne(createSubscirptionFormDto.olmId);
      let subscriptionOption = await this.subscriptionOptionService.findOne(
        createSubscirptionFormDto.subscriptionTypeId,
      );
      createSubscirptionFormDto.olm = olm;
      createSubscirptionFormDto.user = user;
      createSubscirptionFormDto.uuid = uuidv4();
      createSubscirptionFormDto.subscriptionOption = subscriptionOption;
      return this.repository.save(createSubscirptionFormDto);
    }
  }

  findAll() {
    return `This action returns all subscirptionForm`;
  }

  findOne(id: number) {
    return this.repository.findOne({
      where: { id },
    });
  }

  update(id: number, updateSubscirptionFormDto: UpdateSubscirptionFormDto) {
    return `This action updates a #${id} subscirptionForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscirptionForm`;
  }
  async updateReceipt(id: number, file: Express.Multer.File) {
    let susbcriptionForm = await this.findOne(id);
    if (susbcriptionForm) {
      susbcriptionForm.pathReciept = file.filename;
      return this.repository.save(susbcriptionForm);
    }
  }

  async generateReceipt(subscriptionFormId: number): Promise<Buffer> {
    // Get the subscription form with related entities
    const subscriptionForm = await this.repository.findOne({
      where: { id: subscriptionFormId },
      relations: ["user", "olm", "subscriptionOption"],
    });
  
    if (!subscriptionForm) {
      throw new Error("Subscription form not found");
    }
  

    const qrCodeDataUrl = await QRCode.toDataURL(subscriptionForm.uuid);
    
    const buffer = await this.pdfService.createPdf({
      fileName: 'receipt.ejs',
      data: {
        subscriptionForm,
        subscriptionFormId,
        qrCodeDataUrl,
      },
    });
    
    const fileName = `receipt-${subscriptionFormId}-${Date.now()}.pdf`;
    const relativePath = path.join("receipts", fileName);
    subscriptionForm.pathReciept = relativePath;
    
    await this.repository.save(subscriptionForm);
    
    return buffer;
  }
  verifyUuid(uuid: string) {
    return this.repository.findOne({
      where: { 
        uuid: uuid,
       },
      relations: {
        user: true,
        olm: true,
        subscriptionOption: true,
      }
    });
  }
  async getReceiptPath(subscriptionFormId: number): Promise<string> {
    const subscriptionForm = await this.repository.findOne({
      where: { id: subscriptionFormId },
    });

    if (!subscriptionForm || !subscriptionForm.pathReciept) {
      throw new Error("Receipt not found");
    }

    return subscriptionForm.pathReciept;
  }
  async findByUser(id: number) {
 
    
    let item = await this.repository.findOne({
      where: {
        user: {
          id: id,
        }, 
        },
      relations: {
        user: true,
        olm: true,
        subscriptionOption: true,
      }

    });


    return item;
  }
}
