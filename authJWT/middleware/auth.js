const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({ msg: "Acesso negado! Token ausente." });

  try {
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);

    // ✅ Armazena os dados decodificados do token no request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token inválido" });
  }
}

module.exports = { checkToken };
