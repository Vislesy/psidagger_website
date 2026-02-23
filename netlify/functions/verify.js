const crypto = require("crypto");

const PASSWORD_HASH =
  "ea69393999507fac18bc6bd1e61c974fabb0634d923b8dc7975d768d9fc08f94";
const DECK_URL =
  "https://www.canva.com/design/DAHBbNabE3I/eRv8oWweOoUavxy_P40tUA/view?embed";

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  let password;
  try {
    password = JSON.parse(event.body).password;
  } catch {
    return { statusCode: 400, body: "Bad request" };
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  if (hash !== PASSWORD_HASH) {
    return { statusCode: 401, body: "Incorrect password" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ url: DECK_URL }),
  };
};
