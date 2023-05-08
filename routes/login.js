const express = require("express");
const {
  validatorEmail,
  validatorPassword,
  validatorInfo,
} = require("../validators/users");
const {
  registerUser,
  loginUser,
  forgotPassword,
  changeForgotPassword,
} = require("../controllers/login");
const router = express.Router();


/**
 * @openapi
 * /login/signup:
 *  post:
 *      tags:
 *      - Login And Register
 *      summary: Sings up new user
 *      description: Creates a new user and returns OK.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"     
 *      responses:
 *          '200':
 *              description: Edits account, returns OK
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post(
  "/signup",
  validatorEmail,
  validatorPassword,
  validatorInfo,
  registerUser
);

/**
 * @openapi
 * /login:
 *  post:
 *      tags:
 *      - Login And Register
 *      summary: Logs in user
 *      description: Creates temporary tokens for the user logged
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"     
 *      responses:
 *          '200':
 *              description: Returns token
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/", validatorEmail, validatorPassword, loginUser);

/**
 * @openapi
 * /login/forgot-password:
 *  post:
 *      tags:
 *      - Login And Register
 *      summary: Temporary link for forgotten passwords
 *      description: Creates temporary link for changin your password in case you forgot.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/email"     
 *      responses:
 *          '200':
 *              description: Returns temporary link
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/forgot-password", validatorEmail, forgotPassword);

/**
 * @openapi
 * /login/forgot-password/{token}:
 *  post:
 *      tags:
 *      - Login And Register
 *      summary: Changes the password(temporary)
 *      description: Handles the temporary link for changing the password when lost.
 *      parameters:
 *          -   name: token
 *              in: path
 *              description: 1h long token generated for the link to be temporary
 *              required: true
 *              schema:
 *                  type: string
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/password"     
 *      responses:
 *          '200':
 *              description: Chagens password, returns OK
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/forgot-password/:token", validatorPassword, changeForgotPassword);

module.exports = router;
