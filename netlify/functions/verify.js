const crypto = require("crypto");

// Map of SHA-256 password hashes to { name, url }
const DECKS = {
  "ea69393999507fac18bc6bd1e61c974fabb0634d923b8dc7975d768d9fc08f94": {
    name: "main",
    url: "https://www.canva.com/design/DAHBbNabE3I/eRv8oWweOoUavxy_P40tUA/view?embed",
  },
  "b8fbe575c867605236166896e58f6f86b5a9fc082fdbd8478a23c637c9ccc767": {
    name: "anotherdesign",
    url: "https://www.canva.com/design/DAHCKAM3-B8/-6p2o5pvuKscE8A1tybZ_A/view?embed",
  },
};

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
  const deck = DECKS[hash];

  if (!deck) {
    return { statusCode: 401, body: "Incorrect password" };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ url: deck.url, deck: deck.name }),
  };
};
