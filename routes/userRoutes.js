const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const knex = require("knex")(require("../knexfile").development);

router.get("/users", async (req, res) => {
  try {
    const users = await knex("users").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// reigster
router.post("/register", async (req, res) => {
  const { username, email, password, location, bio } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const [userId] = await knex("users")
      .insert({
        username,
        email,
        password_hash: hashedPassword,
        location,
        bio,
        profile_photo: faker.image.urlLoremFlickr({ category: "dog" }),
      })
      .returning("id");
    res.status(201).send({ userId });
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

//get user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex("users").where({ id }).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//login
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;
  const user = await knex("users")
    .where("username", identifier)
    .orWhere("email", identifier)
    .first();

  if (user && (await bcrypt.compare(password, user.password_hash))) {
    const token = jwt.sign({ userId: user.id }, "YOUR_SECRET_KEY", {
      expiresIn: "24h",
    });
    res.json({ token, userId: user.id });
  } else {
    res.status(401).send("Invalid credentials");
  }
});

//Get post w comments
router.get("/posts", async (req, res) => {
  try {
    let posts = await knex("posts")
      .join("users", "posts.user_id", "users.id")
      .select("posts.*", "users.username as username")
      .orderBy("posts.created_at", "desc");

    const baseUrl = process.env.SERVER_BASE_URL || "http://10.0.0.108:3000";

    posts = posts.map((post) => ({
      ...post,
      photo: post.photo.startsWith("http")
        ? post.photo
        : `${baseUrl}${post.photo}`,
    }));

    // Fetch comments for each post
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await knex("comments")
          .where({ post_id: post.id })
          .join("users", "comments.user_id", "=", "users.id")
          .select("comments.*", "users.username as commenter")
          .orderBy("comments.created_at", "desc");

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

//multer for photo upload
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const userId = req.body.user_id;
    const uniqueSuffix =
      userId + "_" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Not an image or video file"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fieldNameSize: 500,
    fieldSize: 1024 * 1024 * 10,
    fileSize: 1024 * 1024 * 100,
  },
});

//post post
router.post("/posts", upload.single("photo"), async (req, res) => {
  const { user_id, caption } = req.body;
  try {
    if (!req.file) {
      throw new Error("File is required");
    }
    const mediaPath = `/uploads/${req.file.filename}`;

    const [newPostId] = await knex("posts").insert({
      user_id,
      caption,
      photo: mediaPath,
    });
    const newPost = await knex("posts").where({ id: newPostId }).first();

    res.json({
      success: true,
      message: "Post created successfully!",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating a post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
});

//post comment
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

//edit user profile
router.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, email, location, bio } = req.body;

  try {
    await knex("users").where({ id: userId }).update({
      username,
      email,
      location,
      bio,
    });
    res.status(200).send({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("error updating profile", error);
  }
});

module.exports = router;
