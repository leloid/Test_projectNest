import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import * as request from 'supertest';

describe('UserController', () => {
    let app: INestApplication;
    let userService: UserService;

    async function createApp(): Promise<void> {
        process.env.DATABASE_NAME = 'test_nestjs-final-test-db_USERS';
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        userService = moduleFixture.get<UserService>(UserService);

        await app.init();
    }

    async function closeApp(): Promise<void> {
        await Promise.all([userService.resetData(), app.close()]);
    }

    beforeAll(async () => {
        await createApp();
    });

    afterAll(async () => {
        await closeApp();
    });

    describe('POST /', () => {
        it('should return an HTTP error status 400 when given user is not valid', async () => {
            const invalidPayloads = [
                { email: '' },
                { email: 'invalidemail' },
                { email: 'missingatsymbol.com' },
                { email: 'missingdomain@' },
                { email: 'invalid@domain.' },
            ];

            for (const payload of invalidPayloads) {
                const response = await request(app.getHttpServer()).post('/user').send(payload);
                expect(response.status).toBe(400);
            }
        });

        it('should return an HTTP status 201 when given user has been created', async () => {
            const validPayloads = [
                { email: 'valid_1@test.com' },
                { email: 'valid_2@test.com' },
                { email: 'valid_3@test.com' },
                { email: 'valid_4@test.com' },
            ];

            for (const payload of validPayloads) {
                const response = await request(app.getHttpServer()).post('/user').send(payload);
                expect(response.status).toBe(201);

                const user = await userService.getUser(payload.email) as any;
                expect(user).toBeDefined();
                expect(user.email).toBe(payload.email);
            }
        });

        it('should return an HTTP error status 409 when given user already exists', async () => {
            const payload = { email: 'exists@test.com' };
            await userService.addUser(payload.email);

            const response = await request(app.getHttpServer()).post('/user').send(payload);
            expect(response.status).toBe(409);
        });
    });
});

async function createApp(): Promise<INestApplication> {
    process.env.DATABASE_NAME = 'test_nestjs-final-test-db_USERS';
    const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    return module.createNestApplication();
}
