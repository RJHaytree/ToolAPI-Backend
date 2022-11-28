module.exports = (sequelize, Sequelize) => {
    const ToolCategory = sequelize.define("tool_category", {
        description: {
            type: Sequelize.STRING
        }
    }, 
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tool_category'
    });

    return ToolCategory;
}