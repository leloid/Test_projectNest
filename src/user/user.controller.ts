import {
    Controller,
    HttpException,
    Post,
    HttpStatus,
    Body,
    Get,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiOperation({ summary: 'Add a new user' })
    @ApiBody({ type: CreateUserDto, description: 'The user data to create' })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 409, description: 'User already exists.' })
    async addUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.addUser(createUserDto.email);
    }

    @Get('users')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users.' })
    async getUsers() {
        return this.userService.getUsers();
    }
}
