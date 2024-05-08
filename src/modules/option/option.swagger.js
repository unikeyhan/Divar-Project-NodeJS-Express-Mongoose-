/**
 * @swagger
 * tags:
 *  name: Option
 *  description: Option module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateOption:
 *              type: object
 *              required:
 *                  -   title
 *                  -   key
 *                  -   type
 *                  -   category
 *              properties:
 *                  title:
 *                      type: string
 *                  key:
 *                      type: string
 *                  type:
 *                      type: string
 *                      enum:
 *                          -   number
 *                          -   string
 *                          -   array
 *                          -   boolean
 *                  enum:
 *                      type: string
 *                      items:
 *                          type: string
 *                  guide:
 *                      type: string
 *                  category:
 *                      type: string
 */

/**
 * @swagger
 * /option:
 *  post:
 *      summary: create new option
 *      tags:
 *          -   Option
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateOption'
 *      responses:
 *          201:
 *              description: successfully
 */

/**
 * @swagger
 * /option/{categoryId}:
 *  get:
 *      summary: get all options
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *          -   name: categoryId
 *          -   type: string
 *      responses:
 *          200:
 *              description: successfully
 */
