import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
    @ApiProperty({
        description: 'The name of the task',
        example: 'Finish report',
    })
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @ApiProperty({
        description: 'The ID of the user to whom the task is assigned',
        example: 1,
    })
    @IsInt({ message: 'UserId must be an integer' })
    @Min(1, { message: 'UserId must be a positive integer' })
    userId: number;

    @ApiProperty({
        description: 'The priority of the task',
        example: 3,
    })
    @IsInt({ message: 'Priority must be an integer' })
    @Min(0, { message: 'Priority must be a non-negative integer' })
    priority: number;
}
