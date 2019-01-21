# temperature-test 
> SafetyCulture Take Home Test

## How to run? 
The nodeJS application expects a path to a file with JSON array. Outputs the average, median and mode to screen in the required JSON format. Please pipe to a file if you wish to store the output.

```sh
$ npm install
$ node app.js sample.json
$ node app.js sample.json > out.txt
```

## How to run unit test?
```sh
$ npm test
```

## Ideas/Assumption behind the decision
1. Core functionality of the requirement are wrapped into a module named temperatureLib which can be turn into a npm package. 
2. Inputs are first read into a datastore. Currently its a simple array but it should be redis/mongodb in the future which allow us to process larger data sets
3. As we are building an console app, output are logged to console but the module temperatureLib is design to be easily used in express app or microservices.

## Why build a nodeJS console application? why not build a express/microservce instead? 
1. I feel that there are much more design details expected from a production quality API service, such as security, validation, error handling and etc. 
2. Building a nodeJS console application allow us to focus more on the architecture, design and problem at hand.


## License

MIT © [Sir Hoe Teo]()

