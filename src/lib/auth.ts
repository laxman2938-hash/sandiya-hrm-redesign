import { cookies } from 'next/headers';

export interface AuthUser {
  id: string;
  username: string;
  isAuthenticated: boolean;
}

// Simple in-memory admin credentials - in production, use environment variables
const ADMIN_CREDENTIALS = {
  username: 'admin@sandiya.com',
  password: 'admin1232$$' // Change this to a secure password
};

export async function authenticate(username: string, password: string): Promise<boolean> {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export async function createSession(username: string): Promise<void> {
  const cookieStore = await cookies();
  const sessionData = {
    username,
    loginTime: Date.now(),
    isAuthenticated: true
  };
  
  // Set session cookie with 24 hour expiry
  cookieStore.set('admin-session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 // 24 hours in seconds
  });
}

export async function getSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin-session');
    
    if (!sessionCookie?.value) {
      return null;
    }
    
    const sessionData = JSON.parse(sessionCookie.value);
    
    // Check if session is expired (24 hours)
    const isExpired = Date.now() - sessionData.loginTime > 24 * 60 * 60 * 1000;
    
    if (isExpired || !sessionData.isAuthenticated) {
      await destroySession();
      return null;
    }
    
    return {
      id: '1',
      username: sessionData.username,
      isAuthenticated: true
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

export async function requireAuth(): Promise<AuthUser> {
  const user = await getSession();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}