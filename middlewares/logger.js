const LoggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();

    console.log(`[${timestamp}] Request Method: ${req.method} - IP: ${req.ip}`);
    
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] Response: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = LoggerMiddleware;
