

const isAdmin = (req, res, next) => {
  if (req.headers.role === 'admin') {
   return next();
  } else {
    return res.status(403).json({
      message: "Access denied"
    });
  }
};
export default isAdmin;
