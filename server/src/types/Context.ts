import { Request, Response } from "express";
import { IDataSources } from "./IDataSources";

interface ExpressContext {
  req: Request;
  res: Response;
}

export interface MyContext extends ExpressContext {
  dataSources: IDataSources;
  payload: { userId: number };
}
