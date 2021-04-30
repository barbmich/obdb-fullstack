const db = require("../database/dbConnect");
const { hash } = require("bcryptjs");
class UserAPI {
  constructor() {
    this.db = db;
  }

  // Queries

  async getAllUsers() {
    const users = await this.db.query("SELECT id, name, email FROM users");
    return users.rows;
  }

  async getUser({ id }) {
    const res = await this.db.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [id]
    );
    return res.rows[0];
  }

  async getUserByEmail({ email }) {
    const user = await this.db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];
  }

  async getUserLikes({ id }) {
    const likes = await this.db.query(
      "SELECT brewery_id FROM likes WHERE user_id = $1",
      [id]
    );
    return likes.rows.map((like) => like.brewery_id);
  }

  Mutations;

  async createUser({ name, email, password }) {
    const hashedPassword = await hash(password, 10);
    const insert = await this.db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );
    return insert.rows[0];
  }

  async addLike({ id, brewery_id }) {
    try {
      const check = await this.db.query(
        "SELECT * FROM likes WHERE user_id = $1 AND brewery_id = $2",
        [id, brewery_id]
      );
      if (check.rowCount !== 0) {
        return true;
      }
      const add = await this.db.query(
        "INSERT INTO likes (user_id, brewery_id) VALUES ($1, $2)",
        [id, brewery_id]
      );
      if (add.rowCount === 0) {
        throw new Error("Error occurred while liking brewery");
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
    return true;
  }

  async removeLike({ id, brewery_id }) {
    try {
      const check = await this.db.query(
        "SELECT * FROM likes WHERE user_id = $1 AND brewery_id = $2",
        [id, brewery_id]
      );
      if (check.rowCount === 0) {
        return true;
      }
      const remove = await this.db.query(
        "DELETE FROM likes WHERE user_id = $1 AND brewery_id = $2",
        [id, brewery_id]
      );
      if (remove.rowCount === 0) {
        throw new Error("Error occurred while liking brewery");
      }
    } catch (error) {
      throw new Error(`${error.message}`);
    }
    return true;
  }
}

module.exports = UserAPI;
