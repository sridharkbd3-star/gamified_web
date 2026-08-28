// ============================================================
// S.H.I.E.L.D. Platform — Google OAuth Integration Utility
// Google Identity Services (GIS) Frontend Helper
// ============================================================

export const GOOGLE_CLIENT_ID = '921915649365-dm15osk1c2cr7dosl1a30gmm11sq2eh9.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: any;
  }
}

/**
 * Loads the Google Identity Services script dynamically if not already loaded.
 */
export function loadGoogleGsiScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existingScript = document.getElementById('google-gsi-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Google script')));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Google Identity Services'));
    document.head.appendChild(script);
  });
}

export interface GoogleAuthResponse {
  success: boolean;
  role?: 'student' | 'teacher';
  user?: {
    id: string;
    googleId: string;
    name: string;
    email: string;
    picture?: string;
  };
  error?: string;
  message?: string;
}

/**
 * Parses JWT token payload on client safely for display metadata
 */
function parseJwtPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Triggers Google Authentication and verifies credentials with backend API
 */
export async function authenticateWithGoogle(role: 'student' | 'teacher'): Promise<GoogleAuthResponse> {
  try {
    await loadGoogleGsiScript();

    return new Promise((resolve) => {
      if (!window.google?.accounts?.id) {
        resolve({
          success: false,
          error: 'GIS_NOT_LOADED',
          message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
        });
        return;
      }

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: any) => {
          const credential = response.credential;
          if (!credential) {
            resolve({
              success: false,
              error: 'NO_CREDENTIAL',
              message: 'GOOGLE AUTHENTICATION CANCELLED',
            });
            return;
          }

          const jwtPayload = parseJwtPayload(credential);

          try {
            // Post token credential to backend API for verification & authorization
            const apiRes = await fetch('/api/auth/google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                credential,
                role,
                googleUser: jwtPayload
                  ? {
                      sub: jwtPayload.sub,
                      email: jwtPayload.email,
                      name: jwtPayload.name,
                      picture: jwtPayload.picture,
                    }
                  : undefined,
              }),
            });

            const data = await apiRes.json();
            if (apiRes.ok && data.success) {
              resolve({
                success: true,
                role: data.role,
                user: data.user,
              });
            } else {
              resolve({
                success: false,
                error: data.error || 'UNAUTHORIZED',
                message: data.message || 'TEACHER ACCESS REQUIRES AUTHORIZATION.',
              });
            }
          } catch (apiErr) {
            console.error('[GoogleAuth] API verification call failed:', apiErr);
            resolve({
              success: false,
              error: 'NETWORK_ERROR',
              message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
            });
          }
        },
      });

      // Prompt One Tap / Sign-In popup
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One Tap prompt fails or is dismissed, trigger standard Google OAuth flow
          try {
            const tokenClient = window.google.accounts.oauth2.initTokenClient({
              client_id: GOOGLE_CLIENT_ID,
              scope: 'email profile openid',
              callback: async (tokenResponse: any) => {
                if (tokenResponse.access_token) {
                  try {
                    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                      headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                    });
                    const userInfo = await userInfoRes.json();

                    const apiRes = await fetch('/api/auth/google', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        role,
                        googleUser: {
                          sub: userInfo.sub,
                          email: userInfo.email,
                          name: userInfo.name,
                          picture: userInfo.picture,
                        },
                      }),
                    });

                    const data = await apiRes.json();
                    if (apiRes.ok && data.success) {
                      resolve({ success: true, role: data.role, user: data.user });
                    } else {
                      resolve({
                        success: false,
                        error: data.error || 'UNAUTHORIZED',
                        message: data.message || 'TEACHER ACCESS REQUIRES AUTHORIZATION.',
                      });
                    }
                  } catch {
                    resolve({
                      success: false,
                      error: 'USERINFO_FAILED',
                      message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
                    });
                  }
                } else {
                  resolve({
                    success: false,
                    error: 'CANCELLED',
                    message: 'GOOGLE AUTHENTICATION CANCELLED',
                  });
                }
              },
            });
            tokenClient.requestAccessToken();
          } catch {
            resolve({
              success: false,
              error: 'POPUP_FAILED',
              message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
            });
          }
        }
      });
    });
  } catch (err) {
    console.error('[GoogleAuth] Script load error:', err);
    return {
      success: false,
      error: 'SCRIPT_ERROR',
      message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
    };
  }
}
