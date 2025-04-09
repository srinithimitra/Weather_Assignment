# Weather_Assignment

This web application provides current weather information for any city using the OpenWeatherMap API.

## Tech Stack Used

* **React.js:** A JavaScript library for building user interfaces. We used Create React App to bootstrap the project.
* **React Hooks:** For managing state and side effects within functional components.
* **React Bootstrap:** A library of pre-built React components that make it easy to create responsive and visually appealing layouts using the Bootstrap framework.
* **Bootstrap:** A popular CSS framework for designing responsive web pages.
* **Axios:** A promise-based HTTP client for making API requests.
* **HTML**
* **CSS**
* **JavaScript**

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Obtain an OpenWeatherMap API key:**

    * Register for a free API key at [https://openweathermap.org/api](https://openweathermap.org/api)[cite: 3, 4].

4.  **Set up the API key:**

    * Replace `"YOUR_API_KEY"` with your actual API key in the `src/App.js` file:

        ```javascript
        const API_KEY = "YOUR_API_KEY"; // Replace with your API key
        ```

5.  **Start the application:**

    ```bash
    npm start
    ```

    * The app will be accessible at `http://localhost:3000` in your browser.

## API Integration Details

* **API Used:** OpenWeatherMap Current Weather API
* **API URL:** `https://api.openweathermap.org/data/2.5/weather?q={city}&appid={YOUR_API_KEY}&units=metric` [cite: 3, 4]
    * `{city}`:  The name of the city for which to retrieve weather data.
    * `{YOUR_API_KEY}`: Your unique API key from OpenWeatherMap.
    * `units=metric`:  Returns temperature in Celsius.
* **API Key:**
    * You must register for a free API key at [https://openweathermap.org/api](https://openweathermap.org/api) to use this application.
    * The API key is used to authenticate your requests to the OpenWeatherMap API.
* **Rate Limits:**
    * OpenWeatherMap has rate limits for their free API tier. Be mindful of excessive requests, as you may be temporarily blocked.
    * Refer to the OpenWeatherMap API documentation for the most up-to-date information on rate limits: [https://openweathermap.org/price](https://openweathermap.org/price)
    * As of the time of writing, the free tier allows a certain number of calls per minute/hour.
* **Data Handling:**
    * The application fetches real-time weather data based on the city entered by the user.
    * It displays the following information:
        * City Name
        * Current Temperature (°C) [cite: 3, 4]
        * Weather Condition (e.g., Sunny, Rainy) [cite: 3, 4]
        * Humidity (%) [cite: 3, 4]
        * Wind Speed (km/h) [cite: 3, 4]
        * Weather Icon [cite: 3, 4]
    * Error handling is implemented to gracefully display messages for invalid city names or API errors.
    * A loading state is shown while fetching data.

## Additional Notes

* This application uses `localStorage` to store the last 5 searched cities.
* The application is designed to be responsive and work well on both desktop and mobile devices.
