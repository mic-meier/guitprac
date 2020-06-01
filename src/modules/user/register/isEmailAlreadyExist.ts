import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import userService from '../../../services/user-service';

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistsConstraint
  implements ValidatorConstraintInterface {
  async validate(email: string): Promise<boolean> {
    const user = await userService.findOneByEmail(email);
    if (user) return false;
    return true;
  }
}

export function IsEmailAlreadyExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistsConstraint,
    });
  };
}
