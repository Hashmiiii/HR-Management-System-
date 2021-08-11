import { AuthenticationError } from './AuthenticationError';
export class BadInput extends AuthenticationError{
    constructor(error: any)
    {
        super(error);
    }
}