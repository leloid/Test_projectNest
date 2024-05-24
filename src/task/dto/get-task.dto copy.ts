import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
    @ApiProperty({
        description: 'The userId',
        example: 3,
    })
    @IsNotEmpty({ message: 'userId is required' })
    @IsInt({ message: 'userId must be an integer' })
    @Min(0, { message: 'userId must be a non-negative integer' })
    userId: number;
}
