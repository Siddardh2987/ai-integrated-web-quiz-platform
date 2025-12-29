// middleware/adminAuth.js
import jwt from "jsonwebtoken";

const adminAuth = async(req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login as admin'
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.json({
                success: false,
                message: 'Not Authorized. Please login as admin'
            });
        }

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecode.role !== 'admin'){
            return res.json({
                success: false,
                message: 'Access denied. Admin only'
            });
        }
        
        req.userId = tokenDecode.id;
        req.userRole = tokenDecode.role;
        next();
        
    }catch(e){
        return res.json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
}

export default adminAuth;