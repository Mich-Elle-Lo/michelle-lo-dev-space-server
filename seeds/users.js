/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("comments").del();
  await knex("posts").del();
  await knex("users").del();

  await knex("users").insert([
    {
      id: 1,
      username: "mich.elle.lo",
      email: "michellelo@live.ca",
      location: "Silicon Valley",
      bio: "Lover of all things tech, from AI to zero-day exploits.",
      profile_photo:
        "https://unsplash.com/photos/macro-photography-of-human-eye-In4XVKhYaiI",
    },
    {
      id: 2,
      username: "sheCodes",
      email: "sheCodes@lovecode.com",
      location: "Seattle",
      bio: "Full-stack developer and coffee enthusiast. Dream in JavaScript.",
      profile_photo:
        "https://unsplash.com/photos/closeup-photography-of-woman-smiling-mEZ3PoFGs_k",
    },
    {
      id: 3,
      username: "BenCoder",
      email: "BenCoder@example.com",
      location: "New York",
      bio: "UI/UX designer with a passion for creating intuitive user experiences.",
      profile_photo:
        "https://unsplash.com/photos/boys-face-close-up-photography-n4KewLKFOZw",
    },
    {
      id: 4,
      username: "Albert Lo",
      email: "Albert_Lo@example.com",
      location: "New York",
      bio: "Doggy that is obsessed with codes. Throw me a code!",
      profile_photo:
        "https://images.unsplash.com/photo-1641853668023-798ea11eb6a2?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]);

  await knex("posts").insert([
    {
      user_id: 1,
      photo:
        "https://plus.unsplash.com/premium_photo-1682824039145-7156993a9bc3?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption:
        "Exploring how AI is reshaping our future. #ArtificialIntelligence",
    },
    {
      user_id: 2,
      photo:
        "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "The life of a full-stack developer. #CodeLife",
    },
    {
      user_id: 3,
      photo:
        "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "The art and science of UI/UX design. #DesignThinking",
    },
    {
      user_id: 4,
      photo:
        "https://images.unsplash.com/photo-1589652717406-1c69efaf1ff8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Bring your dog to work day! #DogsThatCode",
    },
    {
      user_id: 4,
      photo:
        "https://images.unsplash.com/photo-1615347657696-0144a9249d9b?q=80&w=2320&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Working hard or hardley working? #DogsThatCode",
    },
    {
      user_id: 3,
      photo:
        "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "The art of coding #CodingIsLife",
    },
    {
      user_id: 1,
      photo:
        "https://images.unsplash.com/photo-1456615074700-1dc12aa7364d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Working on holiday #GottaGetItDone",
    },
  ]);

  await knex("comments").insert([
    { post_id: 1, user_id: 2, comment: "Really insightful post!" },
    { post_id: 1, user_id: 3, comment: "I agree, AI is reshaping our future." },
    { post_id: 2, user_id: 1, comment: "Love this! #CodeLife" },
    { post_id: 4, user_id: 4, comment: "Wow, amazing!!" },
    { post_id: 5, user_id: 3, comment: "Sooo cool!!! WOW!" },
    { post_id: 3, user_id: 1, comment: "Loving the content!! Keep it up!!" },
  ]);
};
