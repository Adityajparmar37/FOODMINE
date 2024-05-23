import authMid from "./authMid.js";

const adminMid = (req, res, next) => {
  if (!req.user.isAdmin) res.status(403).send();

  return next();
};

export default [authMid, adminMid];
