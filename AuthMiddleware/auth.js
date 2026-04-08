const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Bạn cần gửi Access Token ở header để sử dụng API này (Unauthorized).' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'super_secret_key_123';
        const decoded = jwt.verify(token, secret);
        
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn (Forbidden).' });
    }
};

module.exports = verifyToken;