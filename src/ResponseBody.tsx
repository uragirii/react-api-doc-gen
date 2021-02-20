import React from "react";
import { useEffect, useState } from "react";
import { Response, Schema } from "./types";

interface ResponseBodyProps {
  response: Response;
}

interface SubBodyProps {
  body: undefined | { [key: string]: Schema };
  show: boolean;
  level: number;
}

const SubBody = ({ body, show, level }: SubBodyProps) => {
  const [keyExpand, setKeyExpand] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const temp: { [key: string]: boolean } = {};
    if (typeof body === "object") {
      Object.keys(body).forEach((key) => {
        if (body[key]["type"] === "object") {
          temp[key] = false;
        }
      });
    }
    setKeyExpand(temp);
  }, [body]);
  if (!body || !show) {
    return null;
  }

  const keys = Object.keys(body);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginLeft: "0.5em" }}
    >
      {keys.map((key) => {
        const subBody = body[key];
        return (
          <React.Fragment key={key}>
            <div style={{ marginTop: "0.5em", display: "flex" }} key={key}>
              <div
                style={{
                  flex: 1,
                  cursor: body[key].type === "object" ? "pointer" : "auto"
                }}
                onClick={() => {
                  if (body[key].type === "object") {
                    setKeyExpand({ ...keyExpand, [key]: !keyExpand[key] });
                  }
                }}
              >
                <code style={{ marginLeft: `${0.7 * level}em` }}>{key}</code>
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
            <SubBody
              body={subBody.children}
              show={keyExpand[key]}
              level={level + 1}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export const ResponseBody = ({ response }: ResponseBodyProps) => {
  const { body } = response;
  const [keyExpand, setKeyExpand] = useState<{ [key: string]: boolean }>({});
  useEffect(() => {
    const temp: { [key: string]: boolean } = {};
    if (typeof body === "object") {
      Object.keys(body).forEach((key) => {
        if (body[key]["type"] === "object") {
          temp[key] = false;
        }
      });
    }
    setKeyExpand(temp);
  }, [body]);
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
  if (Array.isArray(body)) {
    return <div>Array not implemented</div>;
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
          <React.Fragment key={key}>
            <div style={{ marginTop: "1.5em", display: "flex" }} key={key}>
              <div
                style={{
                  flex: 1,
                  paddingLeft: "0.5em",
                  cursor: body[key].type === "object" ? "pointer" : "auto"
                }}
                onClick={() => {
                  if (body[key].type === "object") {
                    setKeyExpand({ ...keyExpand, [key]: !keyExpand[key] });
                  }
                }}
              >
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
            <SubBody body={subBody.children} show={keyExpand[key]} level={1} />
          </React.Fragment>
        );
      })}
    </div>
  );
};
