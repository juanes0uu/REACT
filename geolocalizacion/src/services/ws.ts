type WSHandler = (msg: unknown) => void;

export class WSService {
    socket: WebSocket | null = null;
    handlers: WSHandler[] = [];

    connect(userId: number) {
        const base = import.meta.env.VITE_WS_URL ?? "ws://localhost:8080/ws";
        const url = `${base}?idUsuario=${userId}`;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => console.log("WS connected");
        this.socket.onmessage = (ev) => {
        try {
            const data = JSON.parse(ev.data);
            this.handlers.forEach(h => h(data));
        } catch (err) {
            console.error("WS parse error", err);
        }
        };
        this.socket.onclose = () => {
        console.log("WS closed, trying to reconnect in 2s");
        setTimeout(() => this.connect(userId), 2000);
        };
        this.socket.onerror = (e) => console.error("WS error", e);
    }

    onMessage(handler: WSHandler) {
        this.handlers.push(handler);
    }

    send(obj: unknown) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(obj));
        }
    }

    close() {
        this.socket?.close();
    }
}

export const wsService = new WSService();
