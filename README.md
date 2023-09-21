
# nodejs-blog-rest-api


## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JWT Auth


## API Reference

### Users
#### User registration

```http
POST /api/v1/users/register
```

| Parameter | Type     | Description                | Required   |
| :-------- | :------- | :------------------------- |:-----------|
| `firstName` | `string` | First name of user | Yes |
| `lastName` | `string` | Last name of user | Yes |
| `email` | `string` | Email of user | Yes |
| `password` | `string` | User password | Yes    |

#### User login

```http
POST /api/v1/users/login
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `email` | `string` | Email of user | Yes |
| `password` | `string` | User password | Yes |

#### Get user's own profile

```http
GET /api/v1/users/profile
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |

#### Get other user's profile

```http
GET /api/v1/profile-viewers/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of other user   | Yes |


#### Get all users

```http
GET /api/v1/users
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | Admin JWT token | Yes        |

#### Delete user's own account

```http
DELETE /api/v1/users
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |

#### Update user's own account

```http
PUT /api/v1/users
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `firstName` | `string` | First name of user | Yes |
| `lastName` | `string` | Last name of user | Yes |
| `email` | `string` | Email of user | Yes |

#### Update user's own password

```http
PUT /api/v1/users/pass
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `oldPassword` | `string` | Current password of user | Yes |
| `password` | `string` | New password of user | Yes |

#### Upload profile photo

```http
POST /api/v1/users/uploadPhoto
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `Profile` | `Single file` | Image file for profile picture | Yes |

#### Follow a user
```http
GET /api/v1/users/follow/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to follow   | Yes |


#### Unfollow a user
```http
GET /api/v1/users/unfollow/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to unfollow   | Yes |

#### Block a user
```http
GET /api/v1/users/block/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to block   | Yes |

#### Unblock a user
```http
GET /api/v1/users/unblock/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to unblock   | Yes |

#### Admin block a user
```http
GET /api/v1/users/adminblock/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | Admin JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to block   | Yes |

#### Admin unblock a user
```http
GET /api/v1/users/adminunblock/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | Admin JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of user to unblock   | Yes |

### Posts

#### Create post

```http
POST /api/v1/posts
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token of author | Yes        |
| `title` | `string` | Title of post | Yes |
| `description` | `string` | Description of post | Yes |
| `category` | `string` | Id of category of post | Yes |
| `image` | `Single file` | Image file for profile picture | No |

#### Get post

```http
GET /api/v1/posts/post/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of post  | Yes |

#### Get all posts except from those user blocked or those that blocked user

```http
GET /api/v1/posts
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |

#### Get posts of those user follows except for those that are blocked

```http
GET /api/v1/posts/followed
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |

#### Delete post user owns

```http
DELETE /api/v1/posts/:id
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of post  | Yes |


#### Update post user owns

```http
PUT /api/v1/posts/:id
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token of author | Yes        |
| `title` | `string` | Title of post | Yes |
| `description` | `string` | Description of post | Yes |
| `category` | `string` | Id of category of post | Yes |
| `image` | `Single file` | Image file for profile picture | No |
| `id`    | `Route Parameter`    | Id of post  | Yes |

#### Toggle like on post (Like if not like or remove like if already liked, remove disliked if previously disliked )

```http
GET /api/v1/toggle-like/:id
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of post to like  | Yes |

#### Toggle dislike on post (Dislike if not disliked or remove dislike if already disliked, remove liked if previously liked )

```http
GET /api/v1/toggle-dislike/:id
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of post to dislike  | Yes |


### Categories

#### Create category

```http
POST /api/v1/categories
```
| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `title` | `string` | Title of category | Yes |



#### Get all categories

```http
GET /api/v1/categories
```

#### Get a specific category

```http
GET /api/v1/categories/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `id`    | `Route Parameter`    | Id of category  | Yes |

#### Update category user owns

```http
PUT /api/v1/categories/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of category to update  | Yes |
| `title` | `string` | Title of post | Yes |

#### Delete category user owns

```http
DELETE /api/v1/categories/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of category to delete  | Yes |
| `title` | `string` | Title of post | Yes |

#### Create comment

```http
POST /api/v1/comments/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token of user commenting | Yes        |
| `id`    | `Route Parameter`    | Id of post to add comment  | Yes |
| `description` | `string` | Comment description | Yes |

#### Get comment

```http
GET /api/v1/comments/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of comment  | Yes |

#### Update comment

```http
PUT /api/v1/comments/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of comment to update  | Yes |
| `description` | `string` | Comment description | Yes |

#### Delete comment

```http
DELETE /api/v1/comments/:id
```

| Parameter | Type     | Description                       | Required   |
| :-------- | :------- | :-------------------------------- |:-----------|
| `Authorization`| `HTTP Header` | JWT token | Yes        |
| `id`    | `Route Parameter`    | Id of comment to delete  | Yes |

## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)