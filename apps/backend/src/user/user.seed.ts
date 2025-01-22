import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from './user.entity';

const datas = [
  { email: 'walter@inabase.com', name: 'walter', password: 'test' },
  { email: 'saul@inabase.com', name: 'saul', password: 'test' },
  { email: 'inanis@inabase.com', name: 'inanis', password: 'test' },
  { email: 'gawr@inabase.com', name: 'gawr', password: 'test' },
  { email: 'comet@inabase.com', name: 'comet', password: 'test' },
];

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    await userRepository.clear();

    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      const user = new User();

      user.name = data.name;
      user.email = data.email;
      user.password = await argon2.hash(data.password);
      user.deleted = false;

      await userRepository.save(user);
    }
  }
}
