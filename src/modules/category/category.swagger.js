/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateCategory:
 *              type: object
 *              required:
 *                  -   name
 *                  -   icon
 *                  -   slug
 *              properties:
 *                  name:
 *                      type: string
 *                  slug:
 *                      type: string
 *                  icon:
 *                      type: string
 *                  parent:
 *                      type: string
 */

/**
 * @swagger
 * /category:
 *  post:
 *      summary: create new category
 *      tags:
 *          -   Category
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategory'
 *      responses:
 *          201:
 *              description: successfully
 */

/**
 * @swagger
 * /category:
 *  get:
 *      summary: get all categuries
 *      tags:
 *          -   Category
 *      responses:
 *          200:
 *              description: successfully
 */
/**
 * @swagger
 * /category/{id}:
 *  delete:
 *      summary: delete categury by id
 *      tags:
 *          -   Category
 *      parameters:
 *          -   in: path
 *              name: id
 *      responses:
 *          200:
 *              description: successfully
 */
