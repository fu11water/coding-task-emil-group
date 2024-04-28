import { Module } from '@nestjs/common';
import { IamModule } from './iam/iam.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IamModule, InsuranceModule, AuthModule],
})
export class AppModule {}
