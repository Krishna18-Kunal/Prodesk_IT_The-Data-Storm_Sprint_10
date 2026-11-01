// const mongoose = require("mongoose");

// const postSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//       minlength: 1,
//       maxlength: 200,
//     },

//     content: {
//       type: String,
//       required: [true, "Content is required"],
//       trim: true,
//     },

//     author: {
//       type: String,
//       trim: true,
//       default: "Anonymous",
//     },

//     authorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// module.exports = mongoose.model("Post", postSchema);






const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    author: {
      type: String,
      default: "Anonymous",
      trim: true,
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", postSchema);
