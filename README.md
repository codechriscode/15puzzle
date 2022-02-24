# 15puzzle

This is my implementation of 15puzzle using TypeScript, HTML5 and CSS. <br>
Enjoy!

## Disclaimer
To find the first implementation, please check `src/game.ts` available before commit `0c2dc7f7`

## How to run
You can probably just open `index.html` in your browser.
If interactivity fails, try running
```sh
npm install
npx http-server -p 8080
```
And open the `localhost:8080` or similar address shown in the terminal.


## To make changes and run

Any changes in TypeScript files will need to be recompiled.
Changes in `bundle.js` will be overwritten after new TS compilations.

You should change TypeScript files, recompile them and run an http-server to prevent CORS issues using the scripts in your local browser.
```sh
npx tsc && npx http-server -p 8080
```
A single compiled file is also commited to make it easier to run anywhere.
