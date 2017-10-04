export interface IStorageConfig {
    type: 'memory' | 'server';
    cleanupTimeout: number;
    borderTime: number;
}