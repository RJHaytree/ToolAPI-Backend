const controller = require('../controllers/toolCategory');
var express = require('express');
var router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tool Category
 *   description: Tool category management and administration.
 */

/**
 * @swagger 
 * definitions:
 *   ToolCategory:
 *     required:
 *       - description
 *     properties:
 *       id:
 *         type: integer
 *         example: 3
 *       description: 
 *         type: string
 *         example: Cooling
 *   Error:
 *     properties:
 *       status:
 *         type: integer
 *         example: 404
 *       message:
 *         type: string
 *         example: No tool with an ID of 2 can be found
 */

/**
 * @swagger
 * /toolCategory/: 
 *   get:
 *     summary: Get all categories
 *     description: Returns all tool categories
 *     tags: [Tool Category]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: all tool categories are returned
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/ToolCategory'
 *       400:
 *         description: error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 *         
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /toolCategory/{id}:
 *   get:
 *     summary: Get a category by it's ID
 *     description: Return a tool category with a provided ID
 *     tags: [Tool Category]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the chosen category
 *         example: 3
 *     response:
 *       200:
 *         description: returns the specified tool category
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ToolCategory'
 *       400:
 *         description: error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.get('/:id', controller.getById);

module.exports = router;