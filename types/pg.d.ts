declare module "pg" {
  export interface ClientConfig {
    connectionString?: string
  }

  export class Client {
    constructor(config?: ClientConfig)
    connect(): Promise<void>
    query(queryText: string, values?: readonly unknown[]): Promise<unknown>
    end(): Promise<void>
  }
}
