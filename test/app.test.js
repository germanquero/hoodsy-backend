const request = require("supertest");
const server = require("../app");

const admin_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDU0YWYwNjMwZjU4YzM4MjVkN2Y3ODkiLCJpYXQiOjE2ODMyNzE0MzB9.EiuEzonl8f6C8RGqnRzTsuukDBvi3ZgJVnh77GEqT_o";
const merch_tokens = [];
const user_tokens = [];
const user_ids = [];
const pages_ids = [];
describe("Admins -> Admins", () => {
  var id = "";

  it("should return 200 OK and create a new admin for POST /admin", async () => {
    const response = await request(server)
      .post("/admins")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Hoodsy Admin 1",
        email: "admin1@hoodsy.com",
        phoneNumber: "600000001",
      });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and a list of admins for GET /admin", async () => {
    const response = await request(server)
      .get("/admins")
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
    id = response.body.pop()._id;
  });

  it("should return 200 OK and the admin and token by id for GET /admin/{id}", async () => {
    const response = await request(server)
      .get("/admins/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and edit the new admin for PUT /admin/{id}", async () => {
    const response = await request(server)
      .put("/admins/" + id)
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Hoodsy Admin 2",
        email: "admin2@hoodsy.com",
        phoneNumber: "600000002",
      });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and delete the new admin for DELETE /admin/{id}", async () => {
    const response = await request(server)
      .delete("/admins/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("should return 403 Forbiden GET /admin/{id}", async () => {
    const response = await request(server)
      .get("/admins/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(403);
  });
});

