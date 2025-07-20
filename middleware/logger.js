import EventLog from '../models/EventLog.js';

const logger = async (req, res, next) => {
    const start = Date.now();

    res.on('finish', async () => {
        const duration = Date.now() - start;

        try {
            await EventLog.create({
                action: 'API_REQUEST',
                details: {
                    method: req.method,
                    url: req.originalUrl,
                    statusCode: res.statusCode,
                    duration,
                },
            });
        } catch (error) {
            console.error('Logging error:', error);
        }
    });

    next();
};

export default logger;
