import { random } from 'lodash';
import db, { genid } from './db';
import { faker } from '@faker-js/faker';

const submission = async () => {
  const id = await genid();
  return await db.newSubmission.create({
    data: {
      id: id,
      submittedAt: new Date(),
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        company: faker.company.name(),
        comments: faker.lorem.words(random(30, false)),
      },
    },
  });
};

const ModGenerate = {
    submission,
};

export default ModGenerate;
