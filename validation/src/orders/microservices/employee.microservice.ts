import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { GoogleCloudPubSubClient } from './gcp-pub-sub-client';
import { MicroServicesEnum } from '../enums/microservices.enum';

export const EmployeeService: ClientsProviderAsyncOptions = {
  name: MicroServicesEnum.EMPLOYEE,
  inject: [ConfigService],
  useFactory: (configSerice: ConfigService) => ({
    customClass: GoogleCloudPubSubClient,
    options: {
      projectId: configSerice.getOrThrow('GOOGLE_PROJECT_ID'),
    },
  }),
};
