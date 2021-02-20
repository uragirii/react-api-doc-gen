import { Collection } from "./types";

export const API_Collection: Collection = {
  auth: {
    type: "bearer",
    request: {
      description:
        "We use OAuth 2.0 for authenticating all our requests. First get the token using your `client_id` and `client_secret`. You can get your `client_id` and `client_secret` from 'Account Settings' in Developer Solvio",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: {
        client_id: {
          type: "string",
          required: true,
          title: "Your client_id",
          description: "Client ID is unique to each Group / Organization."
        },
        client_secret: {
          type: "string",
          required: true,
          title: "Your client_secret",
          description: "Client Secret is unique to each Group / Organization."
        },
        grant_type: {
          type: "string",
          required: true,
          title: "Grant Type as per OAuth2 Specification",
          value: "client_credentials"
        }
      },
      url:
        "https://accounts.trysolvio.ai/auth/realms/developer/protocol/openid-connect/token",
      title: "Authorization",
      responses: [
        {
          statusCode: 200,
          body: {
            access_token: {
              type: "string",
              truncate: true,
              required: true,
              title: "Access Token",
              description:
                "This is the Bearer token that needs to be passed with each request"
            },
            expires_in: {
              type: "number",
              truncate: false,
              required: true,
              title: "Expiry Time for access token",
              description: "Expiry Time for token in seconds"
            },
            refresh_expires_in: {
              type: "number",
              truncate: false,
              required: true,
              title: "Expiry Time for refresh token",
              description: "Expiry Time for refresh token in seconds"
            },
            refresh_token: {
              type: "string",
              truncate: true,
              required: true,
              title: "Refresh Token",
              description:
                "This token can be used to get a new access token without passing client id and client secret"
            },
            token_type: {
              type: "string",
              truncate: false,
              required: true,

              title: "Type of Token",
              value: "bearer"
            },
            "not-before-policy": {
              type: "number",
              title: "not-before-policy",
              required: true
            },
            session_state: {
              type: "string",
              required: true,

              title: "session_state"
            },
            scope: {
              type: "number",
              title: "Scope",
              required: true,

              value: "email profile"
            }
          }
        }
      ]
    }
  },
  title: "Developer Solvio",
  version: "v1.0",
  requests: [
    {
      method: "POST",
      body: {
        src: {
          type: "string",
          truncate: true,
          truncateLength: 22,
          required: true,
          title: "Base64 Image",
          description:
            "The image that needs to be processed in base64 encoded format"
        }
      },
      responses: [
        {
          statusCode: 200,
          body: {
            latex: {
              type: "string",
              truncate: false,
              required: true,
              title: "LaTeX",
              description: "The text detected in the image in LaTeX formatting."
            }
          }
        }
      ],
      url: "/text/digital",
      title: "Text OCR (Digital)",
      description: "Digital version of Text OCR"
    },
    {
      method: "POST",
      body: {
        function: {
          type: "string",
          truncate: false,
          required: false,
          title: "Function",
          description:
            "The function expected. Default value is empty string('')."
        },
        src: {
          type: "string",
          truncate: true,
          truncateLength: 22,
          required: true,
          title: "Base64 Image",
          description:
            "The image that needs to be processed in base64 encoded format"
        },
        scaleX: {
          type: "number",
          truncate: false,
          required: false,
          title: "Scale X",
          description: "The scale of image in X direction"
        },
        scaleY: {
          type: "number",
          truncate: false,
          required: false,
          title: "Scale Y",
          description: "The scale of image in Y direction"
        },
        classificationType: {
          type: "string",
          truncate: false,
          required: false,
          title: "Classification Type",
          description:
            "The classification type. Default value is empty string('')"
        }
      },
      responses: [
        {
          statusCode: 200,
          body: {
            graphCharacterstics: {
              type: "object",
              truncate: false,
              required: false,
              title: "Graph Characterstics",
              description: "Characterstics of the graph sent",
              children: {
                blank: {
                  type: "boolean",
                  truncate: false,
                  required: false,
                  title: "Blank",
                  description: "Whether the graph is blank"
                },
                grid: {
                  type: "boolean",
                  truncate: false,
                  required: false,
                  title: "Grid",
                  description: "Whether the graph contains grid"
                },
                title: {
                  type: "boolean",
                  truncate: false,
                  required: false,
                  title: "Title",
                  description: "Title of the graph"
                },
                xLabel: {
                  type: "string",
                  truncate: false,
                  required: false,
                  title: "X Label",
                  description: "Label of X axis"
                },
                yLabel: {
                  type: "string",
                  truncate: false,
                  required: false,
                  title: "Y Label",
                  description: "Label of Y axis"
                },
                scaleX: {
                  type: "number",
                  truncate: false,
                  required: false,
                  title: "Scale X",
                  description: "Scale of Graph in X direction"
                },
                scaleY: {
                  type: "number",
                  truncate: false,
                  required: false,
                  title: "Scale Y",
                  description: "Scale of Graph in Y direction"
                },
                handDrawn: {
                  type: "boolean",
                  truncate: false,
                  required: false,
                  title: "Hand Drawn",
                  description: "Whether Graph is Handdrawn"
                },
                plotType: {
                  type: "enum",
                  truncate: false,
                  required: false,
                  title: "Plot Type",
                  enum: ["SCATTER", "LINE_PLOT"],
                  description: "Type of Plot"
                }
              }
            },
            functionCharacterstics: {
              type: "object",
              truncate: false,
              required: false,
              title: "Function Characterstics",
              description: "Characterstics of the function detected",
              children: {
                function: {
                  type: "enum",
                  enum: ["LINE", "PARABOLA"],
                  required: false,
                  title: "Function",
                  description: "Detected function"
                },
                xIntersection: {
                  title: "X Intersection",
                  type: "boolean",
                  required: false,
                  description: "Intersection on X axis"
                },
                yIntersection: {
                  title: "Y Intersection",
                  type: "boolean",
                  required: false,
                  description: "Intersection on Y axis"
                },
                quadrants: {
                  title: "Quadrants",
                  type: "array",
                  required: false,
                  description: "Array of quadrants in which function is present"
                },
                equation: {
                  title: "Equation",
                  type: "string",
                  required: false,
                  description: "Equation of the function"
                },
                points: {
                  title: "Points",
                  type: "array",
                  required: false,
                  description: "Array of points in {x:0, y:0} format"
                },
                coordinates: {
                  title: "Coordinates",
                  type: "array",
                  required: false,
                  description: "Array of coordinates in {x:0, y:0} format"
                },
                parameters: {
                  title: "Parameters",
                  type: "object",
                  required: false,
                  description: "Parameters of the function"
                }
              }
            }
          }
        }
      ],
      url: "/graph/understanding",
      title: "Graph Understanding",
      description:
        "Understands the graph and returns graph characterstics and the functions drawn in the graph"
    }
  ],
  baseURL: "https://developer.trysolvio.ai/api"
};
