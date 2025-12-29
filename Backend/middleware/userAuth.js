// middleware/userAuth.js
import jwt from 'jsonwebtoken';

 const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login again'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login again'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.id;
        
        next();
        
    } catch (error) {
        return res.json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

export default userAuth;