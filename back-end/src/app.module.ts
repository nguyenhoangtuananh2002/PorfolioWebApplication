import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { DepartmentsModule } from './departments/departments.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { UploadPictureModule } from './upload-picture/upload-picture.module';
import { AuthModule } from './auth/auth.module';

import { Project } from './projects/entities/project.entity';
import { Department } from './departments/entities/department.entity';
import { Customer } from './customers/entities/customer.entity';
import { Employee } from './employees/entities/employee.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<number>('DB_PORT')),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        entities: [Project, Department, Customer, Employee,Role],
        synchronize: configService.get<boolean>('DB_SYNC', true),
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        logging: true,
      }),
    }),
    ProjectsModule,
    DepartmentsModule,
    CustomersModule,
    EmployeesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'assets'),
      serveRoot: '/assets',
    }),
    UploadPictureModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configureSwagger(app: any) {
    const config = new DocumentBuilder()
      .setTitle('Web Application API')
      .setDescription('API documentation for the web application')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
