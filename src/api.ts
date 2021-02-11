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
      url: "text/digital",
      title: "Text OCR (Digital)",
      description: "Digital version of Text OCR"
    }
  ],
  baseURL: "https://developer.trysolvio.ai/api/"
};
