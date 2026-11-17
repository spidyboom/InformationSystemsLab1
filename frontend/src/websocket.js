import { Client } from '@stomp/stompjs';

export const createWebSocketClient = (onMessageReceived) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8080/ws-native',
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('WebSocket connected');
            client.subscribe('/topic/flats', (message) => {
                onMessageReceived(message.body);
            });
        },
        onStompError: (frame) => {
            console.error('STOMP error: ' + frame.headers['message']);
        },
    });
    client.activate();
    return client;
};