export interface Authorization {
  type: "bearer" | "none";
  request: Request;
}

export interface Schema {
  type: "string" | "number" | Schema | Schema[];
  truncate?: boolean;
  truncateLength?: number;
  required: boolean;
  value?: any;
  description?: string;
  title: string;
}

export interface Response {
  statusCode: number;
  body:
    | "string"
    | "number"
    | Schema
    | Schema[]
    | null
    | { [key: string]: Schema };
}

export interface Request {
  /**
   * By default the request will inherit the authorization from Parent
   */
  auth?: Authorization | null | "parent";
  /**
   * Content-Type : application/json
   *
   * Authorization headers will be automatically added
   */
  headers?: Array<{ [key: string]: string }>;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body: number | string | { [key: string]: Schema };
  /**
   * url can be relative to base URL;
   */
  url: string;
  responses: Response[];
  title: string;
  description?: string;
}

export interface Collection {
  auth: Authorization;
  requests: Request[];
  baseURL: string;
  title: string;
  version: string;
  description?: string;
}
