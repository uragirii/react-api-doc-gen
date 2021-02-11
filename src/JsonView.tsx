import ReactJson from "react-json-view";
import { Request, Response } from "./types";

interface RequestJsonViewProps {
  body: Request["body"];
}

export const RequestJsonView = ({ body }: RequestJsonViewProps) => {
  if (body === null || typeof body === "string" || typeof body === "number") {
    return <div>Not Implemented</div>;
  }
  const keys = Object.keys(body);
  const request: { [key: string]: string } = {};
  keys.forEach((key) => {
    request[key] = body[key].value ? body[key].value : `<${body[key].title}>`;
  });
  return (
    <ReactJson
      src={request}
      theme="monokai"
      name={null}
      collapseStringsAfterLength={24}
    />
  );
};

interface ResponseJsonViewProps {
  body: Response["body"];
}

export const ResponseJsonView = ({ body }: ResponseJsonViewProps) => {
  if (body === null || typeof body === "string" || typeof body === "number") {
    return <div>Not Implemented</div>;
  }
  const keys = Object.keys(body);
  const request: { [key: string]: string } = {};
  keys.forEach((key) => {
    request[key] = body[key].value ? body[key].value : `<${body[key].title}>`;
  });
  return (
    <ReactJson
      src={request}
      theme="monokai"
      name={null}
      collapseStringsAfterLength={24}
    />
  );
};
