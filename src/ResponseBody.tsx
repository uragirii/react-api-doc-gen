import { Response } from "./types";

interface ResponseBodyProps {
  response: Response;
}

export const ResponseBody = ({ response }: ResponseBodyProps) => {
  const { body, statusCode } = response;
  if (body === null) {
    return (
      <div>
        <code>null</code>
      </div>
    );
  }
  if (typeof body === "number") {
    return <div>Number not implemented</div>;
  }
  if (typeof body === "string") {
    return <div>String not implemented</div>;
  }
  const keys = Object.keys(body);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginTop: "1.5em", display: "flex", fontWeight: "bold" }}>
        <div style={{ flex: 1, paddingLeft: "0.5em" }}>Parameter</div>
        <div style={{ flex: 1, paddingLeft: "0.5em", paddingRight: "0.5em" }}>
          Type
        </div>
        <div style={{ flex: 1 }}>Description</div>
      </div>
      {keys.map((key) => {
        const subBody = body[key];
        return (
          <div style={{ marginTop: "1.5em", display: "flex" }} key={key}>
            <div style={{ flex: 1, paddingLeft: "0.5em" }}>
              <code>{key}</code>
            </div>
            <div
              style={{ flex: 1, paddingLeft: "0.5em", paddingRight: "0.5em" }}
            >
              {`(${subBody.type})`}
            </div>
            <div style={{ flex: 1, paddingRight: "0.5em" }}>
              {subBody.description}
            </div>
          </div>
        );
      })}
    </div>
  );
};
