import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ errMessage: 'User Unauthorised' });

    const validatedUser = jwt.verify(token, process.env.SE_KEY);
    req.user = validatedUser.id;
    next();
  } catch (error) {
    return res.status(401).json({ errMessage: 'Unauthorized User' });
  }
};
