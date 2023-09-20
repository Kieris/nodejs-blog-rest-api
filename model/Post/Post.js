const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Post description is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Post category is required"]
    },
    numViews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    dislikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    },
    photo: {
        type: String,
        // required: [true, "Post image is required"]
    },
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    });

postSchema.pre('findOne', async function (next) {
    //console.log(this.createdAt);//not available here. only id is.
    //add virtual property
    postSchema.virtual('postDate').get(function () {
        const postDate = new Date(this.createdAt);
        return postDate.toDateString();
    });
    
    postSchema.virtual('daysAgo').get(function () {
        const postDate = new Date(this.createdAt);
        const diff = (new Date() - postDate) / (1000 * 3600 * 24);
        if (Math.floor(diff) <= 0) {
            return "Today";
        } else if (daysAgo == 1) {
            return "Yesterday";
        } else {
            return `${daysAgo} days ago`;
        }
    });
    next();
});

//Get likes count
postSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

//Get dislikes count
postSchema.virtual('dislikeCount').get(function () {
    return this.dislikes.length;
});

//Get views count
postSchema.virtual('viewCount').get(function () {
    return this.numViews.length;
});

//Get like percentage
postSchema.virtual('likePerc').get(function () {
    const total = this.dislikes.length + this.likes.length;
    return total === 0 ? 0 :(this.likes.length / total) * 100;
});

//Get dislike percentage
postSchema.virtual('dislikePerc').get(function () {
    const total = this.dislikes.length + this.likes.length;
    return total === 0 ? 0 : (this.dislikes.length / total) * 100;
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;