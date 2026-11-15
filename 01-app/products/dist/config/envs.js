import 'dotenv/config';
import Joi from 'joi';
const envsSchema = Joi.object({
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
})
    .unknown(true);
const { error, value } = envsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envsVars = value;
export const envs = {
    port: envsVars.PORT,
    databaseUrl: envsVars.DATABASE_URL,
};
//# sourceMappingURL=envs.js.map