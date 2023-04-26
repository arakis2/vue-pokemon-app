import database from '@/pokemon-configuration.json'

export default class DbService {
    static isLocal: boolean = database?.source?.local ?? true;
    static baseUrl: string = database?.source?.baseurl ?? 'http://localhost:3001'

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
      }

    static handleError(error: any): void {
        console.error(error);
      }
}