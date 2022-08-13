import {Body, Controller, Get} from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Get('hello')
    signup() {
        return {
            hello : "world"
        };
    }
}