const express = require("express");
const {getUser} = require("../controllers/users");
const router = express.Router();

/**
 * @openapi
 * /users/{id}:
 *  get:
 *      tags:
 *      - Public Info
 *      summary: Get specific user
 *      description: Returns public info of a user specified by id.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the admin
 *              required: true
 *              schema:
 *                  type: ID
 *                  example: 2365af3636h38g3345d7k467     
 *      responses:
 *          '200':
 *              description: Returns user
 *          '500':
 *              description: Server error
 */
router.get("/:id", getUser);

module.exports = router;

