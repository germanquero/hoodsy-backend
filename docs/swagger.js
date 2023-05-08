const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Hoodsy API REST Documentation",
      version: "0.1.0",
      description: "Documentation for my Hoodsy API REST",
      contact: {
        name: "German Quero",
        email: "querojimenezg@gmail.com.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        user: {
          type: "object",
          required: [
            "name",
            "age",
            "city",
            "interests",
            "allowsReceivingOffers",
            "email",
            "password",
          ],
          properties: {
            name: {
              type: "string",
              example: "Menganito",
            },
            age: {
              type: "integer",
              example: 20,
            },
            city: {
              type: "string",
              example: "Madrid, Madrid",
            },
            interests: {
              type: "array",
              example: ["Fast food", "Comedy Shows", "Concerts"],
            },
            allowsReceivingOffers: {
              type: "boolean",
              example: false,
            },
            email: {
              type: "string",
              example: "menganito@mail.com",
            },
            password: {
              type: "string",
              example: "SuperSecretPassword",
            },
          },
        },
        info: {
          type: "object",
          required: [
            "name",
            "age",
            "city",
            "interests",
            "allowsReceivingOffers",
          ],
          properties: {
            name: {
              type: "string",
              example: "Menganito",
            },
            age: {
              type: "integer",
              example: 20,
            },
            city: {
              type: "string",
              example: "Madrid, Madrid",
            },
            interests: {
              type: "array",
              example: ["Fast food", "Comedy Shows", "Concerts"],
            },
            allowsReceivingOffers: {
              type: "boolean",
              example: false,
            },
          },
        },
        password: {
          type: "object",
          required: ["password"],
          properties: {
            password: {
              type: "string",
              example: "SuperSecretPassword",
            },
          },
        },
        email: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              example: "menganito@mail.com",
            },
          },
        },
        login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "menganito@mail.com",
            },
            password: {
              type: "string",
              example: "SuperSecretPassword",
            },
          },
        },
        admin: {
          type: "object",
          required: ["name", "email", "phoneNumber"],
          properties: {
            name: {
              type: "string",
              example: "Admin",
            },
            email: {
              type: "string",
              example: "admin@mail.com",
            },
            phoneNumber: {
              type: "string",
              example: "675872346",
            },
          },
        },
        merchant: {
          type: "object",
          required: ["name", "cif", "address", "city", "email", "phoneNumber"],
          properties: {
            name: {
              type: "string",
              example: "Merchant",
            },
            cif: {
              type: "string",
              example: "B-76345879",
            },
            address: {
              type: "string",
              example: "Sample Street, 6",
            },
            city: {
              type: "string",
              example: "Madrid, Madrid",
            },
            email: {
              type: "string",
              example: "merchant@mail.com",
            },
            phoneNumber: {
              type: "string",
              example: "675872346",
            },
          },
        },
        page: {
          type: "object",
          required: ["city", "location", "activity", "title", "summary"],
          properties: {
            city: {
              type: "string",
              example: "Madrid, Madrid",
            },
            location: {
              type: "string",
              example: "Sample Street, 6",
            },
            acitvity: {
              type: "string",
              example: "Concerts and Events",
            },
            title: {
              type: "string",
              example: "Title of you webpage",
            },
            summary: {
              type: "string",
              example: "Little description of the buissness",
            },
          },
        },
        texts: {
          type: "object",
          required: ["texts"],
          properties: {
            texts: {
              type: "array",
              example: [
                "One text",
                "Another text",
                "etc",
              ],
            },
          },
        },
        review: {
          type: "object",
          required: ["score", "review"],
          properties: {
            score: {
              type: "float",
              example: 4.5
            },
            review: {
              type: "string",
              example: "Your opinion on the buisness here"
            }
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
