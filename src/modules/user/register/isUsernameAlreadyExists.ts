import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import userService from '../../../services/userService';

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistsConstraint
  implements ValidatorConstraintInterface {
  async validate(username: string): Promise<boolean> {
    const user = await userService.findOneByUsername(username);
    if (user) return false;
    return true;
  }
}

export function IsUsernameAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistsConstraint,
    });
  };
}
