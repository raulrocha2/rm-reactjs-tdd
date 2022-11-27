import { ISetStorage } from "@/data/protocols/http/cache/i-set-storage";

export class LocalStorageAdapter implements ISetStorage {
 
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
    
  }

}