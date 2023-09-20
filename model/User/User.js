const mongoose = require('mongoose');
const Post = require('../../model/Post/Post');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required']
    },
    profilePhoto: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    postCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor"]
    },
    viewedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    active: {
        type: Boolean,
        default: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    blocked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    // plan: {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free"
    // },
    userAward: {
        type: String,
        enum: ["Bronze", "Silver", "Gold"],
        default: "Bronze"
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);

//---Hooks---

// when user record is looked up
userSchema.pre('findOne', async function (next) {
    const id = this._conditions._id;

    // populates posts objects anytime user is searched
    //this.populate("posts");

    const posts = await Post.find({ user: id });

    if (posts.length > 0) {
        const lastPost = posts[posts.length - 1];

        const lastPostDate = new Date(lastPost.createdAt);

        //add virtual property
        userSchema.virtual('lastPostDate').get(function () {
            return lastPostDate.toDateString();
        });

        //check for activity
        const currDate = new Date();

        const diff = (currDate - lastPostDate) / (1000 * 3600 * 24);//days since last post

        const daysAgo = Math.floor(diff);

        userSchema.virtual('lastActive').get(function () {
            if (daysAgo <= 0) {
                return "Today";
            } else if (daysAgo == 1) {
                return "Yesterday";
            } else {
                return `${daysAgo} days ago`;
            }
        });

        if (diff > 0) {
            userSchema.virtual('inactive').get(function () {
                return true;
            });
        } else {
            userSchema.virtual('inactive').get(function () {
                return false;
            });
        }

        if (posts.length < 10) {
            await User.findByIdAndUpdate(id, {
                userAward: "Bronze"
            }, { new: true });
        } else if (posts.length < 30) {
            await User.findByIdAndUpdate(id, {
                userAward: "Silver"
            }, { new: true });
        } else {
            await User.findByIdAndUpdate(id, {
                userAward: "Gold"
            }, { new: true });
        }
    }
    next();
});

// after record is saved
userSchema.post('save', function (doc, next) {
    console.log("Post user save Hook");
    next();
})

//---Virtual Properties---
//Get fullname
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

//Get initials
userSchema.virtual('initials').get(function () {
    return `${this.firstName[0]}${this.lastName[0]}`;
});

//Get post count
userSchema.virtual('postCounts').get(function () {
    return this.posts.length;
});

//Get follower count
userSchema.virtual('followerCount').get(function () {
    return this.followers.length;
});

//Get following count
userSchema.virtual('followingCount').get(function () {
    return this.following.length;
});

//Get viewer count
userSchema.virtual('viewersCount').get(function () {
    return this.viewedBy.length;
});

//Get blocked count
userSchema.virtual('blockedCount').get(function () {
    return this.blocked.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;