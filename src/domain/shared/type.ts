export type AggregateId = string;
export type Uuid = string;
export type EventType = string;
export type EventVersion = number;
export interface IConstructorInterface<T> {
  new (...args: any[]): T;
}
