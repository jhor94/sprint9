import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache: Map<string, any> = new Map();
  // Método para obtener los datos de la caché
  getCache(key: string): any {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      // Verificar si la caché ha expirado
      if (new Date().getTime() < parsedData.expiry) {
        return parsedData.data;
      } else {
        localStorage.removeItem(key); // Eliminar la caché que ha expirado
      }
    }
    return null;
  }


    // Método para almacenar en caché
    setCache(key: string, data: any): void {
      const cacheData = {
        data,
        expiry: new Date().getTime() + 3600 * 1000 // Expira en 1 hora
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    }
  

  // Verificar si existe en caché
  hasCache(key: string): boolean {
    return this.cache.has(key);
  }

  constructor() { }
}
