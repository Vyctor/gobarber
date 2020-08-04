import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jdoe@example.com',
      password: '123456',
    });
    const userTwo = await fakeUsersRepository.create({
      name: 'John Tree',
      email: 'jtree@example.com',
      password: '123456',
    });
    const userThree = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'qua@example.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Marston',
      email: 'marston@example.com',
      password: '123456',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([userOne, userTwo, userThree]);
  });
});
