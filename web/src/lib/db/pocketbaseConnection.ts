import PocketBase from 'pocketbase';

export const createInstance = () => {
    return new PocketBase('https://discord-pay.fly.dev');
}

export const pb = new PocketBase('https://discord-pay.fly.dev');