import express from "express";
import cors from "cors";
import path from "path";

const port = process.env.SERVER_PORT || 80;
const dataDir: string = process.env.DATA_DIR || "/config";

const app = express();
app.use(cors());

app.get("/:device/:mode?", (req: express.Request, res: express.Response) => {
  const { mode, device } = req.params;
  const fileExt = mode === "qr" ? "png" : "conf";
  const filePath = path.join(
    dataDir,
    `peer_${device}`,
    `peer_${device}.${fileExt}`
  );

  try {
    res.status(200).sendFile(filePath);
  } catch (e) {
    if (e.code === "ENOENT") res.status(404).send("Not found");
    else res.status(500).send(e.stack);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
