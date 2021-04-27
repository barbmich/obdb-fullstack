const db = require("../database/dbConnect");
const { hash } = require("bcryptjs");
const { ApolloError: Error } = require("apollo-server-core");

class UserAPI {
  constructor() {}

  // Queries

  async getAllUsers() {
    const users = await db.query("SELECT * FROM users");
    return users.rows;
  }

  async getUser({ id }) {
    const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const likes = await this.getUserLikes({ id });
    return { ...res.rows[0], likes };
  }

  async getUserByEmail({ email }) {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return user.rows[0];
  }

  async getUserLikes({ id }) {
    const likes = await db.query(
      "SELECT brewery_id FROM likes WHERE user_id = $1",
      [id]
    );
    return likes.rows.map((like) => like.brewery_id);
  }

  // Mutations

  async createUser({ name, email, password }) {
    const hashedPassword = await hash(password, 10);
    const insert = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return insert.rows[0];
  }

  async addLike({ id, brewery_id }) {
    try {
      const check = await db.query(
        "SELECT * FROM likes WHERE user_id = $1 AND brewery_id = $2",
        [id, brewery_id]
      );
      if (check.rowCount !== 0) {
        return true;
      }
      const add = await db.query(
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
      const check = await db.query(
        "SELECT * FROM likes WHERE user_id = $1 AND brewery_id = $2",
        [id, brewery_id]
      );
      if (check.rowCount === 0) {
        return true;
      }
      const remove = await db.query(
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
