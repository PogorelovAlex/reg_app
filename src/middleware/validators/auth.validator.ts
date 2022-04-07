import { body } from 'express-validator';

export const getStringFieldValidator = (fieldName: string, message: string) =>
  body(fieldName).exists().isString().withMessage(message);

export const getEmailValidator = (fieldName: string, message: string) =>
  body(fieldName)
    .exists()
    .isString()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage(message);

export const getPasswordValidator = (fieldName: string, message: string) =>
  body(fieldName)
    .exists()
    .isString()
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(message);

export const getConfirmValidator = (
  fieldName: string,
  targetFieldName: string,
  message: string
) =>
  body(fieldName)
    .custom((val, { req }) => val === req.body[targetFieldName])
    .withMessage(message);

export const getNameValidator = (fieldName: string, message: string) =>
  body(fieldName).optional().isString().trim().withMessage(message);
