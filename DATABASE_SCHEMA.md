# Database Schema - Louange Project

## Tables Overview

### 1. admins
Stores admin user credentials for dashboard access.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique admin identifier |
| username   | VARCHAR(255) | UNIQUE, NOT NULL     | Admin username                 |
| email      | VARCHAR(255) | UNIQUE, NOT NULL     | Admin email (login)            |
| password   | VARCHAR(255) | NOT NULL             | Hashed password (bcrypt)       |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Account creation date    |

**Default Admin:**
- Email: lounge@gmail.com
- Password: 12345 (hashed in database)

---

### 2. users
Stores registered users from the frontend.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier  |
| name       | VARCHAR(255) | NOT NULL             | User full name                 |
| email      | VARCHAR(255) | UNIQUE, NOT NULL     | User email                     |
| password   | VARCHAR(255) | NOT NULL             | Hashed password (bcrypt)       |
| phone      | VARCHAR(50)  | NULL                 | User phone number              |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Registration date       |

---

### 3. services
Stores services offered by the organization.

| Column      | Type         | Constraints           | Description                    |
|-------------|--------------|----------------------|--------------------------------|
| id          | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique service identifier |
| title       | VARCHAR(255) | NOT NULL             | Service title                  |
| description | TEXT         | NULL                 | Service description            |
| icon        | VARCHAR(100) | NULL                 | Icon name/class                |
| created_at  | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Service creation date   |

---

### 4. team_members
Stores team member information.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique member identifier |
| name       | VARCHAR(255) | NOT NULL             | Member full name               |
| position   | VARCHAR(255) | NULL                 | Job position/role              |
| bio        | TEXT         | NULL                 | Member biography               |
| image_url  | VARCHAR(500) | NULL                 | Profile image URL              |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Record creation date    |

---

### 5. contacts
Stores contact form submissions.

| Column     | Type         | Constraints           | Description                    |
|------------|--------------|----------------------|--------------------------------|
| id         | INT          | PRIMARY KEY, AUTO_INCREMENT | Unique contact identifier |
| name       | VARCHAR(255) | NOT NULL             | Sender name                    |
| email      | VARCHAR(255) | NOT NULL             | Sender email                   |
| subject    | VARCHAR(255) | NULL                 | Message subject                |
| message    | TEXT         | NOT NULL             | Message content                |
| status     | ENUM         | DEFAULT 'new'        | Status: new, read, replied     |
| created_at | TIMESTAMP    | DEFAULT CURRENT_TIMESTAMP | Submission date         |

---

## Relationships

Currently, the database uses a simple flat structure with no foreign key relationships. Each table is independent.

## Indexes

- Primary keys are automatically indexed
- Unique constraints on email fields create indexes
- Consider adding indexes on frequently queried fields:
  - `users.email`
  - `admins.email`
  - `contacts.status`
  - `contacts.created_at`

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt (10 rounds)
2. **JWT Authentication**: Admin routes protected with JWT tokens
3. **Unique Constraints**: Prevent duplicate emails
4. **SQL Injection Prevention**: Using parameterized queries with mysql2

## Database Initialization

Run the initialization script to create the database and tables:
```bash
cd backend
node config/initDb.js
```

This will:
1. Create the database if it doesn't exist
2. Create all tables
3. Insert the default admin account
