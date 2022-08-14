import {INestApplication} from '@nestjs/common';
import {Test} from '@nestjs/testing';
import * as request from 'supertest';
import {AppModule} from "../../../src/app.module";

describe('E2E Login', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = modRef.createNestApplication();
        await app.init();
    });

    it('should get a JWT then successfully make a call', async () => {
        const loginReq = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({username: 'bruno', password: 'pw'})
            .expect(201);

        const token = loginReq.body.access_token;
        return request(app.getHttpServer())
            .get('/api/profile')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .expect({userId: 3, username: 'bruno'});
    });

    it('should not login due to wrong password', async () => {
        await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({username: 'bruno', password: 'pws'})
            .expect(401);
    });

    it('should not login due to wrong username', async () => {
        await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({username: 'usrnamenotavalibl', password: 'pws'})
            .expect(401);
    });

    afterAll(async () => {
        await app.close();
    });
});


describe('E2E Register', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const modRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = modRef.createNestApplication();
        await app.init();
    });

    it('should register a new user', async () => {
        await request(app.getHttpServer())
            .post('/api/auth/register')
            .send({username: 'irene', password: 'pw'})
            .expect(201);
    });

    it('should not register due to username already exists', async () => {
        await request(app.getHttpServer())
            .post('/api/auth/register')
            .send({username: 'bruno', password: 'pw'})
            .expect(422);
    });

    afterAll(async () => {
        await app.close();
    });
});
