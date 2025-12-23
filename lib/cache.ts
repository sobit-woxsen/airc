/**
 * Simple in-memory cache with TTL support
 * Can be upgraded to Redis for production if needed
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

class MemoryCache {
  private cache: Map<string, CacheEntry<unknown>>
  private cleanupInterval: NodeJS.Timeout | null

  constructor() {
    this.cache = new Map()
    this.cleanupInterval = null
    this.startCleanup()
  }

  /**
   * Set a value in the cache with TTL (time to live) in milliseconds
   */
  set<T>(key: string, value: T, ttl: number): void {
    const expiresAt = Date.now() + ttl
    this.cache.set(key, { value, expiresAt })
  }

  /**
   * Get a value from the cache
   * Returns null if key doesn't exist or has expired
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.value as T
  }

  /**
   * Delete a key from the cache
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Start periodic cleanup of expired entries
   */
  private startCleanup(): void {
    // Run cleanup every 5 minutes
    this.cleanupInterval = setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of this.cache.entries()) {
        if (now > entry.expiresAt) {
          this.cache.delete(key)
        }
      }
    }, 5 * 60 * 1000)
  }

  /**
   * Stop the cleanup interval
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
  }
}

// Export a singleton instance
export const cache = new MemoryCache()

// Cache TTL constants (in milliseconds)
export const CACHE_TTL = {
  SHORT: 1 * 60 * 1000,      // 1 minute
  MEDIUM: 5 * 60 * 1000,     // 5 minutes
  LONG: 15 * 60 * 1000,      // 15 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
}
