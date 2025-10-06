import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(" Backend is running fine! Use POST /api/biometric/verify to test biometric API.");
});

//  Dummy biometric verify API (POST)
app.post("/api/biometric/verify", (req, res) => {
  const { userId, biometricToken } = req.body;

  if (biometricToken === "sample123") {
    res.json({ success: true, message: "Biometric Verified!" });
  } else {
    res.json({ success: false, message: "Verification Failed!" });
  }
});

//  Server listener
app.listen(5000, () => console.log(" Server running on port 5000"));
