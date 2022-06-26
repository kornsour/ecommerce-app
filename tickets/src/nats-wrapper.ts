import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    // question mark tells typescript that 
    // this may be undefined for a period of time
    private _client?: Stan;

    connect(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this._client!.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });
            this._client!.on('error', (err) => {
                reject(err);
            });
        });
    }
}

// exporting one single instance to be used by multiple files
// as opposed to exporting the class or something
export const natsWrapper = new NatsWrapper();
