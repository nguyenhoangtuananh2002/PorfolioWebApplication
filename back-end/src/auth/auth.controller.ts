import { Controller, Req, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Public()
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req)
    {
        console.log('User in session: ',req.user)
        return this.authService.login(req.user)
    }

}

