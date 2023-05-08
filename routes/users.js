const express = require("express");
const {getUser, getUsers} = require("../controllers/users");
const { merchantsAuthMiddleware } = require("../middleware/authMiddleware");
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
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467     
 *      responses:
 *          '200':
 *              description: Returns user
 *          '500':
 *              description: Server error
 */
router.get("/public/:id", getUser);

/**
 * @openapi
 * /users/offers:
 *  get:
 *      tags:
 *      - Offers Info for Merchants
 *      summary: Get specific user
 *      description: Returns public info of a user specified by id.
 *      parameters:
 *          - in: query
 *            name: activity
 *            schema:
 *              type: string
 *              description: Activity
 *              example: Fast Food
 *      responses:
 *          '200':
 *              description: Returns user
 *          '500':
 *              description: Server error
 */
router.get("/offers", merchantsAuthMiddleware, getUsers);

module.exports = router;

