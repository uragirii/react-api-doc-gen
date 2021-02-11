import { Authorization as IAuthorization, Request } from "./types";
import { RequestBody } from "./RequestBody";
import { ResponseBody } from "./ResponseBody";
import { CopyBlock, dracula } from "react-code-blocks";

interface AuthorizationProps {
  authorization: IAuthorization;
}

const jsCode = (request: Request) => {
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

const pythonCode = (request: Request) => {
  const { url, body, headers: prevHeaders, method } = request;
  if (typeof body === "string" || typeof body === "number" || body === null) {
    return "Not Implemented";
  }
  const keys = Object.keys(body);
  const payload = keys
    .map((key) => {
      return `${key}=${
        body[key].value ? body[key].value : `'<${body[key].title}>'`
      }`;
    })
    .join("&");
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
import requests

url = "${url}"

payload="${payload}"
headers = {
  ${headerCode}
}

response = requests.request("${method}", url, headers=headers, data=payload)

print(response.text)
`;
};

export const Authorization = ({ authorization }: AuthorizationProps) => {
  return (
    <div style={{ marginTop: "1em" }}>
      <div style={{ fontSize: "1.5em" }}>
        {" "}
        <code>{authorization.request.method}</code> Authorization
      </div>

      <div style={{ width: "100%", display: "flex", backgroundColor: "#EEE" }}>
        <div style={{ flex: 1, maxWidth: "50%" }}>
          <div style={{ flex: 1, padding: "0.5em", fontSize: "0.9em" }}>
            <div>{authorization.request.description}</div>
          </div>
          <div style={{ fontWeight: "bold" }}>Request</div>
          <div>
            <code>{authorization.request.url}</code>
          </div>
          <RequestBody body={authorization.request.body} />
          <div style={{ fontWeight: "bold", marginTop: "1.5em" }}>Response</div>
          {authorization.request.responses.map((response) => {
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
          <CopyBlock
            text={pythonCode(authorization.request)}
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
