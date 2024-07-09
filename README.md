## Installation

To install and run this project, follow these steps:

### Prerequisites

Make sure you have the following software installed on your machine:

- **Node.js** (version 14.x or higher): You can download it from the [official Node.js website](https://nodejs.org/).
- **npm** (Node Package Manager): This comes bundled with Node.js.
- **PostgreSQL**: You can download it from the [official postgreSQL website](https://www.postgresql.org/).
- **git**: You can download it from the [official git website](https://git-scm.com/).
- **WSL** (Windows Subsystem for Linux): You can download and install it from the [official WSL installation guide](https://docs.microsoft.com/en-us/windows/wsl/install).
- **Bash**: If you're on a Unix-like system, Bash is usually pre-installed. For Windows users, you can use WSL to access a Bash shell.

### Steps

1. **Clone the repository**: Clone the project repository from GitHub to your local machine using the following command:

  ```bash
  git clone https://github.com/Kirovo/RSB.git
  ```

2. **Navigate to the project directory**: Make sure to have to use two terminals to navigate through respectively the `back-end` and `front-end` folders.

  *From the root in the terminal 1:*
  ```bash
  cd back-end
  ```

  *From the root in the terminal 2:*
  ```bash
  cd front-end
  ```

3. **Install dependencies**: Install all the required dependencies listed in the `package.json` file. You can do this by running:

  *For each terminal:*
  ```bash
  npm install
  ```

### Configuration

Before running the project, you might need to configure some settings. Follow these steps:

1. **Environment Variables**: Create a `.env` file in the `back-end` directory to configure environment variables. An example `.env` file might look like this: *(for now the `.env` is provided when cloning the repo but will be removed in the future)*

    ```env
    POSTGRES_HOST=localhost
    POSTGRES_DB=dev
    POST_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    ENV_DB=dev
    SALT_ROUNDS=5
    BCRYPT_PASSWORD=complexpassword
    TOKEN_SECRET=123456789
    ```

2. **Database Setup**: You will need to create a database with the necessary data to correctly run the project. You can do this by running the following scripts in the `back-end` folder:


    ```bash
    npm run db-reset
    ```
    *The password for the database is `postgres`*

### Running the Project

Once everything is set up, you can run the project using the following command:

  *In each terminal:*
  ```bash
  npm start
  ```
  *Make sure the `back-end` is running before running the `front-end`*

3. **Login Credentials**: Once the front-end and back-end are running, you can log in with the following credentials:

- email: `admin@admin.com`
- password: `admin`
