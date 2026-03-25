import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Demo Registration
  app.post("/api/demo", async (req, res) => {
    const { fullName, phoneNumber, email, clinicName, type, note } = req.body;

    const webhookUrl = "https://n8n-hub.teknix.services/webhook/devose";
    const user = process.env.WEBHOOK_USER || "devose";
    const pass = process.env.WEBHOOK_PASS || "Wqtvvybvo4YdywsI3yfDmmyZI2CYXJYSIFWhyI3Ulhqb9lCKJCMX90tOOEZxsQc2";

    const auth = Buffer.from(`${user}:${pass}`).toString("base64");

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          clinicName,
          type,
          note,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Webhook error:", errorText);
        return res.status(response.status).json({ error: "Failed to submit to webhook" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
