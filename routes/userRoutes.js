const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const knex = require("knex")(require("../knexfile").development);
const { uploadPost, uploadAvatar } = require("./multerConfig");

router.get("/users", async (req, res) => {
  try {
    const baseUrl = process.env.SERVER_BASE_URL || "http://localhost:3000";
    const users = await knex("users").select("*");

    const usersProfile = users.map((user) => {
      if (user.profile_photo && !user.profile_photo.startsWith("http")) {
        user.profile_photo = `${baseUrl}${user.profile_photo}`;
      }
      return user;
    });

    if (usersProfile.length) {
      res.json(usersProfile);
    } else {
      res.status(404).json({ error: "Users not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// reigster
router.post("/register", uploadAvatar.single("avatar"), async (req, res) => {
  const { username, email, password, location, bio } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    let profile_photo = null;
    if (req.file) {
      profile_photo = `/uploads/avatar/${req.file.filename}`;
    }

    const [userId] = await knex("users").insert({
      username,
      email,
      password_hash: hashedPassword,
      location,
      bio,
      profile_photo,
    });

    res
      .status(201)
      .json({ userId, message: "User registered successfully", profile_photo });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).send("Error registering user.");
  }
});

//get user by ID
router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex("users").where({ id }).first();
    if (user) {
      const baseUrl = process.env.SERVER_BASE_URL || "http://localhost:3000";

      if (user.profile_photo && !user.profile_photo.startsWith("http")) {
        user.profile_photo = `${baseUrl}${user.profile_photo}`;
      }

      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
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
      .select(
        "posts.*",
        "users.username as username",
        "users.profile_photo as profile_photo"
      )
      .orderBy("posts.created_at", "desc");

    const baseUrl = process.env.SERVER_BASE_URL || "http://10.0.0.108:3000";

    posts = posts.map((post) => ({
      ...post,
      photo: post.photo.startsWith("http")
        ? post.photo
        : `${baseUrl}${post.photo}`,
      profile_photo: post.profile_photo.startsWith("http")
        ? post.profile_photo
        : `${baseUrl}${post.profile_photo}`,
      is_video: post.photo.endsWith(".mp4"),
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

// get posts with comments for a user
router.get("/users/:userId/posts", async (req, res) => {
  const { userId } = req.params;

  try {
    let posts = await knex("posts")
      .where("posts.user_id", userId)
      .join("users", "posts.user_id", "users.id")
      .select(
        "posts.*",
        "users.username as username",
        "users.profile_photo as profile_photo"
      )
      .orderBy("posts.created_at", "desc");

    const baseUrl = process.env.SERVER_BASE_URL || "http://10.0.0.108:3000";

    posts = posts.map((post) => ({
      ...post,
      photo: post.photo.startsWith("http")
        ? post.photo
        : `${baseUrl}${post.photo}`,
      profile_photo: post.profile_photo.startsWith("http")
        ? post.profile_photo
        : `${baseUrl}${post.profile_photo}`,
      is_video: post.photo.endsWith(".mp4"),
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
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

//post post
router.post("/posts", uploadPost.single("photo"), async (req, res) => {
  const { user_id, caption } = req.body;
  try {
    if (!req.file) {
      throw new Error("File is required");
    }
    const postMediaPath = `/uploads/posts/${req.file.filename}`;

    const [newPostId] = await knex("posts").insert({
      user_id,
      caption,
      photo: postMediaPath,
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

//Get job postings
router.get("/job_postings", async (req, res) => {
  try {
    const postings = await knex("job_postings").select("*");
    res.json(postings);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Unable to fetch job postings" });
  }
});

//Post job postings
router.post("/job_postings", async (req, res) => {
  try {
    const posting = await knex("job_postings")
      .insert({
        company_id: req.body.company_id,
        job_title: req.body.job_title,
        job_description: req.body.job_description,
        location: req.body.location,
        salary_range: req.body.salary_range,
        job_type: req.body.job_type,
        experience_level: req.body.experience_level,
        qualifications: req.body.qualifications,
        industry: req.body.industry,
        posted_date: req.body.posted_date,
        expiration_date: req.body.expiration_date,
        status: req.body.status,
        application_email_or_link: req.body.application_email_or_link,
      })
      .returning("*");
    res.json(posting);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Unable to add job posting" });
  }
});

module.exports = router;
