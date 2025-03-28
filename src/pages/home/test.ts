
import { v5 as deterministicUUID } from "uuid";

const namespace = "2ade2397-d91c-4932-928d-17243fc8c8c9";
const uuid = deterministicUUID("flames", namespace);

console.log(uuid);

// 8cf780e4-5e07-4283-bc26-92af0f71bcd1

/*
import type { DataConnection, MediaConnection } from "peerjs";
import { Peer } from "peerjs";

const peer = new Peer({});

interface NodeInfo {
    peer: string;
}

const MessageType = {
    NodeInfo: "NodeInfo" as const,
};
type MessageType = (typeof MessageType)[keyof typeof MessageType];

type NodeConnection<T extends DataConnection | MediaConnection> = T & {
    send<T extends MessageType>(data: Message<T>): Promise<void> | void;
};

interface MessageMap {
    [MessageType.NodeInfo]: NodeInfo;
}
interface Message<T extends MessageType = MessageType> {
    type: T;
    data: MessageMap[T];
}

type MessageHandler = {
    [T in MessageType]: (this: DataConnection, data: MessageMap[T]) => void;
};

// DataConnection
peer.on("connection", (dataConnection) => {
    // Desconectar si ya tiene una conexión
    // Desconectar si es nuestro peer


    // Informar Nodos
    dataConnection.on("open", () => {

    });

    // NodeInfo - Conectarse al nodo
    dataConnection.on("data", (data) => {

    });
});

// MediaConnection
peer.on("call", (mediaConnection) => {
    // Desconectar si no tiene un DataConnection


    // Recibir audio/video
    mediaConnection.on("stream", (stream) => {

    });
});
*/
