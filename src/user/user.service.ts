import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../infrastructure/database/database.service';
import { User, Prisma } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private databaseService: DatabaseService) {}

    async addUser(email: string): Promise<User> {
        if (!email) {
            // eslint-disable-next-line prettier/prettier
            throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
        }
        const user = await this.databaseService.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user) {
            throw new HttpException('User already exists', HttpStatus.CONFLICT);
        }
        return this.databaseService.user.create({
            data: {
                email,
            },
        });
    }

    getUser(email: string): Promise<User> {
        return this.databaseService.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    getUserById(id: number): Promise<User> {
        return this.databaseService.user.findUnique({
            where: {
                id: parseInt(id.toString()),
            },
        });
    }

    getUsers(): Promise<User[]> {
        return this.databaseService.user.findMany();
    }

    resetData(): Promise<Prisma.BatchPayload> {
        return this.databaseService.user.deleteMany();
    }
}
