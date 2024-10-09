import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private hubConnection: signalR.HubConnection;
    public messageReceived = new EventEmitter<any>();

    public startConnection = () => {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7116/messageHub')
            .build();

        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch((err) =>
                console.log('Error while starting connection: ' + err)
            );
    };

    public addReceiveMessageListener = () => {
        this.hubConnection.on('ReceiveMessage', (user, message) => {
            this.messageReceived.emit({ user, message });
        });
    };

    public ConfirmClientName = () => {
        this.hubConnection.on('RequireClientName', (connectionId) => {
            console.log('ConnectionId: ', connectionId);
            this.hubConnection
                .invoke('ConfirmClientName', connectionId, 'C-ADMIN')
                .catch((err) => console.error(err));
        });
    };

    public sendMessage = (user: string, message: string) => {
        this.hubConnection
            .invoke('SendMessage', user, message)
            .catch((err) => console.error(err));
    };
}
