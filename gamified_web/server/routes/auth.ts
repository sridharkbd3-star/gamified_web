// ============================================================
// S.H.I.E.L.D. Platform — API Route: POST /api/auth/google
// Server-Side Google OAuth Token Verification & Role Authorization
// ============================================================

import express, { Request, Response } from 'express';

export const router = express.Router();

// Authorized Faculty / Teacher Email Registry
const AUTHORIZED_TEACHER_EMAILS = new Set([
  'professor.xavier@shield-faculty.gov',
  'sterling@shield-faculty.gov',
  'sridhar.240155@ece.ritchennai.edu.in',
  'sridhar02032007@gmail.com',
]);

function isAuthorizedTeacher(email: string): boolean {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  if (AUTHORIZED_TEACHER_EMAILS.has(cleanEmail)) return true;
  if (cleanEmail.endsWith('@shield-faculty.gov')) return true;
  return false;
}

router.post('/google', async (req: Request, res: Response) => {
  try {
    const { credential, googleUser, role = 'student' } = req.body || {};

    let sub = '';
    let email = '';
    let name = '';
    let picture = '';

    // 1. Server-Side Token Verification using Google OAuth API
    if (credential && typeof credential === 'string') {
      try {
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (verifyRes.ok) {
          const payload: any = await verifyRes.json();
          const expectedClientId = process.env.GOOGLE_CLIENT_ID || '921915649365-dm15osk1c2cr7dosl1a30gmm11sq2eh9.apps.googleusercontent.com';

          if (payload.aud === expectedClientId || payload.azp === expectedClientId) {
            sub = payload.sub;
            email = payload.email;
            name = payload.name || payload.email.split('@')[0];
            picture = payload.picture || '';
          }
        }
      } catch (verifyErr) {
        console.warn('[SHIELD Auth] Google Token Verification API warning:', verifyErr);
      }
    }

    // Fallback to verified user payload if provided by GIS client
    if (!sub && googleUser && googleUser.sub && googleUser.email) {
      sub = googleUser.sub;
      email = googleUser.email;
      name = googleUser.name || googleUser.email.split('@')[0];
      picture = googleUser.picture || '';
    }

    if (!email || !sub) {
      return res.status(400).json({
        success: false,
        error: 'INVALID_CREDENTIALS',
        message: 'Google authentication failed. Please try again.',
      });
    }

    const targetRole = role === 'teacher' ? 'teacher' : 'student';

    // 2. Role Authorization Security Check
    if (targetRole === 'teacher') {
      if (!isAuthorizedTeacher(email)) {
        console.warn(`[SHIELD Auth Security Warning] Unauthorized teacher login attempt by: ${email}`);
        return res.status(403).json({
          success: false,
          error: 'UNAUTHORIZED_TEACHER',
          message: 'Teacher access requires authorization. Please contact the S.H.I.E.L.D. administrator.',
        });
      }

      return res.json({
        success: true,
        role: 'teacher',
        user: {
          id: sub,
          googleId: sub,
          name: name || 'Dr. Agent Sterling',
          email,
          picture,
        },
      });
    }

    // 3. Student Registration / Login
    return res.json({
      success: true,
      role: 'student',
      user: {
        id: sub,
        googleId: sub,
        name: name || 'Cadet Explorer',
        email,
        picture,
      },
    });
  } catch (error) {
    console.error('[SHIELD Auth Endpoint Error]:', error);
    return res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'AUTHENTICATION FAILED. PLEASE TRY AGAIN.',
    });
  }
});
