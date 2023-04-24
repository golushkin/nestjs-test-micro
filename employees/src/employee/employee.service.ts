import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_ENTITY_PROVIDER } from './providers/employee.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { EmployeeEntity } from './entities/employees.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject(EMPLOYEE_ENTITY_PROVIDER)
    private readonly employeeCollection: CollectionReference<EmployeeEntity>,
  ) {}
}
