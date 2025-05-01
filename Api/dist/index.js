"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
// In-Memory-Speicher für Chat-Nachrichten
const chatHistory = [];
const app = (0, express_1.default)();
app.use(express_1.default.json());
// POST-Endpunkt zum Hinzufügen einer Nachricht
app.post('/api/messages', (req, res) => {
    const { username, message } = req.body;
    if (!username || !message) {
        return res.status(400).json({ error: 'Username und Message sind erforderlich' });
    }
    const newMessage = {
        username,
        message,
        timestamp: new Date()
    };
    chatHistory.push(newMessage);
    return res.status(201).json(newMessage);
});
// GET-Endpunkt zum Abrufen aller Nachrichten (Chatverlauf)
app.get('/api/messages', (req, res) => {
    // Wir formatieren das Datum für bessere Lesbarkeit
    const formattedChatHistory = chatHistory.map(msg => ({
        username: msg.username,
        message: msg.message,
        time: msg.timestamp.toLocaleTimeString()
    }));
    return res.status(200).json(formattedChatHistory);
});
// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
