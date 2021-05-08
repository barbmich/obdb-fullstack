import { Request, Response } from "express";
import { IDataSources } from "./IDataSources";

export interface ExpressContext {
  req: Request;
  res: Response;
}

export interface Context extends ExpressContext {
  dataSources: IDataSources;
  payload?: { userId: string | number };
}
