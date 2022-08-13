import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'dario',
                password: 'changeme',
            },
            {
                userId: 2,
                username: 'laurin',
                password: 'secret',
            },
            {
                userId: 3,
                username: 'bruno',
                password: 'pw',
            },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}