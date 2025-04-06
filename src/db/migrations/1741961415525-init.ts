import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1741961415525 implements MigrationInterface {
    name = 'Init1741961415525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("code" nvarchar(255) NOT NULL, "label" nvarchar(30) NOT NULL, CONSTRAINT "PK_ee999bb389d7ac0fd967172c41f" PRIMARY KEY ("code"))`);
        await queryRunner.query(`CREATE TABLE "notification_token" ("id" int NOT NULL IDENTITY(1,1), "token" nvarchar(255) NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_d268c7ee9e44f5d595deaa77c98" DEFAULT getdate(), "deletedAt" datetime2, "userId" int, CONSTRAINT "PK_99cf05a96c3aaf7dfd10b5740d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" int NOT NULL, "name" nvarchar(100) NOT NULL, "nameSecondary" nvarchar(100) NOT NULL, "nameThird" nvarchar(100) NOT NULL, "countryCode" nvarchar(100) NOT NULL, "phoneCountryCode" nvarchar(100), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" int NOT NULL, "name" nvarchar(100) NOT NULL, "nameSecondary" nvarchar(100) NOT NULL, "nameThird" nvarchar(100) NOT NULL, "countryId" int NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_event" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e112999fd749c4275cc89aec8b3" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_cc6b38fd7540767b0076eab4adb" DEFAULT getdate(), "createdBy" int, "uuid" nvarchar(255) NOT NULL, "userId" int, "eventId" int, CONSTRAINT "PK_4245a6b002b13f12e426d9db3ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_77b45e61f3194ba2be468b07789" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_d88128dae17a09fe1327fe550d3" DEFAULT getdate(), "createdBy" int, "title" nvarchar(255) NOT NULL, "description" nvarchar(255) NOT NULL, "startDate" datetime NOT NULL, "endDate" datetime NOT NULL, "location" nvarchar(255), "pathPicture" nvarchar(255), "companyId" int, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_dbd45d4f25e03ce493fcbc551d6" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_a0014ec13facc282bb2595128e7" DEFAULT getdate(), "createdBy" int, "name" nvarchar(255) NOT NULL, "imagePath" nvarchar(255), "whatsappPhoneNumber" nvarchar(255), "regionId" int, "supervisorId" int, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_7d926cc484e970dbd488a4953f" ON "company" ("supervisorId") WHERE "supervisorId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "olm" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_75beb81db6da7e299d044b0b6ee" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_ef79541b3516e045fc4fa36c785" DEFAULT getdate(), "zone" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_c92e5b9563c1bfb73baa925a8b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription_option" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_9a77b90bf086e45f0d31e0cd265" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_5ab8062e00b3636e44d8da3f2c9" DEFAULT getdate(), "createdBy" int, "subscriptionType" nvarchar(255) NOT NULL, "price" decimal(10,2) NOT NULL, CONSTRAINT "PK_de5033cbcf7bd154303b8d316fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscirption_form" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_a8ced0a919de172a411d084c5d5" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_87b33936863acb9c79099b945cb" DEFAULT getdate(), "createdBy" int, "positionType" nvarchar(255) NOT NULL, "positionTitle" nvarchar(255) NOT NULL, "pathReciept" nvarchar(255), "uuid" nvarchar(255) NOT NULL, "userId" int, "olmId" int, "subscriptionOptionId" int, CONSTRAINT "UQ_64e48a819902cd468d66f77b317" UNIQUE ("uuid"), CONSTRAINT "PK_cdae72d1f03f8e5debda6f4378c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_5e8a53512c649439fc45f5834e" ON "subscirption_form" ("userId") WHERE "userId" IS NOT NULL`);
        await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), "password" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "fullName" nvarchar(255) NOT NULL CONSTRAINT "DF_035190f70c9aff0ef331258d28b" DEFAULT '', "phoneNumber" nvarchar(255) NOT NULL, "countryCode" nvarchar(255) NOT NULL, "pathPicture" nvarchar(255), "isVerified" bit NOT NULL, "isActive" bit NOT NULL, "isBlocked" bit NOT NULL, "language" nvarchar(255) NOT NULL CONSTRAINT "DF_44e3d73b0a8324670f0fc1f57e1" DEFAULT 'en', "deletedAt" datetime2, "role" nvarchar(255), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b11a5e627c41d4dc3170f1d3703" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_489f2762db84e32ef4d1df3533a" DEFAULT getdate(), "title" nvarchar(255) NOT NULL, "body" nvarchar(255) NOT NULL, "key" nvarchar(255) NOT NULL, "isViewed" bit NOT NULL CONSTRAINT "DF_0c84b1f3141dff9bd70ac732ea1" DEFAULT 0, "senderId" int, "receiverId" int, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracer" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_56c41f7e9a73cc64b25975fd985" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_b4eb3d14f3a395961df9de09811" DEFAULT getdate(), "createdBy" int, "url" text, "method" text, "name" text, "body" text, "query" text, "params" text, CONSTRAINT "PK_0dd56918b688c99095029ed298a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_4a54e88f8c42954be40d039f6af" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_25f8e41dd2687e4413a471f27f4" DEFAULT getdate(), "createdBy" int, "title" nvarchar(255) NOT NULL, "scheduledDate" datetime NOT NULL, "description" text, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subtask" ("id" int NOT NULL IDENTITY(1,1), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_0e1edbd1a7571520dc05267626d" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_02545692d6e247bdb8e15be1f47" DEFAULT getdate(), "createdBy" int, "title" nvarchar(255) NOT NULL, "durationMinutes" int NOT NULL, "taskId" int, CONSTRAINT "PK_e0cda44ad38dba885bd8ab1afd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification_entity" ("key" nvarchar(255) NOT NULL, "title" nvarchar(255) NOT NULL CONSTRAINT "DF_fbbe4815c2800f2287b3af7a592" DEFAULT '', "titleSecondary" nvarchar(255) NOT NULL CONSTRAINT "DF_3dfde1be3603b94e69140cbf6c7" DEFAULT '', "titleThird" nvarchar(255) NOT NULL CONSTRAINT "DF_98cb286256af23cb7f123078c01" DEFAULT '', "body" nvarchar(255) NOT NULL CONSTRAINT "DF_53c742c32dbc6fc0e520c9b39a3" DEFAULT '', "bodySecondary" nvarchar(255) NOT NULL CONSTRAINT "DF_1a8403fbe001b76fe11e2f069ff" DEFAULT '', "bodyThird" nvarchar(255) NOT NULL CONSTRAINT "DF_6a64a7c0f3e9e83e55cc81b3654" DEFAULT '', CONSTRAINT "PK_2abb6027bd9a2edb2c036ba744d" PRIMARY KEY ("key"))`);
        await queryRunner.query(`CREATE TABLE "app_config" ("code" int NOT NULL IDENTITY(1,1), "playStoreUrl" nvarchar(255), "appleStoreUrl" nvarchar(255), "minVersionAndroid" nvarchar(255) NOT NULL, "minVersionIOS" nvarchar(255) NOT NULL, "isDev" bit NOT NULL, "creationDate" datetime2 NOT NULL CONSTRAINT "DF_d44c7c03e08c56fc8c3f0d19ef8" DEFAULT getdate(), CONSTRAINT "PK_03047b760dd18405b19a9f5e89b" PRIMARY KEY ("code"))`);
        await queryRunner.query(`ALTER TABLE "notification_token" ADD CONSTRAINT "FK_8c1dede7ba7256bff4e6155093c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "FK_75ceb9efda6c228a50d88dcdfb8" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_77452fe8443c349b0e628507cbb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_event" ADD CONSTRAINT "FK_6a41d7c0f21abb37cd273824fa6" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7a82450902ff289a5d95e523820" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_7d926cc484e970dbd488a4953f6" FOREIGN KEY ("supervisorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_5e8a53512c649439fc45f5834ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_98bdfa667d8037c5673a023fd35" FOREIGN KEY ("olmId") REFERENCES "olm"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" ADD CONSTRAINT "FK_d485c73e8402fdc9f2bf90c24e5" FOREIGN KEY ("subscriptionOptionId") REFERENCES "subscription_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6620cd026ee2b231beac7cfe578" FOREIGN KEY ("role") REFERENCES "role"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_c0af34102c13c654955a0c5078b" FOREIGN KEY ("senderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_758d70a0e61243171e785989070" FOREIGN KEY ("receiverId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "subtask" ADD CONSTRAINT "FK_8209040ec2c518c62c70cd382dd" FOREIGN KEY ("taskId") REFERENCES "task"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subtask" DROP CONSTRAINT "FK_8209040ec2c518c62c70cd382dd"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_758d70a0e61243171e785989070"`);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_c0af34102c13c654955a0c5078b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6620cd026ee2b231beac7cfe578"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_d485c73e8402fdc9f2bf90c24e5"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_98bdfa667d8037c5673a023fd35"`);
        await queryRunner.query(`ALTER TABLE "subscirption_form" DROP CONSTRAINT "FK_5e8a53512c649439fc45f5834ec"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7d926cc484e970dbd488a4953f6"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_7a82450902ff289a5d95e523820"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f"`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_6a41d7c0f21abb37cd273824fa6"`);
        await queryRunner.query(`ALTER TABLE "user_event" DROP CONSTRAINT "FK_77452fe8443c349b0e628507cbb"`);
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "FK_75ceb9efda6c228a50d88dcdfb8"`);
        await queryRunner.query(`ALTER TABLE "notification_token" DROP CONSTRAINT "FK_8c1dede7ba7256bff4e6155093c"`);
        await queryRunner.query(`DROP TABLE "app_config"`);
        await queryRunner.query(`DROP TABLE "notification_entity"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
        await queryRunner.query(`DROP TABLE "task"`);
        await queryRunner.query(`DROP TABLE "tracer"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "REL_5e8a53512c649439fc45f5834e" ON "subscirption_form"`);
        await queryRunner.query(`DROP TABLE "subscirption_form"`);
        await queryRunner.query(`DROP TABLE "subscription_option"`);
        await queryRunner.query(`DROP TABLE "olm"`);
        await queryRunner.query(`DROP INDEX "REL_7d926cc484e970dbd488a4953f" ON "company"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "user_event"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "notification_token"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
