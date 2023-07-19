import * as os from 'os';

export function sleep(timeout = 1000): Promise<void> {
    return new Promise(r => setTimeout(r, timeout));
}

export function getServerIPAddresses(): string[] {
    const networkInterfaces = os.networkInterfaces();
    const addresses: string[] = [];

    Object.keys(networkInterfaces).forEach((interfaceName) => {
        const interfaces = networkInterfaces[interfaceName];
        interfaces.forEach((interfaceInfo) => {
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                addresses.push(interfaceInfo.address);
            }
        });
    });

    return addresses;
}

