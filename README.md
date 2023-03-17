# Members Only (The Odin Project)
### Closed app, members of which allowed to read and write messages.


### Installing:
* Clone the repository to your local machine;
```
git clone https://github.com/damirios/members-only.git
```
* Install all packages needed
```
npm install
```
or
```
yarn install
```
* Define environment variables in .env file in the root of the app:
```
PORT,
DB_URL - mongoDB database URL (with username and password),
DB_PASSWORD - mongoDB database password,
SECRED_WORD_JEDI - secret word to change membership status to "jedi",
SECRED_WORD_MASTER - secret word to change membership status to "master",
SESSION_SECRET - secret word for encrypting cookies
```
* Run the app:
```
npm start
```
or (dev mode):
```
npm run devstart
```
App runs on (PORT is environment variable):
```
http://localhost:${PORT}
```

### Built using
* JavaScript
* Express
* MongoDB
* Mongoose
* Pug
