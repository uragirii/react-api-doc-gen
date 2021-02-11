import { Authorization, Request as IRequest } from "./types";
import { RequestBody } from "./RequestBody";
import { ResponseBody } from "./ResponseBody";
import { CopyBlock, dracula } from "react-code-blocks";
import { RequestJsonView, ResponseJsonView } from "./JsonView";
import { pythonCodeGen } from "./utils";

interface RequestProps {
  request: IRequest;
  mainURL: string;
}

const jsCode = (request: IRequest, auth: Authorization | null) => {
  const { url, body, headers: prevHeaders, method } = request;
  if (typeof body === "string" || typeof body === "number" || body === null) {
    return "Not Implemented";
  }
  const keys = Object.keys(body);
  const payload = keys
    .map((key) => {
      return `${key} : ${
        body[key].value ? `'${body[key].value}'` : `'<${body[key].title}>'`
      },`;
    })
    .join("\n        ");
  let headers: { [key: string]: string };
  if (!prevHeaders) {
    headers = {
      "Content-Type": "application/json"
    };
  } else {
    headers = prevHeaders;
  }
  const headerKeys = Object.keys(headers);
  const headerCode = headerKeys
    .map((key) => {
      return `'${key}' : '${headers[key]}',`;
    })
    .join("\n");
  return `
  fetch("${url}", {
      method: "${method}",
      headers : {
        ${headerCode}
      },
      body : {
        ${payload}
      }
    }).then(res => console.log(res.json()))
  `;
};

export const Request = ({ request, mainURL }: RequestProps) => {
  const {
    title,
    description,
    auth = "parent",
    method,
    url,
    body,
    responses
  } = request;
  return (
    <div style={{ marginTop: "1em" }}>
      <div style={{ fontSize: "1.5em" }}>
        {" "}
        <code>{method}</code> {title}
      </div>

      <div style={{ width: "100%", display: "flex", backgroundColor: "#EEE" }}>
        <div style={{ flex: 1, maxWidth: "50%" }}>
          <div style={{ flex: 1, padding: "0.5em", fontSize: "0.9em" }}>
            <div>{description}</div>
          </div>
          <div style={{ fontWeight: "bold" }}>Request</div>
          <div>
            <code>{url}</code>
          </div>
          <RequestBody body={body} />
          <div style={{ fontWeight: "bold", marginTop: "1.5em" }}>Response</div>
          {responses.map((response) => {
            return (
              <ResponseBody response={response} key={response.statusCode} />
            );
          })}
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#2E3336",
            color: "white",
            width: "50%",
            fontFamily: "Consolas"
          }}
        >
          <div style={{ marginBottom: "1.5em" }}>
            <div
              style={{
                marginBottom: "0.5em",
                fontWeight: "bold",
                marginTop: "0.5em",
                marginLeft: "0.5em"
              }}
            >
              Request JSON
            </div>
            <RequestJsonView body={body} />
            <div
              style={{
                marginBottom: "0.5em",
                fontWeight: "bold",
                marginTop: "0.5em",
                marginLeft: "0.5em"
              }}
            >
              Response JSON
            </div>
            <ResponseJsonView body={responses[0].body} />
          </div>
          <div
            style={{
              marginBottom: "0.5em",
              fontWeight: "bold",
              marginTop: "0.5em",
              marginLeft: "0.5em"
            }}
          >
            Code
          </div>
          <CopyBlock
            text={pythonCodeGen(
              { ...request, url: mainURL + request.url },
              auth === "parent" ? { type: "bearer" } : auth
            )}
            language={"python"}
            showLineNumbers={false}
            theme={dracula}
            codeBlock
          />
        </div>
      </div>
    </div>
  );
};
