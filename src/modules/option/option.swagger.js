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
 *                      type: array
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
 * /option:
 *  get:
 *      summary: get all optoins
 *      tags:
 *          -   Option
 *      responses:
 *          200:
 *              description: successfully
 */

/**
 * @swagger
 * /option/by-category/{categoryId}:
 *  get:
 *      summary: get options by category Id
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

/**
 * @swagger
 * /option/{id}:
 *  get:
 *      summary: get option by id
 *      tags:
 *          -   Option
 *      parameters:
 *          -   in: path
 *              name: id
 *              type: string
 *      responses:
 *          200:
 *              description: successfully
 */
