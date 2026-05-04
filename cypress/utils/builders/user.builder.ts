import { faker } from '@faker-js/faker';

export interface UserCredentials {
  username: string;
  password: string;
}

/**
 * UserBuilder — fluent, stateless test data builder (Law 6).
 * Returns a new object on every build(); never mutates internal state.
 *
 * Usage:
 *   const user = new UserBuilder().standard().build();
 */
export class UserBuilder {
  private username = faker.internet.username();
  private password = faker.internet.password({ length: 12 });

  standard(): this {
    this.username = 'standard_user';
    this.password = 'secret_sauce';
    return this;
  }

  locked(): this {
    this.username = 'locked_out_user';
    this.password = 'secret_sauce';
    return this;
  }

  problem(): this {
    this.username = 'problem_user';
    this.password = 'secret_sauce';
    return this;
  }

  slow(): this {
    this.username = 'performance_glitch_user';
    this.password = 'secret_sauce';
    return this;
  }

  invalid(): this {
    this.username = faker.internet.username();
    this.password = faker.internet.password({ length: 8 });
    return this;
  }

  withUsername(username: string): this {
    this.username = username;
    return this;
  }

  withPassword(password: string): this {
    this.password = password;
    return this;
  }

  build(): UserCredentials {
    return { username: this.username, password: this.password };
  }
}
