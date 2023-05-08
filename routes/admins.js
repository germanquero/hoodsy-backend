const express = require("express");
const router = express.Router();
const { validatorAdmin } = require("../validators/admins");
const {
  createAdmin,
  getAdmins,
  getAdmin,
  editAdmin,
  deleteAdmin,
} = require("../controllers/admins");
const { adminsAuthMiddleware } = require("../middleware/authMiddleware");

/**
 * @openapi
 * /admins:
 *  post:
 *      tags:
 *      - Admins Control
 *      summary: Creates admins
 *      description: Creates a new admin and returns permanent token that identifies him.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/admin"
 *      responses:
 *          '200':
 *              description: Creates admin, returns token
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", adminsAuthMiddleware, validatorAdmin, createAdmin);

/**
 * @openapi
 * /admins:
 *  get:
 *      tags:
 *      - Admins Control
 *      summary: Get all admins
 *      description: Returns a list of all the admins.
 *      responses:
 *          '200':
 *              description: Returns admins
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", adminsAuthMiddleware, getAdmins);

/**
 * @openapi
 * /admins/{id}:
 *  get:
 *      tags:
 *      - Admins Control
 *      summary: Get specific admin
 *      description: Returns admin info and the permanent token that identifies him.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the admin
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467
 *      responses:
 *          '200':
 *              description: Returns admin and token
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/:id", adminsAuthMiddleware, getAdmin);

/**
 * @openapi
 * /admins/{id}:
 *  put:
 *      tags:
 *      - Admins Control
 *      summary: Edits admin
 *      description: Edits an admin specified by his ID
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the admin
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/admin"
 *      responses:
 *          '200':
 *              description: Edits admin and returns OK
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", adminsAuthMiddleware, validatorAdmin, editAdmin);

/**
 * @openapi
 * /admins/{id}:
 *  delete:
 *      tags:
 *      - Admins Control
 *      summary: Delete specific admin
 *      description: Deletes admins specified by id.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the admin
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467
 *      responses:
 *          '200':
 *              description: Returns OK
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/:id", adminsAuthMiddleware, deleteAdmin);

module.exports = router;
