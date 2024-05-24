/* eslint-disable prettier/prettier */
import {
    Controller,
    HttpException,
    Post,
    HttpStatus,
    Body,
    Get,
    Param,
} from '@nestjs/common';import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto copy';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller()
@ApiTags('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    @ApiOperation({ summary: 'Add a new task' })
    @ApiBody({ type: CreateTaskDto, description: 'The Task data to create' })
    @ApiResponse({ status: 201, description: 'Task successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 409, description: 'Task already exists.' })
    async addTask(@Body() createTaskDto: CreateTaskDto) {

        return this.taskService.addTask(createTaskDto.name, createTaskDto.userId, createTaskDto.priority);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'List of users.' })
    async getUserTasks(@Param('userId') userId: number) {
        if (userId < 0 || isNaN(userId)) {
            throw new HttpException('A valid userId is required', HttpStatus.BAD_REQUEST);
        }
        return this.taskService.getUserTasks(userId);
    }
}
