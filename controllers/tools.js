const utilities = require('../utilities/utility');
const db = require('../models');
const Tool = db.tool;
const ToolCategory = db.toolCategory;
const azureBlobService = require('../services/azureBlobService');

getAll = async (req, res) => {
    const tool = await Tool.findAll({
        order:['id'],
        include: [{
            model: ToolCategory,
            required: true
        }]
    });
    res.status(200).json(tool);
}

getByDesc = async (req, res) => {
    const desc = req.params.value;

    try {
        const tool = await Tool.findAll(
            {
                where: { 
                    description: desc 
                },
                include: [{
                    model: ToolCategory,
                    required: true
                }]
            }
        );

        if (tool.length == 0) {
            throw new Error("Unable to find Tool with description: " + desc );
        }

        res.status(200).json(tool);
    }
    catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

getById = async (req, res) => {
    const id = req.params.id;

    try {
        const tool = await Tool.findByPk(id, {
            include: [{
                model: ToolCategory,
                required: true
            }]
        });
        
        if (tool == null || tool.length == 0) {
            throw new Error("Unable to find Tool with id: " + id);
        }

        res.status(200).json(tool);
    }
    catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

create = async (req, res) => {
    try {
        // Check if a image was uploaded
        if (!req.file) {
            throw new Error('No image uploaded');
        }

        let tool = {
            description: req.body.description,
            hire_price: req.body.hire_price,
            tool_category_id: req.body.tool_category_id,
            image: req.file
        };

        if (tool.description == null || tool.hire_price == null || tool.tool_category_id == null || tool.image == null) {
            throw new Error("Essential fields missing");
        }

        tool.image = await azureBlobService.upload(req.file);
        await Tool.create(tool);

        res.status(201).json(tool);
    }
    catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

deleting = async (req, res) => {
    const id = req.body.id;

    try {
        // Return tool from DB
        const tool = await Tool.findByPk(id);
        let imageName;

        if (!tool) {
            throw new Error("ID not found");
        }

        // Convert blob to string using utf8
        imageName = tool.image.toString('utf8')

        // delete tool from DB
        const deleted = await Tool.destroy({
            where: {
                id: id
            }
        });

        // delete image from Azure
        const imageDeleted = await azureBlobService.destroy(imageName);

        if (deleted == 0 || !imageDeleted) {
            throw new Error("An error has occurred whilst deleting the tool with an ID of " + id);
        }

        res.status(200).send("Tool deleted");
    }
    catch (error) {
        utilities.formatErrorResponse(res, 404, error.message);
    }
}

update = async (req, res) => {
    const id = req.body.id;

    try {
        if (!req.file) {
            throw new Error("No image has been provided");
        }

        let tool = {
            description: req.body.description,
            hire_price: req.body.hire_price,
            tool_category_id: req.body.tool_category_id,
            image: req.file
        };

        if (id == null || tool.description == null || tool.hire_price == null || tool.tool_category_id == null) {
            throw new Error("Missing essential fields");
        }

        // Retrieve record from DB
        let oldTool = await Tool.findByPk(id);

        if (!oldTool) {
            throw new Error("ID cannot be found");
        }

        // Delete old image
        let oldImageName = oldTool.image.toString("utf8");
        console.log(oldImageName);
        const deleted = await azureBlobService.destroy(oldImageName);

        if (!deleted) {
            throw new Error("Tool image could not be deleted");
        }

        // Upload new image
        oldTool.image = await azureBlobService.upload(req.file);

        oldTool.description = tool.description;
        oldTool.hire_price = tool.hire_price;
        oldTool.tool_category_id = tool.tool_category_id;

        await oldTool.save();

        res.status(200).json(oldTool);
    }
    catch (error) {
        utilities.formatErrorResponse(res, 400, error.message);
    }
}

module.exports = {getAll, getByDesc, getById, create, deleting, update};