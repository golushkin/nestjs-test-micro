import { Inject, Injectable } from '@nestjs/common';
import { EMPLOYEE_ENTITY_PROVIDER } from '../providers/employee.provider';
import { CollectionReference } from '@google-cloud/firestore';
import { EmployeeEntity } from '../entities/employees.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { generateId } from '../../utils/id';
import { EmployeeStatusEnum } from '../enums/employee-status.enum';

@Injectable()
export class EmployeeHttpService {
  constructor(
    @Inject(EMPLOYEE_ENTITY_PROVIDER)
    private readonly employeeCollection: CollectionReference<EmployeeEntity>,
  ) {}

  async create(info: CreateEmployeeDto): Promise<EmployeeEntity> {
    const employeeEntity: EmployeeEntity = {
      ...info,
      _id: generateId(),
      status: EmployeeStatusEnum.FREE,
    };
    await this.employeeCollection.doc(employeeEntity._id).set(employeeEntity);

    return employeeEntity;
  }

  async getAll(): Promise<EmployeeEntity[]> {
    const docsRef = await this.employeeCollection.get();

    return docsRef.docs.map((doc) => doc.data());
  }
}
