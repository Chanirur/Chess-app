import app from "./app";
import { sendEmailVerification } from "./utils/email";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
