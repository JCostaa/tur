import { Request, Response, NextFunction } from 'express';
import { ProviderService } from '../services/index.js';

declare global {
  namespace Express {
    interface Request {
      provider?: any;
      providerId?: number;
    }
  }
}

export class TenantMiddleware {
  private providerService: ProviderService;

  constructor() {
    this.providerService = new ProviderService();
  }

  async identifyProvider(req: Request, res: Response, next: NextFunction) {
    try {
      let provider = null;
      let providerId = null;

      // Method 1: Check for X-Provider-ID header (for API calls)
      const providerIdHeader = req.headers['x-provider-id'] as string;
      if (providerIdHeader) {
        providerId = parseInt(providerIdHeader);
        provider = await this.providerService.getProviderById(providerId);
      }

      // Method 2: Check for X-Provider-Slug header
      if (!provider) {
        const providerSlug = req.headers['x-provider-slug'] as string;
        if (providerSlug) {
          provider = await this.providerService.getProviderBySlug(providerSlug);
          if (provider) {
            providerId = provider.id;
          }
        }
      }

      // Method 3: Extract from subdomain
      if (!provider) {
        const host = req.get('host');
        if (host) {
          const subdomain = this.extractSubdomain(host);
          if (subdomain && subdomain !== 'www' && subdomain !== 'api') {
            provider = await this.providerService.getProviderBySlug(subdomain);
            if (provider) {
              providerId = provider.id;
            }
          }
        }
      }

      // Method 4: Extract from custom domain
      if (!provider) {
        const host = req.get('host');
        if (host) {
          provider = await this.providerService.getProviderByDomain(host);
          if (provider) {
            providerId = provider.id;
          }
        }
      }

      // Method 5: Default provider (for development or fallback)
      if (!provider) {
        provider = await this.providerService.getProviderBySlug('viva-barra-do-borges');
        if (provider) {
          providerId = provider.id;
        }
      }

      // Attach provider info to request
      req.provider = provider;
      req.providerId = providerId;

      next();
    } catch (error) {
      console.error('Tenant identification error:', error);
      next();
    }
  }

  async requireProvider(req: Request, res: Response, next: NextFunction) {
    if (!req.provider) {
      return res.status(400).json({ 
        error: 'Provider not identified',
        message: 'Unable to identify the provider for this request'
      });
    }
    next();
  }

  async filterByProvider(req: Request, res: Response, next: NextFunction) {
    if (req.providerId) {
      // Add provider_id to query parameters for filtering
      req.query.provider_id = req.providerId.toString();
    }
    next();
  }

  private extractSubdomain(host: string): string | null {
    const parts = host.split('.');
    if (parts.length >= 3) {
      return parts[0];
    }
    return null;
  }
}

// Export singleton instance
export const tenantMiddleware = new TenantMiddleware(); 