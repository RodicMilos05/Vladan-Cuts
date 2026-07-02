export const protect = (req, res, next) => {
  res.status(401);
  throw new Error('Za ovu funkciju je potrebna prijava korisnika.');
};

export const admin = (req, res, next) => {
  res.status(403);
  throw new Error('Za ovu funkciju su potrebna administratorska prava.');
};