/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/['"]/g, '') // Remove quotes that could break out of attributes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 1000); // Limit length to prevent DoS
};

/**
 * Validates search query input
 */
export const validateSearchQuery = (query: string): { isValid: boolean; error?: string } => {
  if (!query) {
    return { isValid: true }; // Empty queries are valid
  }
  
  if (query.length > 100) {
    return { isValid: false, error: 'Search query too long (max 100 characters)' };
  }
  
  if (query.trim().length < 1) {
    return { isValid: false, error: 'Search query cannot be empty' };
  }
  
  // Check for potentially malicious patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
  ];
  
  for (const pattern of maliciousPatterns) {
    if (pattern.test(query)) {
      return { isValid: false, error: 'Invalid characters in search query' };
    }
  }
  
  return { isValid: true };
};

/**
 * Validates URLs to ensure they are safe
 */
export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url) {
    return { isValid: false, error: 'URL cannot be empty' };
  }
  
  try {
    const urlObj = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { isValid: false, error: 'Only HTTP and HTTPS URLs are allowed' };
    }
    
    // Block potentially dangerous domains
    const blockedDomains = [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      '::1',
    ];
    
    if (blockedDomains.includes(urlObj.hostname)) {
      return { isValid: false, error: 'This domain is not allowed' };
    }
    
    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid URL format' };
  }
};

/**
 * Environment-aware logger to prevent information leakage
 */
export const logger = {
  error: (message: string, error?: Error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, error);
    }
    // In production, send to monitoring service instead
    // Example: sendToMonitoringService(message, error);
  },
  
  warn: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.warn(message);
    }
  },
  
  info: (message: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(message);
    }
  },
};

/**
 * Rate limiting utility for client-side protection
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;
  
  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }
  
  isAllowed(key: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
  
  reset(key: string): void {
    this.requests.delete(key);
  }
}

/**
 * Content Security Policy helpers
 */
export const CSP_NONCE_HEADER = 'x-csp-nonce';

export const generateCSPNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Secure headers configuration
 */
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

/**
 * Validates and sanitizes tag input
 */
export const validateTag = (tag: string): { isValid: boolean; sanitized: string; error?: string } => {
  if (!tag) {
    return { isValid: false, sanitized: '', error: 'Tag cannot be empty' };
  }
  
  const sanitized = sanitizeInput(tag);
  
  if (sanitized.length > 50) {
    return { isValid: false, sanitized: '', error: 'Tag too long (max 50 characters)' };
  }
  
  if (!/^[a-zA-Z0-9\s-]+$/.test(sanitized)) {
    return { isValid: false, sanitized: '', error: 'Tag contains invalid characters' };
  }
  
  return { isValid: true, sanitized: sanitized.toLowerCase() };
};