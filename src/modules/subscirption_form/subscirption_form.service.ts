import { Injectable } from "@nestjs/common";
import { CreateSubscirptionFormDto } from "./dto/create-subscirption_form.dto";
import { UpdateSubscirptionFormDto } from "./dto/update-subscirption_form.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SubscirptionForm } from "./entities/subscirption_form.entity";
import { Repository } from "typeorm";

import { UsersService } from "../users/users.service";
import { OlmService } from "../olm/olm.service";
import { SubscriptionOptionService } from "../subscription-option/subscription-option.service";
import * as PDFDocument from "pdfkit";
import * as fs from "fs";
import * as path from "path";
import * as QRCode from "qrcode";
@Injectable()
export class SubscirptionFormService {
  constructor(
    @InjectRepository(SubscirptionForm)
    private repository: Repository<SubscirptionForm>,
    private readonly userService: UsersService,
    private readonly olmService: OlmService,
    private readonly subscriptionOptionService: SubscriptionOptionService,
  ) {}
  async create(createSubscirptionFormDto: CreateSubscirptionFormDto) {
    const user = await this.userService.create(createSubscirptionFormDto.createUserDto);
    if (user) {
      let olm = await this.olmService.findOne(createSubscirptionFormDto.olmId);
      let subscriptionOption = await this.subscriptionOptionService.findOne(
        createSubscirptionFormDto.subscriptionTypeId,
      );
      createSubscirptionFormDto.olm = olm;
      createSubscirptionFormDto.user = user;

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

  async generateReceipt(subscriptionFormId: number): Promise<string> {
    // Get the subscription form with related entities
    const subscriptionForm = await this.repository.findOne({
      where: { id: subscriptionFormId },
      relations: ["user", "olm", "subscriptionOption"],
    });

    if (!subscriptionForm) {
      throw new Error("Subscription form not found");
    }

    // Create the receipts directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads", "receipts");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate a filename for the receipt
    const fileName = `receipt-${subscriptionFormId}-${Date.now()}.pdf`;
    const filePath = path.join(uploadsDir, fileName);

    // Generate QR code for the subscription UUID
    const qrCodeDataUrl = await QRCode.toDataURL(subscriptionForm.uuid);

    // Create a PDF document
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Add organization logo and header
    doc.fontSize(25).text("Subscription Receipt", { align: "center" });
    doc.moveDown();

    // Add receipt information
    doc.fontSize(12);
    doc.text(`Receipt ID: ${subscriptionFormId}`);
    doc.text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();

    // Add user information
    doc.fontSize(14).text("User Information:", { underline: true });
    doc.fontSize(12);
    doc.text(`Full Name: ${subscriptionForm.user.fullName}`);
    doc.text(`Email: ${subscriptionForm.user.email}`);
    doc.moveDown();

    // Add subscription information
    doc.fontSize(14).text("Subscription Details:", { underline: true });
    doc.fontSize(12);
    doc.text(`Position Type: ${subscriptionForm.positionType}`);
    doc.text(`Position Title: ${subscriptionForm.positionTitle}`);
    doc.text(`OLM: ${subscriptionForm.olm.name || subscriptionForm.olm.id}`);
    doc.text(`Subscription UUID: ${subscriptionForm.uuid}`);
    doc.moveDown();

    // Add subscription option details
    doc.fontSize(14).text("Subscription Plan:", { underline: true });
    doc.fontSize(12);
    doc.text(`Subscription Type: ${subscriptionForm.subscriptionOption.subscriptionType}`);
    doc.text(`Price: $${subscriptionForm.subscriptionOption.price}`);
    doc.moveDown();

    // Add payment information and footer
    doc.fontSize(14).text("Payment Information:", { underline: true });
    doc.fontSize(12);
    doc.text(`Amount Paid: $${subscriptionForm.subscriptionOption.price}`);
    doc.text(`Payment Status: Completed`);
    doc.moveDown(2);

    // Add QR code to the right side of the page
    doc.image(qrCodeDataUrl, 400, 50, { width: 150 });
    doc.fontSize(10).text("Scan to verify subscription", 400, 210, { width: 150, align: "center" });

    // Add footer
    doc.fontSize(10).text("Thank you for your subscription!", { align: "center" });
    doc.text("For questions or support, please contact our support team.", { align: "center" });

    // Finalize the PDF
    doc.end();

    // Return a Promise that resolves when the file is written
    return new Promise((resolve, reject) => {
      writeStream.on("finish", async () => {
        // Update the subscription form with the receipt path
        const relativePath = path.join("receipts", fileName);
        subscriptionForm.pathReciept = relativePath;
        await this.repository.save(subscriptionForm);

        resolve(relativePath);
      });

      writeStream.on("error", reject);
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
}
