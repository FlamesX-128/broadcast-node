# Broadcast Node

This Svelte application implements a lightweight peer-to-peer (P2P) voice communication system using PeerJS. Designed to run entirely from a single HTML file.

## Features

- **Peer-to-Peer Connectivity:**  
  Each node establishes direct media connections using PeerJS, eliminating the need for centralized servers. This decentralized approach ensures that communication flows directly between users, reducing latency and dependency on external infrastructure.

- **Dynamic Node Discovery:**  
  The system is built to automatically expand its network. For instance, when a node that is already connected to three other nodes receives a new connection request, it shares the information of these three connections with the newcomer.

- **Real-Time Voice Communication:**  
  By leveraging the browser’s `getUserMedia` API, the application captures live audio streams for seamless voice interactions.

- **Single-File Deployment:**  
  This self-contained design is particularly beneficial for rapid deployment and prototyping in decentralized communication systems.
