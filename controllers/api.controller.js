const bcrypt = require("bcrypt");

const testMessage = (request, response) => {
  return response
    .status(200)
    .send({ ok: true, message: "API is working fine!" });
};

const hashPassword = async (request, response) => {
  try {
    const body = request?.body;
    if (!body) {
      return response
        .status(400)
        .send({ ok: false, message: "Invalid request body" });
    }
    const { email, password } = body;

    if (!email) {
      return response
        .status(400)
        .send({ ok: false, message: "Email is required" });
    }
    if (!password) {
      return response
        .status(400)
        .send({ ok: false, message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return response.status(200).send({
      ok: true,
      message: "Password hashed successfully",
      hashedPassword: hashedPassword,
    });
  } catch (error) {
    console.error("Error hashing password:", error);
    return response
      .status(500)
      .send({ ok: false, message: "Internal server error" });
  }
};

const comparePassword = async (request, response) => {
  try {
    const body = request?.body;
    if (!body) {
      return response
        .status(400)
        .send({ ok: false, message: "Invalid request body" });
    }
    const { password, hash } = body;
    if (!password) {
      return response
        .status(400)
        .send({ ok: false, message: "Password is required" });
    }
    if (!hash) {
      return response
        .status(400)
        .send({ ok: false, message: "Hash is required" });
    }

    const isMatched = await bcrypt.compare(password, hash);
    if (!isMatched) {
      return response
        .status(200)
        .send({ ok: false, message: "Password does not match" });
    }
    return response.status(200).send({
      ok: true,
      message: "Password comparison successful",
      isMatch: isMatched,
    });
  } catch (error) {
    console.error("Error comparing password:", error);
    return response
      .status(500)
      .send({ ok: false, message: "Internal server error" });
  }
};

module.exports = {
  testMessage,
  hashPassword,
  comparePassword,
};
