import { UserModel } from '../models/user.model';

export async function seedUsers() {

    // Clear existing users
    await UserModel.deleteMany({});

    // Insert new users
    await UserModel.create([
        {
            username: 'admin',
            password: 'admin123',
            email: 'admin@example.com',
            role: 'admin',
            isVerified: true,
        },
        {
            username: 'user1',
            password: '123456',
            email: 'user1@example.com',
            role: 'user',
            isVerified: true,
        },
        {
            username: 'user2',
            password: '234567',
            email: 'user2@example.com',
            role: 'user',
            isVerified: true,
        },
        {
            username: 'user3',
            password: '345678',
            email: 'user3@example.com',
            role: 'user',
            isVerified: true,
        }
    ]);
    console.log('Seed user data success!');
}