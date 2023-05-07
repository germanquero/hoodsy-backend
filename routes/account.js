const express = require("express");
const { usersAuthMiddleware } = require("../middleware/authMiddleware");
const {
  getAccount,
  editAccount,
  deleteAccount,
  verifyPasswordChange,
  passwordChange,
  changeEmail,
} = require("../controllers/account");
const {
  validatorEmail,
  validatorPassword,
  validatorInfo,
} = require("../validators/users");
const router = express.Router();

/**
 * @openapi
 * /account:
 *  get:
 *      tags:
 *      - Account Management for Users
 *      summary: Gets account
 *      description: Gets account info of the user in the token session.
 *      responses:
 *          '200':
 *              description: Returns the account
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", usersAuthMiddleware, getAccount);

/**
 * @openapi
 * /account:
 *  put:
 *      tags:
 *      - Account Management for Users
 *      summary: Edits account
 *      description: Edits account info of the user in the token session.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/info"     
 *      responses:
 *          '200':
 *              description: Edits account, returns OK
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/", usersAuthMiddleware, validatorInfo, editAccount);

/**
 * @openapi
 * /account:
 *  delete:
 *      tags:
 *      - Account Management for Users
 *      summary: Deletes account
 *      description: Deletes account of the user in the token session.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/password"     
 *      responses:
 *          '200':
 *              description: Deletes account, returns OK
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/", usersAuthMiddleware, validatorPassword, deleteAccount);

/**
 * @openapi
 * /account/change-password:
 *  post:
 *      tags:
 *      - Account Management for Users
 *      summary: Generates link for changing password
 *      description: Generates a 1h long temporary link for the user in the token session to change the password.  
 *      responses:
 *          '200':
 *              description: Returns temporary link
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/change-password", usersAuthMiddleware, verifyPasswordChange);

/**
 * @openapi
 * /account/change-password/{token}:
 *  post:
 *      tags:
 *      - Account Management for Users
 *      summary: Changes the password(temporary)
 *      description: Handles the temporary link for changing the password of the account of the user in the token session.
 *      parameters:
 *          -   name: token
 *              in: path
 *              description: 1h long token generated for the link to be temporary
 *              required: true
 *              schema:
 *                  type: JWT token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/password"     
 *      responses:
 *          '200':
 *              description: Chagens password, returns OK
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post(
  "/change-password/:token",
  usersAuthMiddleware,
  validatorPassword,
  passwordChange
);

/**
 * @openapi
 * /account/change-email:
 *  post:
 *      tags:
 *      - Account Management for Users
 *      summary: Changes the email
 *      description: Changes the email of the account of the user in the token session.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"     
 *      responses:
 *          '200':
 *              description: Chagens email, returns OK
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post(
  "/change-email",
  usersAuthMiddleware,
  validatorEmail,
  validatorPassword,
  changeEmail
);

module.exports = router;
