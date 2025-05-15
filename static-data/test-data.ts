export interface UserCredentials {
    username: string;
    password: string;
}

export const TEST_USERS = {
    STANDARD: {
        username: 'standard_user',
        password: 'secret_sauce',
    },
    LOCKED: {
        username: 'locked_out_user',
        password: 'secret_sauce',
    },
    PROBLEM: {
        username: 'problem_user',
        password: 'secret_sauce',
    },
    PERFORMANCE: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
    },
} as const;

export interface Product {
    name: string;
    price: number;
    description: string;
}
