export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  jwt.verify(token, process.env.SE_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Failed to authenticate token' });

    if (decoded.role !== 'admin') return res.status(403).json({ error: 'Not authorized' });
    next();
  });
};
