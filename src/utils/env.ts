type EnvVariable = "JWT_SECRET" | "MONGO_DB" | "MONGO_URI";
export const getEnv = (key: EnvVariable) => {
  return process.env[key] as string;
};

export const getMongoURI = () => {
  if (getEnv("MONGO_URI")) {
    return getEnv("MONGO_URI");
  } else return `mongodb://localhost:27017/${getEnv("MONGO_DB")}`;
};
