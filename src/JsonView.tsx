import ReactJson from "react-json-view";
import { Request, Response, Schema } from "./types";

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

interface JSONR {
  [key: string]: string | JSONR;
}

const getSubJson = (subbody: { [key: string]: Schema } | undefined) => {
  if (subbody === undefined) {
    return "";
  }
  const request: JSONR = {};
  Object.keys(subbody).forEach((key) => {
    const _subBody = subbody[key];
    if (_subBody.children) {
      request[key] = getSubJson(_subBody.children);
    } else {
      request[key] = subbody[key].value
        ? subbody[key].value
        : `<${subbody[key].title}>`;
    }
  });
  return request;
};

export const ResponseJsonView = ({ body }: ResponseJsonViewProps) => {
  if (body === null || typeof body === "string" || typeof body === "number") {
    return <div>Not Implemented</div>;
  }
  const keys = Object.keys(body);
  const request: JSONR = {};
  keys.forEach((key) => {
    if (body[key].children === undefined) {
      request[key] = body[key].value ? body[key].value : `<${body[key].title}>`;
    } else {
      request[key] = getSubJson(body[key].children);
    }
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
