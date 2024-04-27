import { Module } from '@nestjs/common';
import { IamModule } from './iam/iam.module';
import { InsuranceModule } from './insurance/insurance.module';

@Module({
  imports: [IamModule, InsuranceModule],
})
export class AppModule {}
