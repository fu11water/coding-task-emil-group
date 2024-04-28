import { SetMetadata } from '@nestjs/common';
import { EPermissions } from '../types';

export const Permission = (permission: EPermissions) =>
  SetMetadata('permission', permission);
