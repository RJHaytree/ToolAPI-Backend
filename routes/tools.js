const controller = require('../controllers/tools');
var express = require('express');
var router = express.Router();
const upload = require('../middleware/upload');

/**
 * @swagger
 * tags: 
 *   name: Tool
 *   description: Tool management and administration
 */

/**
 * @swagger
 * definitions:
 *   Tool: 
 *     required:
 *       - description
 *       - hire_price
 *       - tool_category
 *     properties:
 *       id: 
 *         type: integer
 *         example: 4
 *       description:
 *         type: string
 *         example: Carpet Cleaner
 *       hire_price:
 *         type: integer
 *         example: 21.50
 *       tool_category:
 *         type: object
 *         $ref: '#/definitions/ToolCategory'
 *   NewTool:
 *     required: 
 *       - description
 *       - hire_price
 *       - tool_category_id
 *     properties:
 *       description:
 *         type: string
 *         example: Power Washer
 *       hire_price:
 *         type: integer
 *         example: 16.70
 *       tool_category_id:
 *         type: integer
 *         example: 1
 *   ID: 
 *     required:
 *       - id
 *     properties:
 *       id:
 *         type: integer
 *         example: 15
 */

/**
 * @swagger
 * /tools/:
 *   get:
 *     summary: Get all tools
 *     description: Returns all tools in the service
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     responses: 
 *       200:
 *         description: all tools are returned
 *         schema:
 *           type: array
 *           items: 
 *             type: object
 *             $ref: '#/definitions/Tool'
 *       400:
 *         description: error
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /tools/desc/{value}:
 *   get:
 *     summary: Get tool by description
 *     description: Get tools according to a provided description
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Description of the chosen tool
 *         example: Floor Sander
 *     responses:
 *       200:
 *         description: returned tool with the provided description
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Tool'
 *       400:
 *         description: error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.get('/desc/:value', controller.getByDesc);

/**
 * @swagger
 * /tools/{id}:
 *   get:
 *     summary: Get a tool according to an ID
 *     description: Get a tool according to a provided ID
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the chosen tool
 *         example: 8
 *     responses:
 *       200:
 *         description: returned the tool with the corresponding ID
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Tool'
 *       400:
 *         description: error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /tools/:
 *   post:
 *     summary: Create a new tool
 *     description: Create a new tool and upload it to the database
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tool
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NewTool'
 *         required: true
 *         description: The tool to be added
 *     responses:
 *       201:
 *         description: a new tool has been created
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NewTool'
 *       400:
 *         description: error
 *         schema:
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.post('/', upload.single("image"), controller.create);

/**
 * @swagger
 * /tools/:
 *   delete:
 *     summary: Delete an existing tool
 *     description: Delete a tool from the service using an ID
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: id
 *         schema:
 *           type: object
 *           $ref: '#/definitions/ID'
 *         description: ID of the tool to be deleted
 *     responses:
 *       200:
 *         description: confirmation message
 *         type: string
 *       404:
 *         description: error
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.delete('/', controller.deleting);

/**
 * @swagger
 * /tools/:
 *   put:
 *     summary: Update an existing tool
 *     description: Update properties for an existing tool
 *     tags: [Tool]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: tool
 *         schema:
 *           type: object
 *           $ref: '#/definitions/NewTool'
 *         required: true
 *         description: The tool being updated with the updated properties
 *     responses:
 *       200:
 *         description: the tool following the update
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/NewTool'
 *       400:
 *         description: error
 *         schema: 
 *           type: object
 *           $ref: '#/definitions/Error'
 */
router.put('/', upload.single("image"), controller.update);

module.exports = router;