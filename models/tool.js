module.exports = (sequelize, Sequelize, toolCategory) => {
    const Tool = sequelize.define("tool",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                field: 'id'
            },
            description: {
                type: Sequelize.STRING
            },
            hire_price: {
                type: Sequelize.DOUBLE
            },
            image: {
                type: Sequelize.BLOB
            }
        },
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'tool'
    });

    Tool.belongsTo(toolCategory, {
        foreignKey: 'tool_category_id'
    });

    return Tool;
};