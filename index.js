// // index.js (backend)
// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import OpenAI from "openai";

// const app = express();
// app.use(cors()); // allow requests from your frontend
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 3000;

// if (!process.env.OPENAI_API_KEY) {
//   console.error("ERROR: OPENAI_API_KEY is not set in your environment.");
//   process.exit(1);
// }

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // simple health check
// app.get("/health", (req, res) => {
//   res.json({ status: "ok" });
// });

// // main chat endpoint: accepts { message: "your text" }
// app.post("/chat", async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message || typeof message !== "string") {
//       return res.status(400).json({ error: "Please provide a string 'message' in the request body." });
//     }

//     console.log("User message:", message);

//     // call OpenAI Responses API
//     const response = await client.responses.create({
//       model: "gpt-4.1-mini",    // change model if you prefer another available model
//       input: message,
//     });

//     // response.output_text is convenient; if the SDK returns a different shape, log the object and inspect
//     const text = response.output_text ?? (() => {
//       // fallback: try to extract text from response.output[0].content
//       try {
//         const out = response.output?.[0];
//         if (!out) return "";
//         if (typeof out === "string") return out;
//         // if it's an array of content pieces
//         if (Array.isArray(out.content)) {
//           return out.content.map(c => c.text ?? "").join("");
//         }
//         return out.text ?? "";
//       } catch {
//         return "";
//       }
//     })();

//     res.json({ reply: text });
//   } catch (err) {
//     console.error("OpenAI error:", err);
//     // if OpenAI returned a structured error, try to include message
//     const emsg = err?.message ?? "Server error";
//     res.status(500).json({ error: "Failed to generate response", details: emsg });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server listening at http://localhost:${PORT}`);
// });
