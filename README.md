# temperature-test 
> SafetyCulture Take Home Test

## To run
The nodeJS application expects a file path to a file with JSON array

```sh
$ npm install
$ node app.js sample.json
$ node app.js sample.json > out.txt
```

## To test
```sh
$ npm test
```

## Explanation
Ideas behind the design
1. Core functionality of the requirement are built into temperatureLib which can be turn into a npm module.
2. Input are read into a datastore (its array now, can be redis/mongodb) which allow us to scale easier to process larger data sets (via streaming or multiple files). 
3. Output are logged to console to pipe to file

Why not build a express/microservce instead of a nodejs application? 
1. I feel that there are much more details expected from a production quality API service, such as security, validation, error handling and etc. 
2. Building a console based nodeJS application on the hand will allow us to focus more on the architecture, design and problem at hand.


## License

MIT © [Sir Hoe Teo]()

