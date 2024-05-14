const restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new CustomError("You don't have permission to access this item", 403),
      );
    }
    next();
  };
};
export default restrictTo;
