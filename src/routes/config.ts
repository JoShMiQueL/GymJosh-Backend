module.exports = () => {
  const {
    NODE_ENV,
    EXPRESS_PORT,
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
  } = process.env;
  const res = {
    NODE_ENV,
    EXPRESS_PORT,
    MONGO_DATABASE,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
  };
  return { ...res };
};
