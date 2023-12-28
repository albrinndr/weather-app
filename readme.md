# Weather-App

## Description
This Weather App allows users to search for weather information based on locations. Users can enter a location and view real-time weather details including temperature, humidity, and wind speed. The app supports multiple locations and enables users to save their preferred locations for quick access to weather information.

## Running the Project

### Prerequisites
- Node.js

### Server Setup
1. Navigate to the `server` folder.
2. Create a `.env` file.
3. Add the following variables to the `.env` file:
    - `SESSION_SECRET` with your desired session secret value.
    - `MONGO_URI` with your MongoDB URL.

### Client Setup
1. Navigate to the `client` folder.
2. Create a `.env` file.
3. Add the following variable to the `.env` file:
    - `VITE_WEATHER_API_KEY` with your OpenWeatherMap API key obtained from [OpenWeatherMap](https://openweathermap.org/).

### Installation
1. Clone the repository.
2. Open a terminal window and navigate to the project directory.
3. Run `npm install` to install the necessary dependencies.

### Running the Development Server
To start the development server, use the following command:

npm run dev
