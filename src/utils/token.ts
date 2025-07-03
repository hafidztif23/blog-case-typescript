import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET as string;

export const generateToken = (id: number) => jwt.sign({ id }, secret, { expiresIn: '1h' });
export const verifyToken = (token: string) => jwt.verify(token, secret);