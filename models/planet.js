module.exports = (sequelize, dataTypes) => {
    
    const Planet = sequelize.define('Planet', {
        name : {
            type : dataTypes.STRING,
            primaryKey : true
        },
        orbitalSpeed : {
            type : dataTypes.FLOAT
        },
        circumference : {
            type : dataTypes.FLOAT
        }
    }, 
    {
        freezeTableName : true
    });

    return Planet;
}