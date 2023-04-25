import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmployeeEntity } from '../entities/employees.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { EmployeeHttpService } from '../services/employee-http.service';

@Controller('employees')
export class EmployeeHttpController {
  constructor(private readonly employeeService: EmployeeHttpService) {}

  @Post()
  async create(@Body() info: CreateEmployeeDto): Promise<EmployeeEntity> {
    return await this.employeeService.create(info);
  }

  @Get()
  async getAll(): Promise<EmployeeEntity[]> {
    return await this.employeeService.getAll();
  }
}
