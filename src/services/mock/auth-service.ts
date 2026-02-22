/**
 * Mock Authentication Service
 * Simulates Google OAuth login flow for development
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

class MockAuthService {
  private currentUser: AuthUser | null = null;

  /**
   * Simulates Google OAuth login
   * In production, this would integrate with Google Sign-In
   */
  async loginWithGoogle(): Promise<AuthResult> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock successful authentication
    const mockUser: AuthUser = {
      id: 'mock-user-123',
      email: 'user@example.com',
      name: 'Demo User',
      picture: 'https://via.placeholder.com/150',
    };

    this.currentUser = mockUser;

    return {
      success: true,
      user: mockUser,
    };
  }

  /**
   * Logs out the current user
   */
  async logout(): Promise<void> {
    this.currentUser = null;
  }

  /**
   * Gets the currently authenticated user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * Checks if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const mockAuthService = new MockAuthService();
