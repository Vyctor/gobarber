import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password: '123456',
    });

    const updated_user = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jdtrue@example.com',
    });

    expect(updated_user.name).toBe('John Trê');
    expect(updated_user.email).toBe('jdtrue@example.com');
  });
  it('should not be able to change to an already used email from another user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Marston',
      email: 'jmarston@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'jdoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Marston',
      email: 'jmarston@example.com',
      password: '123456',
    });

    const updated_user = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'jdoe@example.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updated_user.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Marston',
      email: 'jmarston@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'jdoe@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Marston',
      email: 'jmarston@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'jdoe@example.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing id',
        name: 'non-existing name',
        email: 'non-existing e-mail',
        password: 'non-existing password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
