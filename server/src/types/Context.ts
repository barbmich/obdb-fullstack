import { Request, Response } from "express";
import { IDataSources } from "./IDataSources";

export interface Context {
  req: Request;
  res: Response;
  dataSources: IDataSources;
}
