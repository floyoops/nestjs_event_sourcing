import {QueryInterface} from "@domain/shared/bus/query.interface";

export interface QueryHandlerInterface {
  handle(query: QueryInterface): any;
}
