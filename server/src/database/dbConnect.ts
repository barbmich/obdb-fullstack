import { createConnection, getConnectionOptions } from "typeorm";

export const dbConnection = async () => {
  const options = await getConnectionOptions("development");

  createConnection({
    ...options,
    name: "default",
  });
};
