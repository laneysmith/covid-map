# Covid-19 Map

This is the front end source code for [https://covid.laney.tech](https://covid.laney.tech/), an interactive map displaying cumulative Covid-19 cases and deaths for US counties. The backend API and database source code can be found at [https://github.com/laneysmith/covid-map-api](https://github.com/laneysmith/covid-map-api).

Data from [the NY Times covid-19-data project](https://github.com/nytimes/covid-19-data), based on reports from state and local health agencies.

![covid-map-preview](https://user-images.githubusercontent.com/11357045/79015158-1a15e080-7b21-11ea-9370-11cae45e2f36.gif)

## Quick start

1. Install project dependencies: `yarn install`
1. Run `yarn copy-env` to copy the `.env.local.example` contents into a new `.env.local` file. Replace `YOUR_TOKEN_HERE` with your Mapbox token.
1. Start the client and server: `yarn start`
1. Visit `http://localhost:3000` in your browser.

## Resources
- [NY Times Covid-19 Data](https://github.com/nytimes/covid-19-data)
- [Create React App](https://github.com/facebook/create-react-app)
- [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)
- [Hihayk Color Scale Generator](https://hihayk.github.io/scale/)
- [Pixel Perfect svg icons](https://www.flaticon.com/authors/pixel-perfect)