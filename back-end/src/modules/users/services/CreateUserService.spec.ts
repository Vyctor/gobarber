import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    const user = await createUser.execute({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create an user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const hashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, hashProvider);

    await createUser.execute({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Vyctor',
        email: 'dev.vyctor@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
