import { body } from "express-validator";

export const userValidator = [
    body('userId', 'Error').isString(),
    body('name', 'Error').isString(),
    body('username', 'Error').isString(),
    body('image', 'Error').isString().optional(),
    body('onboarded', 'Error').isBoolean(),
];

export const createScheduleValidator = [
    body('groupName', 'Failed').isString(),
    body('schedule', 'Failed').isObject(),
    body('author', 'Failed').isString(),
];