export type MessageEventListener = (e: MessageEvent) => void

export type ConnectChannelWebsocket = (channel: string) => Promise<WebSocket> | WebSocket
