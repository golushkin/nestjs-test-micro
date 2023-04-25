import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';
import { GoogleCloudPubSubClient } from './gcp-pub-sub-client';
import { ServicesEnum } from '../enums/services.enum';

export const EmployeeService: ClientsProviderAsyncOptions = {
  name: ServicesEnum.EMPLOYEE,
  inject: [ConfigService],
  useFactory: (configSerice: ConfigService) => ({
    customClass: GoogleCloudPubSubClient,
    options: {
      projectId: configSerice.getOrThrow('GOOGLE_PROJECT_ID'),
    },
  }),
};
