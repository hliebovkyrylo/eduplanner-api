import { body } from "express-validator";

export const authValidator = [
    body('email', 'Failed').isString(),
    body('password', 'Failed').isString(),
];

export const createScheduleValidator = [
    body('groupName', 'Failed').isString(),
    body('schedule', 'Failed').isObject(),
];