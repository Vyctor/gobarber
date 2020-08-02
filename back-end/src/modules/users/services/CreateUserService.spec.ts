import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create an user with same email from another', async () => {
    await createUser.execute({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Vyctor',
        email: 'dev.vyctor@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
