const express = require("express");
const {
  usersAuthMiddleware,
  merchantsAuthMiddleware,
} = require("../middleware/authMiddleware");
const {
  validatorPage,
  validatorTexts,
  validatorReview,
} = require("../validators/pages");
const {
  publishPage,
  deletePage,
  editPage,
  postPhoto,
  deletePhoto,
  postTexts,
  deleteTexts,
  getPages,
  getPicture,
  postReview,
  deleteReview,
} = require("../controllers/pages");
const uploadMiddleware = require("../utils/handleStorage")

const router = express.Router();

/**
 * @openapi
 * /webpages:
 *  post:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Publish Webpage
 *      description: Sets published to true for the corresponding webpage to the merchant represented by the authorization token
 *      responses:
 *          '200':
 *              description: Creates merchant, returns infinite token for it.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/", merchantsAuthMiddleware, publishPage);

/**
 * @openapi
 * /webpages:
 *  delete:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Un-publish Webpage
 *      description: Sets published to false for the corresponding webpage to the merchant represented by the authorization token
 *      responses:
 *          '200':
 *              description: Creates merchant, returns infinite token for it.
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/", merchantsAuthMiddleware, deletePage);

/**
 * @openapi
 * /webpages:
 *  put:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Edits Webpage
 *      description: Edits the data of the corresponding webpage to the merchant represented by the authorization token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/page"     
 *      responses:
 *          '200':
 *              description: Edits merchant, returns OK.
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.put("/", merchantsAuthMiddleware, validatorPage, editPage);

/**
 * @openapi
 * /webpages/photos:
 *  post:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Uploads photo to Webpage
 *      description: Uplaods photo to server storage and adds url to the array of photos of the corresponding webpage to the merchant represented by the authorization token
 *      consumes:
 *      - multipart/form-data
 *      parameters:
 *      - in: formData
 *        name: image
 *        type: file
 *        description: The image file to upload.
 *        required: true
 *      responses:
 *          '200':
 *              description: Edits merchant, returns OK.
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/photos", merchantsAuthMiddleware, uploadMiddleware.single("image"), postPhoto);

/**
 * @openapi
 * /webpages/photos/{filename}:
 *  delete:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Deletes photo from Webpage
 *      description: Deletes photo from server storage and remmoves url from the array of photos of the corresponding webpage to the merchant represented by the authorization token
 *      parameters:
 *          -   name: filename
 *              in: path
 *              description: Internal filename of the picture
 *              required: true
 *              schema:
 *                  type: string
 *                  example: page-photo-1683412377629.png
 *      responses:
 *          '200':
 *              description: Returns admin and token
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/photos/:filename", merchantsAuthMiddleware, deletePhoto);

/**
 * @openapi
 * /webpages/text:
 *  post:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Adds texts to Webpage
 *      description: Edits array of texts that will be posted to the corresponding webpage to the merchant represented by the authorization token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/texts"     
 *      responses:
 *          '200':
 *              description: Add texts,  returns OK.
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.post("/texts", merchantsAuthMiddleware, validatorTexts, postTexts);

/**
 * @openapi
 * /webpages/text:
 *  delete:
 *      tags:
 *      - Webpages Management for Merchants
 *      summary: Delete texts from Webpage
 *      description: Removes all coinciddences with the array given in the petition from the array of texts of the corresponding webpage to the merchant represented by the authorization token
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/texts"     
 *      responses:
 *          '200':
 *              description: Removes texts, returns OK.
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/texts", merchantsAuthMiddleware, validatorTexts, deleteTexts);

/**
 * @openapi
 * /webpages:
 *  get:
 *      tags:
 *      - Public Info
 *      summary: Get pages
 *      description: Get pages, filtered by ID, city, activity and sorted by scoring
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: string
 *              description: Page ID
 *              example: 2365af3636h38g3345d7k467
 *          - in: query
 *            name: city
 *            schema:
 *              type: string
 *              description: City
 *              example: Madrid, Madrid
 *          - in: query
 *            name: activity
 *            schema:
 *              type: string
 *              description: Activity
 *              example: Fast Food
 *          - in: query
 *            name: scoring
 *            schema:
 *              type: boolean
 *              description: Sort pages by scoring in descending order
 *              example: true
 *      responses:
 *          '200':
 *              description: Returns webpages that matches the provided query.
 *          '500':
 *              description: Server error
 */
router.get("/", getPages);

/**
 * @openapi
 * /webpages/photos/{filename}:
 *  get:
 *      tags:
 *      - Public Info
 *      summary: View photos
 *      description: Open a viewing stream for viewing the pictures.
 *      parameters:
 *          -   name: filename
 *              in: path
 *              description: Internal filename of the picture
 *              required: true
 *              schema:
 *                  type: string
 *                  example: page-photo-1683412377629.png
 *      responses:
 *          '200':
 *              description: Streams photo
 *          '500':
 *              description: Server error
 */
router.get("/photos/:filename", getPicture);

/**
 * @openapi
 * /webpages/review/{id}:
 *  post:
 *      tags:
 *      - Reviewing Webpages
 *      summary: Post a review
 *      description: Post a review as the user in the token session. If the user already has a review it overrides it.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the webpage
 *              required: true
 *              schema:
 *                  type: ID
 *                  example: 2365af3636h38g3345d7k467
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/review"
 *      responses:
 *          '200':
 *              description: Posts review and returns OK
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.post("/review/:id", usersAuthMiddleware, validatorReview, postReview);

/**
 * @openapi
 * /webpages/review/{id}:
 *  delete:
 *      tags:
 *      - Reviewing Webpages
 *      summary: Delete a review
 *      description: Deletes any review in the webpage as user in the token session. If the user already has a review it overrides it.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: Id that represents the webpage
 *              required: true
 *              schema:
 *                  type: string
 *                  example: 2365af3636h38g3345d7k467
 *      responses:
 *          '200':
 *              description: Deletes review and returns OK
 *          '403':
 *              description: Validation error
 *          '500':
 *              description: Server error
 */
router.delete("/review/:id", usersAuthMiddleware, deleteReview);

module.exports = router;
