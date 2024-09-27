This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Skill Test Project for APPEX - CRUD Interface with External API Data

### Project Overview

This task where I created a simple CRUD interface that interacts with external APIs and displays hierarchical data. The application is designed to handle both small datasets (10 rows) and large datasets (100,000+ rows) efficiently. The project demonstrates CRUD operations with filtering and pagination mechanisms.

### Features Implemented

1. **CRUD Operations:**
    - Companies: Create, Read, Update, Delete
    - Founders:
        - Each company has a founder (One-to-One relationship).
        - Founders can be added or updated along with the company they represent.
    - Employees:
        - Each company has multiple employees (One-to-Many relationship).
        - Employees have the following attributes:
            - Name: The employee's first and last name.
            - Position: The job title of the employee.
            - Company: Each employee is associated with a specific company.
            - Technologies: A list of technologies that the employee is skilled in.
    - Technologies:
        - Technologies are not fetched from an external API; instead, they are sourced from a local JSON file.
        - This JSON file contains an array of technology objects, each having properties such as:
            - Id: id of each technology
            - Name: The name of the technology (e.g., React, Node.js).
2. **Data Relationships:**
    - One-to-One: Each company has one founder.
    - One-to-Many: Each company has multiple employees. Each employee has a list of technologies they are skilled in.
3. **Pagination and Filtering:**
    - Company and employee lists can be filtered and paginated for large datasets.
    - Employee and company filtering is based on relevant fields.
    - Pagination supports handling a large number of records efficiently.
    - **Virtualized Rendering**
        - Founders and technologies lists are rendered using `react-virtualized` to handle thousands of records (e.g., a list of 60,000 technologies).
4. **External API:**
    - Data (like Company's, Employees, Founders ) are fetched from an external API and stored in the database for further operations.
5. **Frontend:**
    - Built using React for a smooth and interactive UI experience.
    - Efficiently renders large datasets with `react-virtualized` to ensure performance scalability.
6. **Backend:**
    - The backend is built with MongoDB to store all company, founder, employee, and technology data.
    - Mongoose is used for schema definition and data management.
    - Includes all necessary API endpoints for interacting with the data (CRUD).

#### Tech Stack

-   **Frontend:** React, Next.js
-   **Backend:** MongoDB, Mongoose
-   **Virtualization:** `react-virtualized` for efficiently rendering large lists (e.g., founders and technologies)

### How to Start in Dev mode:

1.  **Clone repository:**

```bash
    git clone https://github.com/your-repository/skill-test
   cd skill-test
```

2.  **Download npm packages:**
    `npm i`
3.  **Set Up Environment Variables: Create a .env file in the root directory and add the following variables:**

```bash
    NEXT_PUBLIC_API_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/your-database-name // or ask me for database connection string
```

4.  **Run the Development Server:**
    `npm run dev`

Open your browser and navigate to http://localhost:3000.

#### Hosting:

host this project on Vercel https://skill-test-sigma.vercel.app/
