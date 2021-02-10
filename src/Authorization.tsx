import { Authorization as IAuthorization, Request as IRequest } from "./types";
import { RequestBody } from "./RequestBody";
import { CopyBlock, dracula } from "react-code-blocks";

interface AuthorizationProps {
  authorization: IAuthorization;
}

const jsCode = (api: string, method: IRequest["method"]) => {
  return `
    fetch("${api}", {
      method: "${method}",
      headers : {
        'Content-Type' : 'application/json'
      }
    })
  `;
};

const pythonCode = (url: string) => {
  return `
import requests

url = "${url}"

payload='grant_type=client_credentials&client_id=solvio&client_secret=499e8e0c-3200-4314-9a4b-aea90299584d'
headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

response = requests.request("POST", url, headers=headers, data=payload)

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
            text={pythonCode(authorization.request.url)}
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
