import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';
import { DepartmentsModule } from './departments/departments.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { Department } from './departments/entities/department.entity';
import { Customer } from './customers/entities/customer.entity';
import { Employee } from './employees/entities/employee.entity';

@Module({
  imports: [ProjectsModule,
    TypeOrmModule.forRoot({
      type: "mssql",
      host: '127.0.0.1',
      port:1433,
      database:'webapplication',
      username:'sa',
      password:'Thoiudau@2412',
      entities: [Project,Department,Customer,Employee],
      synchronize: true,
      options: {
        'encrypt':false,
        'trustServerCertificate':true
      },
      logging:true,
    }),
    DepartmentsModule,
    CustomersModule,
    EmployeesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
