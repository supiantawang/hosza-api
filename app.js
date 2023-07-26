// IMPORT CUSTOM LOGGER
const { logger } = require('./util/common/log-handler');

// CONFIGURE ENVIRONMENT
global.configs = {};

const env = process.env.NODE_ENV;
/* if (env == 'production') {
    configs = require('./env/env-prod.json');
} else if (env == 'staging') {
    configs = require('./env/env-staging');
} else if (env == 'development') {
    configs = require('./env/env-dev');
} */
configs = require('./env/env-prod.json');

logger.info({
    message: `Current environment: ${configs.environment}`
});

// DEPENDENCIES
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// MULTER FILE UPLOAD CONFIG
const { v1: uuidv1 } = require('uuid');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tmpDirPath = path.join(configs.uploadDir, 'tmp');
        if (!fs.existsSync(tmpDirPath)){
            fs.mkdirSync(tmpDirPath);
        }
        cb(null, tmpDirPath);
    },
    filename: (req, file, cb) => {
        const mimeTypeArray = file.mimetype.split('/');
        const mimeType = mimeTypeArray[mimeTypeArray.length - 1];
        cb(null, `${uuidv1()}.${mimeType}`);
    }
});

// GLOBAL DEPENDENCIES
global.joi = require('joi');
global.fs = require('fs');
global.path = require('path');
global.upload = multer({ storage });
global.cron = require('node-cron');

// IMPORTING PROJECTS
const AuthAppConfigV1 = require("./config/auth/v1/app-config");
const AdminAppConfigV1 = require("./config/admin/v1/app-config");
const HisAppConfigV1 = require("./config/his/v1/app-config");
const IotAppConfigV1 = require("./config/iot/v1/app-config");
const WebAppConfigV1 = require("./config/web/v1/app-config");
const OutpatientConfig = require("./config/outpatient/app-config");

const app = express();

// ADDING MIDDLEWARE
app.use(cors());
app.use(express.json());  //body parser

// INITIALIZE PROJECT CONFIGURATIONS
AuthAppConfigV1.initAppConfig(app);
AdminAppConfigV1.initAppConfig(app);
HisAppConfigV1.initAppConfig(app);
IotAppConfigV1.initAppConfig(app);
WebAppConfigV1.initAppConfig(app);
OutpatientConfig.initAppConfig(app);

app.listen(configs.serverPort,()=>{
    logger.info({
        message: `Express server started on port ${configs.serverPort} on ${new Date()}`
    });
});