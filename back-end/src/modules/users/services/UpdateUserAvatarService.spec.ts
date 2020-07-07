import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'foto_muito_doida.jpg',
    });

    expect(user.avatar).toBe('foto_muito_doida.jpg');
  });
  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        userID: 'non-existing-user',
        avatarFilename: 'foto_muito_doida.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Vyctor',
      email: 'dev.vyctor@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'foto_muito_doida.jpg',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFilename: 'foto_muito_doida2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('foto_muito_doida.jpg');
  });
});
