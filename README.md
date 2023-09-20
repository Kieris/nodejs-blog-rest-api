
# nodejs-blog-rest-api


## Tech Stack

**Server:** Node, Express, MongoDB, Mongoose, JWT


## API Reference

### Users
#### User registration

```http
  POST /api/v1/users/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `firstName` | `string` | **Required**. First name of user |
| `lastName` | `string` | **Required**. Last name of user |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. User password |

#### User login

```http
  POST /api/v1/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | **Required**. Email of user |
| `password` | `string` | **Required**. User password |

#### Get user profile

```http
  GET /api/v1/users/profile
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`| `HTTP Header` | **Required**. Jwt token |



## to be continued ...
## Badges

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

