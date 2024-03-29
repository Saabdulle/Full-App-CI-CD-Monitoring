const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");
const vpc = require("./vpc");
const vars = require("../utils/vars")
const db_subnetGroup = require("./db_subnetGroup")

const db_instance = new aws.rds.Instance(`${vars.projectName}db`, {
    instanceClass:vars.dbInstanceClass,
    allocatedStorage:vars.dbAllocatedSotrage,
    dbName:`${vars.projectName}db`,
    engine:vars.dbEngine,
    engineVersion:vars.dbEngineVersion,
    identifier:`${vars.projectName}db`,
    password:vars.dbPassword,
    port:5432,
    // publiclyAccessible:true,
    skipFinalSnapshot:true,
    username:vars.dbUsername,
    vpcSecurityGroupIds:vpc.vpcSecurityGroupIds,
    dbSubnetGroupName:db_subnetGroup.dbSubnetGroupName
})

module.exports = db_instance