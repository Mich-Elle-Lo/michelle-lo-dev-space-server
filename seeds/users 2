const bcrypt = require("bcryptjs");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("job_postings").del();
  await knex("likes").del();

  await knex("posts").del();
  await knex("users").del();

  const password1 = bcrypt.hashSync("password123", 10);

  await knex("users").insert([
    {
      id: 1,
      username: "mich.elle.lo",
      email: "michellelo@live.ca",
      password_hash: password1,
      location: "Silicon Valley",
      bio: "Lover of all things tech. And my doggy, Albert <3",
      profile_photo: "/uploads/avatar/MichelleAvatar.JPG",
    },
    {
      id: 2,
      username: "SachieCodes",
      email: "SachieCodes@lovecode.com",
      password_hash: password1,
      location: "The 6IX",
      bio: "Full-stack developer and coffee enthusiast. Dream in JavaScript.",
      profile_photo: "/uploads/avatar/SachieAvatar.jpg",
    },
    {
      id: 3,
      username: "airicodes_",
      email: "airicodes_@codehub.com",
      password_hash: password1,
      location: "Carrie Bradshaw's Apartment",
      bio: "Lifelong Learner, Coder, Linguistic Enthusiast, Existentialism 🔛 Let’s talk about languages over 🍵 & ☕️ ",
      profile_photo: "/uploads/avatar/AmandaAvatar.jpg",
    },
    {
      id: 4,
      username: "AlbeeLo",
      email: "Albert_Lo@example.com",
      password_hash: password1,
      location: "Living Rent Free @ Mom's",
      bio: "Doggy that is obsessed with codes. Throw me a code!",
      profile_photo: "/uploads/avatar/AlbertAvatar.png",
    },
    {
      id: 5,
      username: "Hillary.Dev",
      email: "Hillary@codemail.com",
      password_hash: password1,
      location: "Palo Alto",
      bio: "Coder by day...also coder by night",
      profile_photo: "/uploads/avatar/HillaryAvatar.png",
    },
    {
      id: 6,
      username: "Iryna.IO",
      email: "iryna.io@codemail.com",
      password_hash: password1,
      location: "Toronto",
      bio: "Code magician: I make bugs disappear and features appear. Abracadabra!",
      profile_photo: "/uploads/avatar/IrynaAvatar.png",
    },
    {
      id: 7,
      username: "PamelaPerfectCoder",
      email: "ppcodes@codemail.com",
      password_hash: password1,
      location: "Worldwide",
      bio: "The Perfect Coder: Writes bug-free code on the first try. ",
      profile_photo: "/uploads/avatar/PamelaAvatar.jpg",
    },
    {
      id: 8,
      username: "QuantumKate",
      email: "quantumkate@techwonderland.com",
      password_hash: password1,
      location: "Byteville",
      bio: "Diving into code like Alice in Wonderland ",
      profile_photo: "/uploads/avatar/KateW.jpg",
    },
    {
      id: 9,
      username: "DooleyDataDiver",
      email: "CodeMasterJordan@codemail.com",
      password_hash: password1,
      location: "Always Somewhere New",
      bio: "BrainStation TA: Code mentor by day, tech innovator by night. Shaping the future at Brainstation, one student at a time. ",
      profile_photo: "/uploads/avatar/JordanD.png",
    },
    {
      id: 10,
      username: "SaisudanSyntax",
      email: "SaiScriptSavant@codemail.com",
      password_hash: password1,
      location: "Binary Bluff",
      bio: "Brainstation TA: Where I transform caffeine into developers and debug dreams into reality.",
      profile_photo: "/uploads/avatar/SaisudanB.png",
    },
    {
      id: 11,
      username: "AlexInCodeLand",
      email: "AlexTechTrek@codemail.com",
      password_hash: password1,
      location: "La Salle Script Shores",
      bio: "Your friendly Brainstation TA: decoding the mysteries of code by day, battling bugs by night.",
      profile_photo: "/uploads/avatar/AlexD.png",
    },
    {
      id: 12,
      username: "AnkitaAlgorithm",
      email: "AnkitaAlgorithm@codemail.com",
      password_hash: password1,
      location: "Express City",
      bio: "CodeWhisper. AlgorithmicMaestro.",
      profile_photo: "/uploads/avatar/Ankita.png",
    },
  ]);

  await knex("posts").insert([
    {
      user_id: 1,
      photo: "/uploads/posts/schoolwork.png",
      caption: "Working on BrainStation projects! #SOMUCHFUN :)",
    },
    {
      user_id: 2,
      photo:
        "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "The life of a full-stack developer. #CodeLife",
    },
    {
      user_id: 9,
      photo: "/uploads/posts/dooley.png",
      caption: "DEV SPACE - DOOLEY APPROVED #Golden...Retriever",
    },
    {
      user_id: 12,
      photo: "/uploads/posts/ankitapark.png",
      caption: "When not coding, I love to go to the park for some fresh air. ",
    },
    {
      user_id: 3,
      photo:
        "https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "The art and science of UI/UX design. #DesignThinking",
    },
    {
      user_id: 5,
      photo: "/uploads/posts/Screenshot 2024-02-22 at 8.20.06 PM.png",
      caption:
        "We lost a good one today, he's still around just not teaching us :( #BestEducator",
    },
    {
      user_id: 4,
      photo: "/uploads/posts/albee.png",
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
      photo: "/uploads/posts/VIDEO-2024-02-22-10-51-59.mp4",
      caption: "Tech Events #TechIsLife",
    },
    {
      user_id: 1,
      photo:
        "https://images.unsplash.com/photo-1456615074700-1dc12aa7364d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      caption: "Working on holiday #GottaGetItDone",
    },
    {
      user_id: 3,
      photo: "/uploads/posts/VIDEO-2024-02-22-10-52-00.mp4",
      caption: "Love all these great events! #BrainStation",
    },
    {
      user_id: 6,
      photo: "/uploads/posts/Screenshot 2024-02-22 at 8.19.38 PM.png",
      caption:
        "Lovely meeting the girls from our cohort at the BrainStation Tech Meetup!!",
    },
  ]);

  await knex("comments").insert([
    { post_id: 1, user_id: 2, comment: "Really insightful post!" },
    { post_id: 1, user_id: 3, comment: "Love it!!" },
    { post_id: 2, user_id: 1, comment: "Love this! #CodeLife" },
    { post_id: 4, user_id: 4, comment: "Wow, amazing!!" },
    { post_id: 5, user_id: 3, comment: "Sooo cool!!! WOW!" },
    { post_id: 3, user_id: 1, comment: "Loving the content!! Keep it up!!" },
  ]);

  await knex("job_postings").insert([
    {
      company_id: 1,
      job_title: "Senior Frontend Developer",
      job_description: "We're looking for a seasoned frontend developer...",
      location: "Remote",
      salary_range: "100,000-120,000",
      job_type: "Full-time",
      experience_level: "Senior",
      qualifications: "React, JavaScript, CSS",
      industry: "Tech",
      posted_date: new Date().toISOString().slice(0, 10),
      expiration_date: new Date(new Date().setDate(new Date().getDate() + 30))
        .toISOString()
        .slice(0, 10),
      status: "active",
      application_email_or_link: "apply@ibm.com",
    },
    {
      company_id: 1,
      job_title: "Junior Software Developer",
      job_description:
        "Seeking a passionate junior developer to join our dynamic team. Proficiency in Java or Python is a plus.",
      location: "Silicon Valley",
      salary_range: "60,000 - 75,000",
      job_type: "Full-time",
      experience_level: "Junior",
      qualifications: "Bachelor's in Computer Science or related field.",
      industry: "Technology",
      posted_date: new Date().toISOString().split("T")[0],
      expiration_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      status: "active",
      application_email_or_link: "apply@techvalley.com",
    },
    {
      company_id: 2,
      job_title: "Full Stack Developer",
      job_description:
        "BrainStation is looking for a newly graduated full stack developer to assint in our development projects. Must be proficient in JavaScript frameworks.",
      location: "Remote",
      salary_range: "100,000 - 130,000",
      job_type: "Full-time",
      experience_level: "Junior",
      qualifications: "Bootcamp Graduates",
      industry: "Software",
      posted_date: new Date().toISOString().split("T")[0],
      expiration_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      status: "active",
      application_email_or_link: "careers@BrainStation.io",
    },
    {
      company_id: 3,
      job_title: "Data Scientist",
      job_description:
        "Data wizard needed to transform our data into insights. Experience with machine learning and statistical modeling required.",
      location: "New York",
      salary_range: "90,000 - 120,000",
      job_type: "Full-time",
      experience_level: "Mid-level",
      qualifications: "Proficient in Python, SQL, and ML algorithms.",
      industry: "Tech",
      posted_date: new Date().toISOString().split("T")[0],
      expiration_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      status: "active",
      application_email_or_link: "datajobs@analytics.com",
    },
    {
      company_id: 4,
      job_title: "UX/UI Designer",
      job_description:
        "Creative UX/UI designer to craft intuitive user experiences. Must have a strong portfolio demonstrating design thinking.",
      location: "Boston",
      salary_range: "70,000 - 90,000",
      job_type: "Full-time",
      experience_level: "Mid-level",
      qualifications: "Experience with Figma, Sketch, and Adobe suite.",
      industry: "Design",
      posted_date: new Date().toISOString().split("T")[0],
      expiration_date: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
      status: "active",
      application_email_or_link: "design@creatives.com",
    },
  ]);

  // Insert likes
  await knex("likes").insert([
    { post_id: 1, user_id: 2 },
    { post_id: 2, user_id: 3 },
    { post_id: 3, user_id: 6 },
    { post_id: 4, user_id: 4 },
  ]);
};
