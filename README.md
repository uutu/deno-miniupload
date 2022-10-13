# deno-miniupload

A simple Deno application that starts on port 7777. 
The app is used to test storing files to a database and then retrieving them from the database. 
Launching the starts the Deno application, a PostgreSQL server, and a database migration process (Flyway) to store files.

## Specifications
+ GET request to the root path ("/") of the application, the user is shown a form with which the user can upload a file to the server and download files from the server
+ As a user uploads a file to the server, the server stores the file to the database, associating a randomly generated password with it. The password is stored into the database in an encrypted format using the **BCrypt algorithm**.
+ POST request to the "/files" path of the application, where the POST request contains the password and the database id of a file, the application retrieves the file with the given id from the database and verifies that the password sent by the user matches the one stored into the database. Upon a succesful verification the file is sent as a response to the user

### Notes
Some ```form-data```-types cause errors. No explicit checks for data types added to the database.
## Running

The application uses Docker Compose. To run the application, run the command ```docker-compose up``` while in the directory that contains the ```docker-compose.yml``` file.
