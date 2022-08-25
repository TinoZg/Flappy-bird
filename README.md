# Flappy bird clone

## Project Overview

Flappy bird clone made for learning purposes. The game is hosted on [glitch](https://glitch.com/). Click [here]() to play. Designed for mobile phones.

---

## Game Commands

Tap the screen to jump.

---

## Technical details

### Overview

- HTML5 canvas with [P5.js](https://p5js.org/) library for developing the game
- [Node.js](https://nodejs.org/en/) with [Express.js](https://expressjs.com/) for frontend/backend communication
- [NeDB](https://dbdb.io/db/nedb) for In-Memory database (NO-SQL)
- [Nodemon](https://nodemon.io/) to speed up developing process
- Local storage to save username
- [Bootstrap 5](https://getbootstrap.com/) for styling

### Files

- public/landing-page -> Initial WEB page to pick username
- public/game -> Code for the game
- public/leader-board -> Table with top 5 scores

### Database design

Only saving Top 5 scores in the database since free glitch hosting has limited file size.
Upon finishing the game, the server checks and inserts data if the current score would be in top 5

---

## Further development

Feel free to file issues and make a pull request.

If you want to continue developing this project and contribute to the code base you need to have node.js installed locally. This project was done using version 18.1.0

To make code changes:

1. Fork the project and clone it locally
2. Run `npm install`
3. Make changes
4. Make a pull request
