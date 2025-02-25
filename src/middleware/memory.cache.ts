import NodeCache from 'node-cache';
import fs from 'fs';

class MemoryCache {
    private cache: NodeCache;
    private cacheFilePath = 'cache-data.json';

    constructor() {
        this.cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });
        this.loadCacheFromFile();
    }

    set(key: string, value: any, ttl?: number): boolean {
        const success = this.cache.set(key, value, ttl ?? 0);
        this.saveCacheToFile();
        return success;

    }
    
    get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    delete(key: string): boolean {
        const success = this.cache.del(key) > 0;
        this.saveCacheToFile(); 
        return success;
    }

    flush(): void {
        this.cache.flushAll();
        this.saveCacheToFile(); 
    }
    listKeys(): string[] {
        return this.cache.keys();
    }
    private saveCacheToFile(): void {
        const data = this.cache.keys().reduce((acc, key) => {
            acc[key] = this.cache.get(key);
            return acc;
        }, {} as Record<string, any>);

        fs.writeFileSync(this.cacheFilePath, JSON.stringify(data, null, 2));
    }

    private loadCacheFromFile(): void {
        if (fs.existsSync(this.cacheFilePath)) {
            const data = JSON.parse(fs.readFileSync(this.cacheFilePath, 'utf-8'));
            Object.entries(data).forEach(([key, value]) => {
                this.cache.set(key, value);
            });
        }
    }
}

export default new MemoryCache();
