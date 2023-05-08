const express = require("express");
const router = express.Router();
const {
  createMerchant,
  getMerchants,
  getMerchant,
  editMerchant,
  deleteMerchant,
  getAccount,
  editAccount,
  deleteAccount
} = require("../controllers/merchants");
const { validatorMerchant } = require("../validators/merchants");
const { adminsAuthMiddleware, merchantsAuthMiddleware } = require("../middleware/authMiddleware");

/**
 * @openapi
 * /merchants:
 *  post:
 *      tags:
 *      - Merchant Management for Admins
 *      summary: Register Merchant
 *      description: Register a new merchant creating it an its webpage with default values and published set to false
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchant"     
 *      responses:
 *          '200':
 *              description: Creates merchant, returns infinite token for it.
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", adminsAuthMiddleware, validatorMerchant, createMerchant);

/**
 * @openapi
 * /merchants:
 *  get:
 *      tags:
 *      - Merchant Management for Admins
 *      summary: Get Merchants
 *      description: Gets a list of all the Merchants in the system
 *      responses:
 *          '200':
 *              description: Return list of Merchants.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", adminsAuthMiddleware, getMerchants);

/**
 * @openapi
 * /merchants/account/{id}:
 *  get:
 *      tags:
 *      - Merchant Management for Admins
 *      summary: Get Merchant
 *      description: Get a Merchant and its token by its id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the merchant
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467     
 *      responses:
 *          '200':
 *              description: Returns merchant and infinite token for it.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/account/:id", adminsAuthMiddleware, getMerchant);

/**
 * @openapi
 * /merchants/account/{id}:
 *  put:
 *      tags:
 *      - Merchant Management for Admins
 *      summary: Edit Merchant
 *      description: Edit a Merchant by its id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the merchant
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467  
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchant"        
 *      responses:
 *          '200':
 *              description: Edit merchant and returns OK.
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/account/:id", adminsAuthMiddleware, validatorMerchant, editMerchant);

/**
 * @openapi
 * /merchants/account/{id}:
 *  delete:
 *      tags:
 *      - Merchant Management for Admins
 *      summary: Delete Merchant
 *      description: Deletes a Merchant by its id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the merchant
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467     
 *      responses:
 *          '200':
 *              description: Deletes Merchant and returns OK.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/account/:id", adminsAuthMiddleware, deleteMerchant);

/**
 * @openapi
 * /merchants/account:
 *  get:
 *      tags:
 *      - Account Management for Merchants
 *      summary: Get Merchant
 *      description: Get a Merchant represented by the token   
 *      responses:
 *          '200':
 *              description: Returns merchant and infinite token for it.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/account", merchantsAuthMiddleware, getAccount);

/**
 * @openapi
 * /merchants/account:
 *  put:
 *      tags:
 *      - Account Management for Merchants
 *      summary: Edit Merchant
 *      description: Edit a Merchant by its id
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/merchant"        
 *      responses:
 *          '200':
 *              description: Edit merchant and returns OK.
 *          '401':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/account", merchantsAuthMiddleware, validatorMerchant, editAccount);

/**
 * @openapi
 * /merchants/account:
 *  delete:
 *      tags:
 *      - Account Management for Merchants
 *      summary: Delete Merchant
 *      description: Deletes a Merchant by its id    
 *      responses:
 *          '200':
 *              description: Deletes Merchant and returns OK.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/account", merchantsAuthMiddleware, deleteAccount);


module.exports = router;
