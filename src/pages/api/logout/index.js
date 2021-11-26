import cookie from 'cookie';

export default async function handler(req, res) {
  res.setHeader('Set-Cookie', [
    cookie.serialize(
      'userData',
      {},
      {
        httpOnly: true,
        maxAge: -1,
        sameSite: 'strict',
        path: '/',
      }
    ),
  ]);
  // res.status(200).json({ Success: false, data: null, msg: `See you later 🍪` });
  res.end();
}
