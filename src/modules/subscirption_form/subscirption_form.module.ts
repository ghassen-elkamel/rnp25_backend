import { Module } from "@nestjs/common";
import { SubscirptionFormService } from "./subscirption_form.service";
import { SubscirptionFormController } from "./subscirption_form.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscirptionForm } from "./entities/subscirption_form.entity";
import { OlmModule } from "../olm/olm.module";
import { UsersModule } from "../users/users.module";
import { SubscriptionOptionModule } from "../subscription-option/subscription-option.module";
import { PdfService } from "src/utils/pdf-service";

@Module({
  imports: [TypeOrmModule.forFeature([SubscirptionForm]), OlmModule, UsersModule,SubscriptionOptionModule],
  controllers: [SubscirptionFormController],
  providers: [SubscirptionFormService,PdfService],
  exports: [SubscirptionFormService],
})
export class SubscirptionFormModule {}
