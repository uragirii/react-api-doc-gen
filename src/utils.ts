import { Authorization, Request } from "./types";

export const pythonBody = (request: Request): string => {
  const { body } = request;
  if (typeof body === "string" || typeof body === "number" || body === null) {
    return "Not Implemented";
  }

  if (
    request.headers &&
    (request.headers["content-type"] === "application/x-www-form-urlencoded" ||
      request.headers["Content-Type"] === "application/x-www-form-urlencoded")
  ) {
    return `"${Object.keys(body)
      .map((key) => {
        return `${key}=${
          body[key].value ? body[key].value : `'<${body[key].title}>'`
        }`;
      })
      .join("&")}"`;
  } else {
    return `{
  ${Object.keys(body)
    .map((key) => {
      return `"${key}" : ${
        body[key].value ? body[key].value : `'<${body[key].title}>'`
      }`;
    })
    .join(",\n")}
}`;
  }
};

export const pythonHeaders = (
  request: Request,
  auth: Authorization | null
): string => {
  /**
   * Headers will include Auth if the auth is present
   */
  const headers: { [key: string]: string } = {};
  if (auth && auth.type === "bearer") {
    headers["Authorization"] = "Bearer <Your Token>";
  }
  if (
    !request.headers ||
    !request.headers["Content-Type"] ||
    !request.headers["content-type"]
  ) {
    // By default add application/json header
    headers["Content-Type"] = "application/json";
  }
  if (request.headers !== undefined) {
    Object.keys(request.headers).forEach((key) => {
      headers[key] = request.headers[key];
    });
  }
  return Object.keys(headers)
    .map((key) => {
      return `'${key}' : '${headers[key]}',`;
    })
    .join("\n  ");
};

export const pythonCodeGen = (
  request: Request,
  auth: Authorization | null | "parent"
): string => {
  const { url, method } = request;
  const header = pythonHeaders(request, auth);
  const payload = pythonBody(request);
  return `
import requests

url = "${url}"

payload = ${payload}
headers = {
  ${header}
}

response = requests.request("${method}", url, headers=headers, data=payload)

print(response.text)
`;
};
