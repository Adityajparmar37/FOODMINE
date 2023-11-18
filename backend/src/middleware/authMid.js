import jwt from "jsonwebtoken";

const authMid = (req, res, next) => {
    const token = req.headers.access_token;

    if (!token) return res.status(401).send();

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
    } catch (error) {
        res.status(401).send();
    }

    return next();
}

export default authMid;
