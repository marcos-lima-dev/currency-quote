import { HistoricalRate } from "../types/Currency";

type CachePeriod = "1d" | "7d" | "1m" | "6m" | "1a";

interface CacheItem {
    data: HistoricalRate[];
    timestamp: number;
    period: CachePeriod;
}

class CurrencyCache {
    private cache: Map<string, CacheItem> = new Map();
    private readonly TTL: Record<CachePeriod, number> = {
        "1d": 5 * 60 * 1000, // 5 min
        "7d": 15 * 60 * 1000, // 15 min
        "1m": 30 * 60 * 1000, // 30 min
        "6m": 60 * 60 * 1000, // 1 hour
        "1a": 120 * 60 * 1000, // 2 hours
    };

    get(key: string, period: CachePeriod): HistoricalRate[] | null {
        const cacheKey = `${key}-${period}`;
        const cached = this.cache.get(cacheKey);

        if (!cached) return null;

        // Verificar se existe o período no TTL
        if (!this.TTL[period]) {
            return null;
        }

        if (Date.now() - cached.timestamp > this.TTL[period]) {
            this.cache.delete(cacheKey);
            return null;
        }

        return cached.data;
    }

    set(key: string, period: CachePeriod, data: HistoricalRate[]): void {
        const cacheKey = `${key}-${period}`;
        this.cache.set(cacheKey, {
            data,
            timestamp: Date.now(),
            period,
        });
    }

    clear(): void {
        this.cache.clear();
    }
}

export const currencyCache = new CurrencyCache();
