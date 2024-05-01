/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *
 */

/**
 * @swagger
 *
 * /auth/send-otp:
 *  post:
 *      summary: login with one time password in this endpoint
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/SendOTP"
 *
 *      responses:
 *          200:
 *              description: success
 *
 */