describe("Admins -> Merchants", () => {
  var id = "";

  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant",
        cif: "B-00000000",
        address: "Sample Street, 0",
        city: "Sample City",
        email: "merchant@mail.com",
        phoneNumber: "900000000",
      });
    expect(response.statusCode).toBe(200);
    merch_tokens.push(response.text);
  });

  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 1",
        cif: "B-00000001",
        address: "Sample Street, 1",
        city: "New Sample City",
        email: "merchant1@mail.com",
        phoneNumber: "900000001",
      });
    expect(response.statusCode).toBe(200);
    merch_tokens.push(response.text);
  });

  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 2",
        cif: "B-00000002",
        address: "Sample Street, 2",
        city: "Sample City",
        email: "merchant2@mail.com",
        phoneNumber: "900000002",
      });
    expect(response.statusCode).toBe(200);
    merch_tokens.push(response.text);
  });
  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 5",
        cif: "B-00000005",
        address: "Sample Street, 5",
        city: "Sample City",
        email: "merchant5@mail.com",
        phoneNumber: "900000005",
      });
    expect(response.statusCode).toBe(200);
    merch_tokens.push(response.text);
  });
  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 6",
        cif: "B-00000006",
        address: "Sample Street, 6",
        city: "Sample City",
        email: "merchant6@mail.com",
        phoneNumber: "900000006",
      });
    expect(response.statusCode).toBe(200);
    merch_tokens.push(response.text);
  });

  it("should return 200 OK and create a new merchant for POST /merchants", async () => {
    const response = await request(server)
      .post("/merchants")
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 3",
        cif: "B-00000003",
        address: "Sample Street, 3",
        city: "New Sample City",
        email: "merchant3@mail.com",
        phoneNumber: "900000003",
      });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and get list of merchants for GET /merchants", async () => {
    const response = await request(server)
      .get("/merchants")
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
    id = response.body.pop()._id;
  });

  it("should return 200 OK and merchant data and token for GET /merchants/account/{id}", async () => {
    const response = await request(server)
      .get("/merchants/account/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and edit a merchant for PUT /merchants/account/{id}", async () => {
    const response = await request(server)
      .put("/merchants/account/" + id)
      .auth(admin_token, { type: "bearer" })
      .send({
        name: "Merchant 4",
        cif: "B-00000004",
        address: "Sample Street, 4",
        city: "New Sample City",
        email: "merchant4@mail.com",
        phoneNumber: "900000004",
      });
    expect(response.statusCode).toBe(200);
  });

  it("should return 200 OK and delete the merchant for DELETE /merchants/account/{id}", async () => {
    const response = await request(server)
      .delete("/merchants/account/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });

  it("should return 403 Forbiden GET /merchants/account/{id}", async () => {
    const response = await request(server)
      .get("/merchants/account/" + id)
      .auth(admin_token, { type: "bearer" });
    expect(response.statusCode).toBe(403);
  });
});
describe("Merchants -> Merchants", () => {
  it("should return 200 OK and the merchant profile for GET /merchants/account", async () => {
    const response = await request(server)
      .get("/merchants/account")
      .auth(merch_tokens[0], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    pages_ids.push(response.body.page);
  });
  it("should return 200 OK and the merchant profile for GET /merchants/account", async () => {
    const response = await request(server)
      .get("/merchants/account")
      .auth(merch_tokens[1], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    pages_ids.push(response.body.page);
  });
  it("should return 200 OK and the merchant profile for GET /merchants/account", async () => {
    const response = await request(server)
      .get("/merchants/account")
      .auth(merch_tokens[2], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    pages_ids.push(response.body.page);
  });
  it("should return 200 OK and the merchant profile for GET /merchants/account", async () => {
    const response = await request(server)
      .get("/merchants/account")
      .auth(merch_tokens[3], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    pages_ids.push(response.body.page);
  });
  it("should return 200 OK and edit the merchant profile PUT /merchants/account", async () => {
    const response = await request(server)
      .put("/merchants/account")
      .auth(merch_tokens[0], { type: "bearer" })
      .send({
        name: "Merchant 0",
        cif: "B-00000000",
        address: "Sample Street, 0",
        city: "New Sample City",
        email: "merchant0@mail.com",
        phoneNumber: "900000000",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the merchant profile PUT /merchants/account", async () => {
    const response = await request(server)
      .put("/merchants/account")
      .auth(merch_tokens[2], { type: "bearer" })
      .send({
        name: "Merchant 3",
        cif: "B-00000003",
        address: "Sample Street, 3",
        city: "New Sample City",
        email: "merchant3@mail.com",
        phoneNumber: "900000003",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the merchant profile PUT /merchants/account", async () => {
    const response = await request(server)
      .put("/merchants/account")
      .auth(merch_tokens[1], { type: "bearer" })
      .send({
        name: "Merchant 2",
        cif: "B-00000002",
        address: "Sample Street, 2",
        city: "Sample City",
        email: "merchant2@mail.com",
        phoneNumber: "900000002",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and delete the merchant for DELETE /merchants/account", async () => {
    const response = await request(server)
      .delete("/merchants/account")
      .auth(merch_tokens[4], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 403 Forbiden for GET /merchants/account", async () => {
    const response = await request(server)
      .get("/merchants/account")
      .auth(merch_tokens[4], { type: "bearer" });
    expect(response.statusCode).toBe(403);
  });
});

describe("Merchants -> Pages", () => {
  it("should return 200 OK and make published true on the webpage for POST /webpages", async () => {
    const response = await request(server)
      .post("/webpages")
      .auth(merch_tokens[0], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and make published true on the webpage for POST /webpages", async () => {
    const response = await request(server)
      .post("/webpages")
      .auth(merch_tokens[1], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and make published true on the webpage for POST /webpages", async () => {
    const response = await request(server)
      .post("/webpages")
      .auth(merch_tokens[2], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and make published true on the webpage for POST /webpages", async () => {
    const response = await request(server)
      .post("/webpages")
      .auth(merch_tokens[3], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and make published true on the webpage for DELETE /webpages", async () => {
    const response = await request(server)
      .delete("/webpages")
      .auth(merch_tokens[3], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the webpage for PUT /webpages", async () => {
    const response = await request(server)
      .put("/webpages")
      .auth(merch_tokens[0], { type: "bearer" })
      .send({
        city: "New Sample City",
        location: "Sample Street, 0",
        activity: "Fast Food",
        title: "NSC-FF",
        summary: "The best fast food of all NSC",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the webpage for PUT /webpages", async () => {
    const response = await request(server)
      .put("/webpages")
      .auth(merch_tokens[1], { type: "bearer" })
      .send({
        city: "Sample City",
        location: "Sample Street, 2",
        activity: "Concerts",
        title: "SC-Shows",
        summary: "The best live shows of all SC",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the webpage for PUT /webpages", async () => {
    const response = await request(server)
      .put("/webpages")
      .auth(merch_tokens[2], { type: "bearer" })
      .send({
        city: "New Sample City",
        location: "Sample Street, 3",
        activity: "Concerts",
        title: "NSC-Shows",
        summary: "The best live shows of all NSC",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the webpage for PUT /webpages", async () => {
    const response = await request(server)
      .put("/webpages")
      .auth(merch_tokens[3], { type: "bearer" })
      .send({
        city: "Sample City",
        location: "Sample Street, 5",
        activity: "Fast Food",
        title: "SC-FF",
        summary: "The best fast food of all SC",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post some texts to the webpage for POST /webpages/texts", async () => {
    const response = await request(server)
      .post("/webpages/texts")
      .auth(merch_tokens[0], { type: "bearer" })
      .send({
        texts: ["New Sample City", "Fast Food", "Best"],
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post some texts to the webpage for POST /webpages/texts", async () => {
    const response = await request(server)
      .post("/webpages/texts")
      .auth(merch_tokens[1], { type: "bearer" })
      .send({
        texts: ["Sample City", "Live Shows", "Best"],
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post some texts to the webpage for POST /webpages/texts", async () => {
    const response = await request(server)
      .post("/webpages/texts")
      .auth(merch_tokens[2], { type: "bearer" })
      .send({
        texts: ["New Sample City", "Live Shows", "Best"],
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post some texts to the webpage for POST /webpages/texts", async () => {
    const response = await request(server)
      .post("/webpages/texts")
      .auth(merch_tokens[3], { type: "bearer" })
      .send({
        texts: ["Sample City", "Fast Food", "Best"],
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post some texts to the webpage for DELETE /webpages/texts", async () => {
    const response = await request(server)
      .delete("/webpages/texts")
      .auth(merch_tokens[3], { type: "bearer" })
      .send({
        texts: ["Sample City"],
      });
    expect(response.statusCode).toBe(200);
  });
});
describe("Login -> Users", () => {
  var url = "";
  it("should return 200 OK and create a new user for POST /login/signup", async () => {
    const response = await request(server)
      .post("/login/signup")
      .send({
        name: "John",
        age: 20,
        city: "Sample City",
        interests: ["Fast Food", "Concerts"],
        allowsReceivingOffers: true,
        email: "john@mail.com",
        password: "SuperSecretPassword",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and a temporary url for changin the password for POST /login/forgot-password", async () => {
    const response = await request(server).post("/login/forgot-password").send({
      email: "john@mail.com",
    });
    expect(response.statusCode).toBe(200);
    url = response.text.replace("http://localhost:3000", "");
  });
  it("should return 200 OK and change the password for POST /login/forgot-password/{temporary_token}", async () => {
    const response = await request(server).post(url).send({
      password: "SuperSecretPassword2",
    });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and login the user for POST /login", async () => {
    const response = await request(server).post("/login").send({
      email: "john@mail.com",
      password: "SuperSecretPassword2",
    });
    expect(response.statusCode).toBe(200);
    user_tokens.push(response.text);
  });
  it("should return 200 OK and create a new user for POST /login/signup", async () => {
    const response = await request(server)
      .post("/login/signup")
      .send({
        name: "Ringo",
        age: 22,
        city: "New Sample City",
        interests: ["Concerts"],
        allowsReceivingOffers: false,
        email: "ringo@mail.com",
        password: "SecretPassword1",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and login the user for POST /login", async () => {
    const response = await request(server).post("/login").send({
      email: "ringo@mail.com",
      password: "SecretPassword1",
    });
    expect(response.statusCode).toBe(200);
    user_tokens.push(response.text);
  });
  it("should return 200 OK and create a new user for POST /login/signup", async () => {
    const response = await request(server)
      .post("/login/signup")
      .send({
        name: "Paul",
        age: 21,
        city: "New Sample City",
        interests: ["Fast Food"],
        allowsReceivingOffers: true,
        email: "paul@mail.com",
        password: "SecretPassword13",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and login the user for POST /login", async () => {
    const response = await request(server).post("/login").send({
      email: "paul@mail.com",
      password: "SecretPassword13",
    });
    expect(response.statusCode).toBe(200);
    user_tokens.push(response.text);
  });
  it("should return 200 OK and create a new user for POST /login/signup", async () => {
    const response = await request(server)
      .post("/login/signup")
      .send({
        name: "George",
        age: 23,
        city: "New Sample City",
        interests: ["Fast Food", "Concerts"],
        allowsReceivingOffers: true,
        email: "george@mail.com",
        password: "SuperSecretPassword12",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and login the user for POST /login", async () => {
    const response = await request(server).post("/login").send({
      email: "george@mail.com",
      password: "SuperSecretPassword12",
    });
    expect(response.statusCode).toBe(200);
    user_tokens.push(response.text);
  });
});

describe("Users -> Users", () => {
  it("should return 200 OK and get the user for GET /account", async () => {
    const response = await request(server)
      .get("/account")
      .auth(user_tokens[0], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    user_ids.push(response.body._id);
  });
  it("should return 200 OK and get the user for GET /account", async () => {
    const response = await request(server)
      .get("/account")
      .auth(user_tokens[1], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    user_ids.push(response.body._id);
  });
  it("should return 200 OK and get the user for GET /account", async () => {
    const response = await request(server)
      .get("/account")
      .auth(user_tokens[2], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    user_ids.push(response.body._id);
  });
  it("should return 200 OK and get the user for GET /account", async () => {
    const response = await request(server)
      .get("/account")
      .auth(user_tokens[3], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and edit the user for PUT /account", async () => {
    const response = await request(server)
      .put("/account")
      .auth(user_tokens[3], { type: "bearer" })
      .send({
        name: "Georgina",
        age: 24,
        city: "New Sample City",
        interests: ["Fast Food", "Concerts", "Vegan Food"],
        allowsReceivingOffers: true,
        email: "georgina@mail.com",
        password: "SuperSecretPassword12",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and a temporary url for changin the password for POST /account/change-password", async () => {
    const response = await request(server)
      .post("/account/change-password")
      .auth(user_tokens[3], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    url = response.text.replace("http://localhost:3000", "");
  });
  it("should return 200 OK and change the password for POST /account/change-password/{temporary_token}", async () => {
    const response = await request(server)
      .post(url)
      .auth(user_tokens[3], { type: "bearer" })
      .send({
        password: "SuperSecretPassword7",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and change the email for POST /account/change-email", async () => {
    const response = await request(server)
      .post("/account/change-email")
      .auth(user_tokens[3], { type: "bearer" })
      .send({
        email: "georgina1@mail.com",
        password: "SuperSecretPassword7",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and delete the user for DELETE /account", async () => {
    const response = await request(server)
      .delete("/account")
      .auth(user_tokens[3], { type: "bearer" })
      .send({
        password: "SuperSecretPassword7",
      });
    expect(response.statusCode).toBe(200);
  });
});

describe("Users -> Reviews", () => {
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[0])
      .auth(user_tokens[0], { type: "bearer" })
      .send({
        score: 4.5,
        review: "Good.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[1])
      .auth(user_tokens[0], { type: "bearer" })
      .send({
        score: 3.5,
        review: "Nice.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[2])
      .auth(user_tokens[0], { type: "bearer" })
      .send({
        score: 2.5,
        review: "Meh.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 403 Forbiden for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[3])
      .auth(user_tokens[0], { type: "bearer" })
      .send({
        score: 1.5,
        review: "Just Bad.",
      });
    expect(response.statusCode).toBe(403);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[0])
      .auth(user_tokens[1], { type: "bearer" })
      .send({
        score: 4.75,
        review: "So Good.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[2])
      .auth(user_tokens[1], { type: "bearer" })
      .send({
        score: 3.25,
        review: "Not so nice.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[1])
      .auth(user_tokens[1], { type: "bearer" })
      .send({
        score: 1.5,
        review: "So bad.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[0])
      .auth(user_tokens[2], { type: "bearer" })
      .send({
        score: 4.95,
        review: "Great.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[1])
      .auth(user_tokens[1], { type: "bearer" })
      .send({
        score: 0.25,
        review: "Horrible.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and post a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[2])
      .auth(user_tokens[1], { type: "bearer" })
      .send({
        score: 2.5,
        review: "Could be better.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and override a review on the webpage for POST /webpages/review/{id}", async () => {
    const response = await request(server)
      .post("/webpages/review/" + pages_ids[1])
      .auth(user_tokens[0], { type: "bearer" })
      .send({
        score: 3.25,
        review: "Just nice.",
      });
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and delete a review on the webpage for DELETE /webpages/review/{id}", async () => {
    const response = await request(server)
      .delete("/webpages/review/" + pages_ids[1])
      .auth(user_tokens[1], { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
});

describe("Public Info", () => {
  it("should return 200 OK for GET /webpages", async () => {
    const response = await request(server).get("/webpages");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });
  it("should return 200 OK for GET /webpages with city=Sample City&scoring=true", async () => {
    const response = await request(server).get(
      "/webpages?city=Sample%20City&scoring=true"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK for GET /webpages with city=New Sample City", async () => {
    const response = await request(server).get(
      "/webpages?city=New%20Sample%20City"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should return 200 OK for GET /webpages with activity=Fast Food", async () => {
    const response = await request(server).get(
      "/webpages?activity=Fast%20Food"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK for GET /webpages with activity=Concerts&scoring=true", async () => {
    const response = await request(server).get(
      "/webpages?activity=Concerts&scoring=true"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });
  it("should return 200 OK for GET /webpages with city=Sample City and activity=Fast Food", async () => {
    const response = await request(server).get(
      "/webpages?city=Sample%20City&activity=Fast%20Food"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
  it("should return 200 OK for GET /webpages with city=Sample City and activity=Concerts", async () => {
    const response = await request(server).get(
      "/webpages?city=Sample%20City&activity=Concerts"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK for GET /webpages with city=New Sample City and activity=Fast Food&scoring=true", async () => {
    const response = await request(server).get(
      "/webpages?city=New%20Sample%20City&activity=Fast%20Food&scoring=true"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK for GET /webpages with city=New Sample City and activity=Concerts", async () => {
    const response = await request(server).get(
      "/webpages?city=New%20Sample%20City&activity=Concerts"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK for GET /users/public/{id}", async () => {
    const response = await request(server).get("/users/public/" + user_ids[0]);
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK for GET /users/public/{id}", async () => {
    const response = await request(server).get("/users/public/" + user_ids[1]);
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK for GET /users/public/{id}", async () => {
    const response = await request(server).get("/users/public/" + user_ids[2]);
    expect(response.statusCode).toBe(200);
  });
  it("should return 200 OK and list of emails for GET /users/offers", async () => {
    const response = await request(server)
      .get("/users/offers")
      .auth(merch_tokens[0], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
  it("should return 200 OK and list of emails for GET /users/offers?activity={activity}", async () => {
    const response = await request(server)
      .get("/users/offers?activity=Concerts")
      .auth(merch_tokens[0], { type: "bearer" });
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
