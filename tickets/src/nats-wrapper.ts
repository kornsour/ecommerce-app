import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
    // question mark tells typescript that 
    // this may be undefined for a period of time
    private _client?: Stan;

    get client() {
        if(!this._client) {
            throw new Error('Cannot access NATS client before connecting');
        }

        return this._client;
    }
    connect(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId, clientId, { url });

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log('Connected to NATS');
                resolve();
            });
            this.client.on('error', (err) => {
                reject(err);
            });
        });
    }
}

// exporting one single instance to be used by multiple files
// as opposed to exporting the class or something
export const natsWrapper = new NatsWrapper();
