import { Injectable } from '@nestjs/common';
import { EmployeesService } from 'src/employees/employees.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly employeeService: EmployeesService,
        private readonly jwtService: JwtService
    ) {}

    async validate(email: string, password: string): Promise<any | null> {
        console.log('Validating email:', email);
        const employee = await this.employeeService.findOnebyEmail(email);
        console.log('Found employee:', employee);
    
        if (!employee) {
            console.log('User not found');
            return null;
        }
    
        const isMatch = await bcrypt.compare(password.trim(), employee.password.trim());
        console.log('Password match:', isMatch);
    
        if (!isMatch) {
            console.log('Invalid password');
            return null;
        }
        const { password: _, ...result } = employee;
        return result;
    }
    

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: {
                id: user.id,
                avatar: user.avatar,
                firstname: user.firstname,
                lastname: user.lastname,
                skills: user.skills,
                role: user.role,
                is_admin: user.is_admin
            }
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
