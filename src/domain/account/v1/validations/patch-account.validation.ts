import Joi from '@hapi/joi';

const patchAccountBody = {
    status: Joi.string().valid('UNLOCKED', 'BLOCKED').required(),
};

const getParam = {
    id: Joi.string().required(),
};

export default {
    body: Joi.object(patchAccountBody),
    param: Joi.object(getParam),
};
