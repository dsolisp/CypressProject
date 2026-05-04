import { faker } from '@faker-js/faker';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

/**
 * CheckoutBuilder — fluent, stateless test data builder (Law 6).
 * Returns a new object on every build(); never mutates internal state.
 *
 * Usage:
 *   const info = new CheckoutBuilder().valid().build();
 */
export class CheckoutBuilder {
  private firstName = faker.person.firstName();
  private lastName = faker.person.lastName();
  private zipCode = faker.location.zipCode('#####');

  valid(): this {
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.zipCode = '12345';
    return this;
  }

  empty(): this {
    this.firstName = '';
    this.lastName = '';
    this.zipCode = '';
    return this;
  }

  missingFirstName(): this {
    this.firstName = '';
    return this;
  }

  missingLastName(): this {
    this.lastName = '';
    return this;
  }

  missingZipCode(): this {
    this.zipCode = '';
    return this;
  }

  withFirstName(firstName: string): this {
    this.firstName = firstName;
    return this;
  }

  withLastName(lastName: string): this {
    this.lastName = lastName;
    return this;
  }

  withZipCode(zipCode: string): this {
    this.zipCode = zipCode;
    return this;
  }

  build(): CheckoutInfo {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      zipCode: this.zipCode,
    };
  }
}
