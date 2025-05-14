// src/index.ts
import express, { Request, Response } from "express";
import cors from "cors"; // ✅ Import cors
import path from "path"; // ✅ Import path
// TypeScript-Interface für unsere Nachrichtenstruktur
interface Message {
  username: string;
  message: string;
  timestamp: string;
}

// In-Memory-Speicher für Chat-Nachrichten
const chatHistory: Message[] = [];

// Speicher für Usernames
const activeUsernames: Set<string> = new Set();

const app = express();
app.use(cors()); // ✅ Allow all origins

app.use(express.json());

// POST-Endpunkt zum Hinzufügen einer Nachricht
app.post("/api/messages", (req: Request, res: Response) => {
  const { username, message } = req.body;

  if (!username || !message) {
    return res
      .status(400)
      .json({ error: "Benutzername und Nachricht sind erforderlich" });
  }

  const newMessage: Message = {
    username,
    message,
    timestamp: new Date().toISOString(),
  };

  chatHistory.push(newMessage);

  return res.status(201).json(newMessage);
});

app.post("/api/nickname", (req: Request, res: Response) => {
  const { username } = req.body;

  console.log("➡️  Received body:", req.body);
  console.log("👤 Username received:", username);
  console.log("📦 Current active usernames:", [...activeUsernames]);

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username ist erforderlich" });
  }

  if (activeUsernames.has(username)) {
    return res.status(409).json({ error: "Benutzername ist bereits vergeben" });
  }

  activeUsernames.add(username);
  return res.status(200).json({ message: "Benutzername registriert" });
});

// GET-Endpunkt zum Abrufen aller Nachrichten (Chatverlauf)
app.get("/api/messages", (req: Request, res: Response) => {
  // Wir formatieren das Datum für bessere Lesbarkeit
  const formattedChatHistory = chatHistory.map((msg) => ({
    username: msg.username,
    message: msg.message,
    time: msg.timestamp,
  }));

  return res.status(200).json(formattedChatHistory);
});

// DELETE-Endpunkt zum Löschen des gesamten Chatverlaufs
app.delete("/api/messages", (req: Request, res: Response) => {
  chatHistory.length = 0; // Clear the array
  return res.status(200).json({ message: "Chatverlauf wurde gelöscht." });
});

// Serve static Angular files from dist
app.use(
  express.static(path.join(__dirname, "../../ChatApp/dist/chatly/browser"))
);

// For all other routes, return Angular's index.html
app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../ChatApp/dist/chatly/browser/index.html")
  );
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
