const { DisconnectReason, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const makeWASocket = require("@whiskeysockets/baileys").default;

async function connectionLogic(){
    const { state, saveCreds } = await useMultiFileAuthState("auth_infor_baileys");
    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update || {};

        if (qr){
            console.log(qr);
        }

        if (connection == "close"){
            const shoulReconnect = 
                lastDisconnect?.error?.output?.statusCode !==
                DisconnectReason.loggedOut;
            if (shouldReconnect){
                connectionLogic();
            }
        }
    });
}

connectionLogic();