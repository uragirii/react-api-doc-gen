import { Request, Schema } from "./types";

interface RequestBodyProps {
  body: Request["body"];
}

export const RequestBody = ({ body }: RequestBodyProps) => {
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
              <code>{key}</code> {subBody.required ? "(required)" : null}
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
