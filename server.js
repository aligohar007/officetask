import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const users = [
  { userId: "101", biometricToken: "fingerprint101" },
  { userId: "102", biometricToken: "face102" },
  {userId: "103" , biometricToken: "iris103"}
];



app.get("/", (req, res) => {
  res.send(" Backend is running! Use POST /api/biometric/verify");
});

app.post("/api/biometric/verify", (req, res) => {
  const { userId, biometricToken } = req.body;

  const inputId = userId.trim();
  const inputToken = biometricToken.trim();

  const user = users.find(u => u.userId === inputId);

  if (user && user.biometricToken === inputToken) {
    res.status(200).json({ success: true, message: " Biometric Verified!" });
  } else {
    res.status(401).json({ success: false, message: " Verification Failed!" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
