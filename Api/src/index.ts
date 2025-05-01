// src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors'; // ✅ Import cors
import path from 'path'; // ✅ Import path
// TypeScript-Interface für unsere Nachrichtenstruktur
interface Message {
  username: string;
  message: string;
  timestamp: Date;
}

// In-Memory-Speicher für Chat-Nachrichten
const chatHistory: Message[] = [];

const app = express();
app.use(cors()); // ✅ Allow all origins

app.use(express.json());

// POST-Endpunkt zum Hinzufügen einer Nachricht
app.post('/api/messages', (req: Request, res: Response) => {
  const { username, message } = req.body;
  
  if (!username || !message) {
    return res.status(400).json({ error: 'Username und Message sind erforderlich' });
  }
  
  const newMessage: Message = {
    username,
    message,
    timestamp: new Date()
  };
  
  chatHistory.push(newMessage);
  
  return res.status(201).json(newMessage);
});

// GET-Endpunkt zum Abrufen aller Nachrichten (Chatverlauf)
app.get('/api/messages', (req: Request, res: Response) => {
  // Wir formatieren das Datum für bessere Lesbarkeit
  const formattedChatHistory = chatHistory.map(msg => ({
    username: msg.username,
    message: msg.message,
    time: msg.timestamp.toLocaleTimeString()
  }));
  
  return res.status(200).json(formattedChatHistory);
});

// Serve static Angular files from dist
app.use(express.static(path.join(__dirname, '../../ChatApp/dist/chatly/browser')));

// For all other routes, return Angular's index.html
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../ChatApp/dist/chatly/browser/index.html'));
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});