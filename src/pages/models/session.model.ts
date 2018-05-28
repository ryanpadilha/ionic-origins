import { User } from './user.model';

export class Session {
    constructor(public token: string,
                public user: User) {

    }
}