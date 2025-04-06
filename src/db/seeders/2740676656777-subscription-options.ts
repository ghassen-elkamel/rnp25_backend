import { SubscriptionOption } from "src/modules/subscription-option/entities/subscription-option.entity";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SubscriptionOptions2740676656777 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const subscriptionOptionsData = [
          { subscriptionType: 'VSD', price: 245.00 },
          { subscriptionType: 'SD', price: 165.00 }
        ];
    
        await queryRunner.manager.insert(SubscriptionOption, subscriptionOptionsData);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM subscription_option');
      }
    }
