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
            allowReceivingOffers: {
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
            allowReceivingOffers: {
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
              password: {
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
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
