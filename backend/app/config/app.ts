export type Environment = string | undefined;

const app = {
  jwt_secret: process.env.JWT_SECRET,
  vite_app: process.env.VITE_APP_URL,
};

export default app;