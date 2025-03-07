
/**
 * Handles authentication related functionality for the .NET integration
 */

import messagingService from './messagingService';
import type { AuthRequest, AuthResponse } from './types';
import { CONNECTION_CONFIG } from './config';
import SecurityUtils from './securityUtils';

export class AuthService {
  private authToken: string | null = null;
  private refreshTokenValue: string | null = null; // Renamed from refreshToken to avoid duplicate
  private tokenExpiry: number = 0;
  private refreshInterval: number | null = null;
  
  /**
   * Authenticate with the .NET host
   */
  public async authenticate(username: string, password: string): Promise<AuthResponse> {
    try {
      // Create auth request with optional challenge
      const authRequest: AuthRequest = {
        username,
        password,
        deviceInfo: {
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          deviceId: SecurityUtils.generateSessionId()
        }
      };
      
      // Add challenge if enabled
      if (CONNECTION_CONFIG.SECURITY.ENABLE_CHALLENGE_RESPONSE) {
        // In a real implementation, we would request a challenge first
        authRequest.challenge = Date.now().toString();
      }
      
      // Send auth request and wait for response
      const response = await messagingService.sendMessageAndWaitForResponse(
        'AUTH_REQUEST', 
        authRequest
      ) as AuthResponse;
      
      if (response.success) {
        // Store auth tokens
        this.authToken = response.token || null;
        this.refreshTokenValue = response.refreshToken || null;
        this.tokenExpiry = response.expiresAt || 0;
        
        // Setup token refresh
        this.setupTokenRefresh();
      }
      
      return response;
    } catch (error) {
      console.error('[AuthService] Authentication error:', error);
      return {
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown authentication error'
      };
    }
  }
  
  /**
   * Get the current auth token
   */
  public getAuthToken(): string | null {
    return this.authToken;
  }
  
  /**
   * Check if the user is authenticated
   */
  public isAuthenticated(): boolean {
    return !!this.authToken && this.tokenExpiry > Date.now();
  }
  
  /**
   * Set up automatic token refresh
   */
  private setupTokenRefresh(): void {
    // Clear any existing refresh interval
    if (this.refreshInterval !== null) {
      window.clearInterval(this.refreshInterval);
    }
    
    // Only set up refresh if we have a token and expiry
    if (this.authToken && this.tokenExpiry) {
      this.refreshInterval = window.setInterval(() => {
        this.refreshAuthToken(); // Fixed: Using the method name, not calling it as a property
      }, CONNECTION_CONFIG.SECURITY.TOKEN_REFRESH_INTERVAL);
    }
  }
  
  /**
   * Refresh the auth token
   */
  private async refreshAuthToken(): Promise<void> {
    try {
      if (!this.refreshTokenValue) return;
      
      const response = await messagingService.sendMessageAndWaitForResponse(
        'AUTH_REFRESH',
        { refreshToken: this.refreshTokenValue }
      ) as AuthResponse;
      
      if (response.success) {
        this.authToken = response.token || null;
        this.refreshTokenValue = response.refreshToken || this.refreshTokenValue;
        this.tokenExpiry = response.expiresAt || 0;
      } else {
        // Token refresh failed, clear auth state
        this.logout();
      }
    } catch (error) {
      console.error('[AuthService] Token refresh error:', error);
    }
  }
  
  /**
   * Log out the current user
   */
  public logout(): void {
    this.authToken = null;
    this.refreshTokenValue = null;
    this.tokenExpiry = 0;
    
    if (this.refreshInterval !== null) {
      window.clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}

export default new AuthService();
