type EnvVariable = "JWT_SECRET" | "MONGO_DB";
export const getEnv = (key: EnvVariable) => {
  return process.env[key] as string;
};
