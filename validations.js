import { body } from "express-validator";

export const userValidator = [
    body('userId', 'Error').isString(),
    body('name', 'Error').isString(),
    body('username', 'Error').isString(),
    body('image', 'Error').isString().optional(),
];

export const createScheduleValidator = [
    body('groupName', 'Failed').isString(),
    body('author', 'Failed').isString(),
    body('authorUsername', 'Failed').isString(),
];

export const createEventValidator = [
    body('eventName', 'Failed').isString(),
    body('eventTime', 'Failed').isString(),
    body('eventColor', 'Failed').isString(),
    body('rowNum', 'Failed').isNumeric(),
    body('colNum', 'Failed').isNumeric(),
    body('parentId', 'Failed').isString(),
];