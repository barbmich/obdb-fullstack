import { BreweryAPI } from "src/datasources/BreweryDataSource";
import { UserAPI } from "src/datasources/UserDataSource";

export interface IDataSources {
  breweryAPI: BreweryAPI;
  userAPI: UserAPI;
}
