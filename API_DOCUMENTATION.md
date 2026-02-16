# API Documentation - Louange Backend

Base URL: `http://localhost:5000`

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Admin Endpoints

### Login
**POST** `/api/admin/login`

Login as admin and receive JWT token.

**Request Body:**
```json
{
  "email": "lounge@gmail.com",
  "password": "12345"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": 1,
    "email": "lounge@gmail.com",
    "username": "admin"
  }
}
```

### Get Profile
**GET** `/api/admin/profile` 🔒

Get current admin profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "username": "admin",
  "email": "lounge@gmail.com"
}
```

---

## User Endpoints

### Get All Users
**GET** `/api/users` 🔒

Get list of all registered users.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get User by ID
**GET** `/api/users/:id` 🔒

Get specific user details.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Create User
**POST** `/api/users`

Register a new user (public endpoint for registration).

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890"
}
```

**Response:**
```json
{
  "message": "User created",
  "id": 1
}
```

### Update User
**PUT** `/api/users/:id` 🔒

Update user information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.new@example.com",
  "phone": "0987654321"
}
```

**Response:**
```json
{
  "message": "User updated"
}
```

### Delete User
**DELETE** `/api/users/:id` 🔒

Delete a user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "User deleted"
}
```

---

## Service Endpoints

### Get All Services
**GET** `/api/services`

Get list of all services (public).

**Response:**
```json
[
  {
    "id": 1,
    "title": "Web Development",
    "description": "Custom web solutions",
    "icon": "fa-code",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Service by ID
**GET** `/api/services/:id`

Get specific service details.

**Response:**
```json
{
  "id": 1,
  "title": "Web Development",
  "description": "Custom web solutions",
  "icon": "fa-code",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Create Service
**POST** `/api/services` 🔒

Create a new service.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Web Development",
  "description": "Custom web solutions",
  "icon": "fa-code"
}
```

**Response:**
```json
{
  "message": "Service created",
  "id": 1
}
```

### Update Service
**PUT** `/api/services/:id` 🔒

Update service information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Web Development Updated",
  "description": "Updated description",
  "icon": "fa-laptop"
}
```

**Response:**
```json
{
  "message": "Service updated"
}
```

### Delete Service
**DELETE** `/api/services/:id` 🔒

Delete a service.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Service deleted"
}
```

---

## Team Endpoints

### Get All Team Members
**GET** `/api/team`

Get list of all team members (public).

**Response:**
```json
[
  {
    "id": 1,
    "name": "Jane Smith",
    "position": "CEO",
    "bio": "Experienced leader...",
    "image_url": "https://example.com/image.jpg",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Team Member by ID
**GET** `/api/team/:id`

Get specific team member details.

**Response:**
```json
{
  "id": 1,
  "name": "Jane Smith",
  "position": "CEO",
  "bio": "Experienced leader...",
  "image_url": "https://example.com/image.jpg",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Create Team Member
**POST** `/api/team` 🔒

Add a new team member.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Jane Smith",
  "position": "CEO",
  "bio": "Experienced leader...",
  "image_url": "https://example.com/image.jpg"
}
```

**Response:**
```json
{
  "message": "Team member created",
  "id": 1
}
```

### Update Team Member
**PUT** `/api/team/:id` 🔒

Update team member information.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Jane Smith Updated",
  "position": "CEO & Founder",
  "bio": "Updated bio...",
  "image_url": "https://example.com/new-image.jpg"
}
```

**Response:**
```json
{
  "message": "Team member updated"
}
```

### Delete Team Member
**DELETE** `/api/team/:id` 🔒

Delete a team member.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Team member deleted"
}
```

---

## Contact Endpoints

### Get All Contacts
**GET** `/api/contacts` 🔒

Get all contact messages.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Contact Name",
    "email": "contact@example.com",
    "subject": "Inquiry",
    "message": "Message content...",
    "status": "new",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### Get Contact by ID
**GET** `/api/contacts/:id` 🔒

Get specific contact message.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "id": 1,
  "name": "Contact Name",
  "email": "contact@example.com",
  "subject": "Inquiry",
  "message": "Message content...",
  "status": "new",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

### Create Contact
**POST** `/api/contacts`

Submit a contact form (public).

**Request Body:**
```json
{
  "name": "Contact Name",
  "email": "contact@example.com",
  "subject": "Inquiry",
  "message": "Message content..."
}
```

**Response:**
```json
{
  "message": "Contact message sent",
  "id": 1
}
```

### Update Contact Status
**PUT** `/api/contacts/:id` 🔒

Update contact message status.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "read"
}
```

**Allowed Status Values:** `new`, `read`, `replied`

**Response:**
```json
{
  "message": "Contact status updated"
}
```

### Delete Contact
**DELETE** `/api/contacts/:id` 🔒

Delete a contact message.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Contact deleted"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```
or
```json
{
  "message": "Invalid token"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Notes

- 🔒 indicates protected endpoints requiring authentication
- All timestamps are in ISO 8601 format
- JWT tokens expire after 24 hours
- Passwords are automatically hashed before storage
