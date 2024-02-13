const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile").development);

router.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Get post w comments
router.get("/posts", async (req, res) => {
  try {
    let posts = await knex("posts")
      .join("users", "posts.user_id", "users.id")
      .select("posts.*", "users.username as username");

    // Fetch comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await knex("comments")
          .where({ post_id: post.id })
          .join("users", "comments.user_id", "=", "users.id")
          .select("comments.*", "users.username as commenter");

        return {
          ...post,
          comments,
        };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await knex("comments")
      .where({ post_id: postId })
      .join("users", "comments.user_id", "=", "users.id")
      .select("comments.*", "users.username as commenter");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

router.post("/posts/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { user_id, comment } = req.body;
  try {
    const [commentId] = await knex("comments").insert({
      post_id: postId,
      user_id,
      comment,
    });
    res.status(201).json({ message: "Comment added", id: commentId });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports = router;
