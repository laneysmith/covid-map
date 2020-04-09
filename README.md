# Covid-19 Map

An interactive map displaying cumulative Covid-19 cases and deaths for US counties. See [the NY Times covid-19-data project](https://github.com/nytimes/covid-19-data) for more information on the data.

![covid-map-preview](https://user-images.githubusercontent.com/11357045/78850741-c6927e00-79cc-11ea-9702-efcb1b9bb603.gif)

## Quick start

1. Install all project dependencies: `npm install`
1. Run `npm run copy-env` to copy the `client/.env.local.example` contents into a new `client/.env.local` file. Replace `YOUR_TOKEN_HERE` with your Mapbox token.
1. Start the client and server: `npm start`
1. Visit `http://localhost:3000` in your browser.

## Resources
- [NY Times Covid-19 Data](https://github.com/nytimes/covid-19-data)
- [Create React App](https://github.com/facebook/create-react-app)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Hihayk Color Scale Generator](https://hihayk.github.io/scale/)