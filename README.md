# Blog REST API
- [App info](#app-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Endpoints](#endpoints)
- [License](#license)

## App info
A simple REST API for creating, removing , updating and deteleting (CRUD) blog posts in a MongoDB database.
#### Author  
Elia Tryfonas

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose
## Setup
To run this project create a **.env** file and add 
```
DB_CONNECTION ='your-mongodb-connection-url' 
```
then
```
npm install

npm run start
```

## Endpoints
You can send requests to the following endpoints to interact with the database.  
For **POST** you need to provide the following in the request body and for **PATCH** only what you want to update.
```javascript
{
    "title":"Your Title",
    "body":"Your content"
} 
```
**GET**  

`/blogs`   
Retrieve all posts stored in the database. 

`/blogs/id`   
Retrieve a specific post.   

**POST**  

`/blogs/id`    
Submit a new post.

**PATCH**  

`/blogs/id`  
Update data of a specific post.  

**DELETE**  

`/blogs/id`  
Delete a post.

## License
This project is licensed under the MIT License.
