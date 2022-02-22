## Refactor Code Test
#### This project consists of a basic logging utility. It allows for strings and object messages, of different severity, to be logged to different output systems.
#### It also looks for sensitive keywords and prevents those things from being logged (api keys, passwords, logins, etc)

### Setup
Install Node [16](https://nodejs.dev/download) (or 14, [nvm for the win](https://github.com/nvm-sh/nvm))

`npm ci`

`npm run start`

(./src/main executes)

### Objective
Treat this project like it needs in depth code review or refactor. Go through and make any changes and improvements you see fit. Code smells, overall improvements, tests, etc.
There is also 1 function you need to implement. In './src/scrubber', the function 'scrubString'. Comments are provided for expected functionality in the function.

You can use plain javascript. Or Typescript is set up for you as well if you wish to use it.
- Remove '// @ts-nocheck' from each file if you wish to use typescript

Tests execution via jest is all setup to go.

Also, see ./src/main for example usage of logger (no refactor necessary to ./src/main).

Open an MR against this repository with your changes (or send them over via email).

Don't spend too much time on this! We only expect an hour of effort.
