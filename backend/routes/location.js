const express = require('express');
const router = express.Router();

const responseHandler = require('../utils/responseHandler');
const statusCodes = require('../utils/statusCodes');
const { ERR_MESSAGES } = require('../utils/messages');

const locationController = require('../controllers/location');

router.get('/', async (req, res) => {
    try {
        const { q: searchTerm, skip, limit } = req.query;
        const results = await locationController.getLocationResults({ searchTerm, skip, limit });
        responseHandler.sendSuccessResponse(res, statusCodes.SUCCESS, results)
    } catch (error) {
        console.log(error);
        responseHandler.sendErrorResponse(res, statusCodes.INTERNAL_ERROR)
    }

});

module.exports = router;