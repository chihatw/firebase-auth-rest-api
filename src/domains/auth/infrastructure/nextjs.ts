import { cookies } from 'next/headers';
export const setCookies = (
  idToken: string,
  refreshToken: string,
  expiresIn: number
) => {
  const idTokenCookie = {
    name: 'idToken',
    value: idToken,
    maxAge: expiresIn, // default 3600 sec（1時間）
    httpOnly: true,
    secure: true,
  };
  // https://nextjs.org/docs/app/api-reference/functions/cookies
  cookies().set(idTokenCookie);

  const refreshTokenCookie = {
    name: 'refreshToken',
    value: refreshToken,
    maxAge: 60 * 60 * 24 * 180, // 180 days　長い期間にしても設定できない
    httpOnly: true,
    secure: true,
  };
  cookies().set(refreshTokenCookie);
};

export const deleteCookies = () => {
  cookies().delete('idToken');
  cookies().delete('refreshToken');
};
