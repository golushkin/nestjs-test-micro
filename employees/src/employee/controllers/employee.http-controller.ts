import { Controller, UseGuards } from '@nestjs/common';
import { ContainUserIdGuard } from '../guards/contain-user-id.guard';

@Controller('employees')
@UseGuards(ContainUserIdGuard)
export class EmployeeHttpController {}
