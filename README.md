# Simple Crud with Laravel,React and Redis

This is a simple Crud application build with Laravel, React, Redis and MySQL.It's a task based crud where new task can create and showing that the source either it's came from mysql database or redis.   


# Features
  ```
  1. Create new task with a title.
  2. Show all the task list and also show it's source (database or redis?)
  3. At first Data is stored in a MySQL database and cached in Redis for faster came.
  4. When update a task then it delete the redis cache and the source will be database 
  and that time the updated data store in cache , after refresh we see that the source 
  will be redis  
  5. After delete a task it delete from database and redis cache.
```

# Technologies Used
  ```
1. Laravel: A php framework for create backend part
2. React: A JavaScript library for building user interfaces.
3. Redis: An in-memory data store used for caching.
4. MySQL: A popular relational database management system.

  ```


## Installation

1. At first Download and Install redis on windows.
```bash
https://github.com/microsoftarchive/redis/releases
```

In "C" drive create a new folder name as "redis" and save the redis file here and then click "redis-server.exe" and "redis-cli.exe"

For testing in "redis-cli.exe" type PING if it back PONG then redis server is ok

2. Clone this repository.

```bash
https://github.com/aasif247/laravel-redis-react-crud.git
```
3. Navigate to the project directory:
```bash
e.g. cd laravel-redis-react-crud
```
4. Install dependencies for the backend and frontend:
```bash
cd laravel-redis-crud
```
Install redis package in laravel
```
composer require predis/predis
```

In .env file set "REDIS_CLIENT=predis" above the given code

```
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

Run migration
```
php artisan migrate
```

Run backend server
```
php artisan serve

start xampp server
start redis server
```

Now Change directory to frontend part and install dependencies
```
cd ../react-frontend
npm install
npm run dev
```

When the application start now you can access the application in your browser for frontend
http://localhost:5173/ and Backend  http://localhost:8000

## Usage

```
To create a new task, enter the title in the input field and click the "Add Task" button.
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

## Acknowledgements

```
React
Laravel
Redis
MySQL
```
