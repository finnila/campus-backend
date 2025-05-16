# Campus Manager Backend

This is the backend server for the Campus Manager application, built with Express.js and Sequelize.

## Group Members

Daryl Hou

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:

```
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=campus_manager_db
DB_HOST=localhost
PORT=3000
```

3. Create the database:

```bash
createdb campus_manager_db
```

4. Run migrations:

```bash
npm run seed
```

5. Start the server:

```bash
npm run dev
```

The server will start on http://localhost:3000

## API Endpoints

### Campuses

- GET /api/campuses - Get all campuses
- GET /api/campuses/:id - Get single campus
- POST /api/campuses - Create new campus
- PUT /api/campuses/:id - Update campus
- DELETE /api/campuses/:id - Delete campus

### Students

- GET /api/students - Get all students
- GET /api/students/:id - Get single student
- POST /api/students - Create new student
- PUT /api/students/:id - Update student
- DELETE /api/students/:id - Delete student
