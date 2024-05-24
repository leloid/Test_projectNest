import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { TaskService } from '../src/task/task.service';
import { UserService } from '../src/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

describe('TaskController', () => {
    let app: INestApplication;
    let taskService: TaskService;
    let userService: UserService;

    async function createApp(): Promise<void> {
        process.env.DATABASE_NAME = 'test_nestjs-final-test-db_TASKS';
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        taskService = moduleFixture.get<TaskService>(TaskService);
        userService = moduleFixture.get<UserService>(UserService);

        await app.init();
    }

    async function closeApp(): Promise<void> {
        await Promise.all([taskService.resetData(), userService.resetData(), app.close()]);
    }

    beforeAll(async () => {
        await createApp();
    });

    afterAll(async () => {
        await closeApp();
    });

    describe('GET /user/:userId', () => {
        it('should return an HTTP error status 400 when given userId is not valid', async () => {
            const invalidUserIds = ['invalid_id1', '-99', 'notAnId'];

            for (const userId of invalidUserIds) {
                const response = await request(app.getHttpServer()).get(`/task/user/${userId}`);
                expect(response.status).toBe(400);
            }
        });

        it('should return an HTTP status 200 when given userId is valid', async () => {
            const createdElements = await createTasksFor2DifferentUsers();
            for (const created of createdElements) {
                const response = await request(app.getHttpServer()).get(`/task/user/${created.user.id}`);
                expect(response.status).toBe(200);

                const haveAllTasksBeenReturned = response.body.every((task: any) =>
                    created.tasks.some((createdTask: any) => createdTask.id === task.id),
                );
                expect(haveAllTasksBeenReturned).toBe(true);
            }
        });
    });

    describe('POST /', () => {
        it('should return an HTTP error status 400 when given task is not valid', async () => {
            const invalidPayloads = [
                { name: '', userId: '', priority: 'invalid' },
                { name: 'task with no userId', userId: '', priority: ' ' },
                { name: '', userId: 'userId123', priority: '-10' },
                { name: 'task with invalid priority', userId: 'userId123', priority: '-10' },
                { name: 'task with zero priority', userId: 'userId123', priority: '0' },
            ];

            for (const payload of invalidPayloads) {
                const response = await request(app.getHttpServer()).post('/task').send(payload);
                expect(response.status).toBe(400);
            }
        });

        it('should return an HTTP status 201 when given task has been created', async () => {
            const createdUser = await createUserUsing('valid_user@test.com');
            const validPayloads = [
                { name: 'task1', userId: createdUser.id, priority: '1' },
                { name: 'task2', userId: createdUser.id, priority: '2' },
                { name: 'task3', userId: createdUser.id, priority: '3' },
                { name: 'task4', userId: createdUser.id, priority: '4' },
            ];

            for (const payload of validPayloads) {
                const response = await request(app.getHttpServer()).post('/task').send(payload);
                expect(response.status).toBe(201);

                const task = await taskService.getTaskByName(payload.name, createdUser.id) as any;
                expect(task).toBeDefined();
                expect(task.name).toBe(payload.name);
                expect(task.priority).toBe(+payload.priority);
            }
        });
    });

    async function createTasksFor2DifferentUsers(): Promise<{ user: any; tasks: any[] }[]> {
        const createdUser1 = await createUserUsing('user1@test.com');
        for (let count = 0; count < 15; count++) {
            await taskService.addTask(`task #${count}`, createdUser1.id, 1);
        }
        const createdUser2 = await createUserUsing('user2@test.com');
        for (let count = 0; count < 15; count++) {
            await taskService.addTask(`task #${count}`, createdUser2.id, 1);
        }

        return [
            { user: createdUser1, tasks: await taskService.getUserTasks(createdUser1.id) },
            { user: createdUser2, tasks: await taskService.getUserTasks(createdUser2.id) },
        ];
    }

    async function createUserUsing(email: string): Promise<any> {
        await userService.addUser(email);
        return userService.getUser(email) as any;
    }
});
