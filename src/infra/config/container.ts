import { Container } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../../types';
import { Logger } from '../../domain/interfaces/Logger';
import { Mailer } from '../../domain/interfaces/Mailer';
import { ReportService } from '../../domain/interfaces/ReportService';
import { ConsoleLogger } from '../logger/ConsoleLogger';
import { FileLogger } from '../logger/FileLogger';
import { EtherealMailer } from '../mailer/EtherealMailer';
import { GmailMailer } from '../mailer/GmailMailer';
import { ReportServiceImpl } from '../../domain/services/ReportServiceImpl';
import { ReportController } from '../../http/controllers/ReportController';


export function createContainer(): Container {
  const container = new Container();
  
  const appEnv = process.env.APP_ENV || 'dev';

 
  if (appEnv === 'prod') {
    container.bind<Logger>(TYPES.Logger).to(FileLogger).inSingletonScope();
  } else {
    container.bind<Logger>(TYPES.Logger).to(ConsoleLogger).inSingletonScope();
  }

  
  if (appEnv === 'prod') {
    container.bind<Mailer>(TYPES.Mailer).to(GmailMailer).inSingletonScope();
  } else {
    container.bind<Mailer>(TYPES.Mailer).to(EtherealMailer).inSingletonScope();
  }

 
  container.bind<ReportService>(TYPES.ReportService).to(ReportServiceImpl);


  container.bind<ReportController>(TYPES.ReportController).to(ReportController);

  return container;
}