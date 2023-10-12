import jwt from 'jsonwebtoken';

const generateJwt = (params: object, time: string, key: string) =>
  jwt.sign({ ...params }, key, { expiresIn: time });

export const tokenGenerator = (payload: object) => {
  const token = generateJwt(
    { ...payload },
    process.env.JWT_EXPIRATION || '30d',
    process.env.JWT_SECRET as string
  );
  return token;
};
export const verify = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
  return payload;
};
