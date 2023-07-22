export const signInWithPassword = async (email: string, password: string) => {
  const body = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body }
  );
  return response;
};

export const verifyIdToken = async (
  idToken: string,
  refreshToken: string
): Promise<{ verified: boolean; idToken?: string; expiresIn?: number }> => {
  /**
   * Verify ID token
   */

  // https://firebase.google.com/docs/reference/rest/auth#section-get-account-info
  const verifyIdTokenBody = JSON.stringify({ idToken });
  const verifyIdTokenResponse = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: verifyIdTokenBody,
    }
  );

  if (verifyIdTokenResponse.ok) {
    return { verified: true };
  }

  /**
   * Exchange a refresh token for an ID token
   */
  // https://firebase.google.com/docs/reference/rest/auth#section-refresh-token
  const getIdTokenBody = JSON.stringify({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  const getIdTokenResponse = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: getIdTokenBody,
    }
  );

  if (!getIdTokenResponse.ok) {
    return { verified: false };
  }

  const json = await getIdTokenResponse.json();
  const { id_token, expires_in } = json;
  return { verified: true, idToken: id_token, expiresIn: expires_in };
};
