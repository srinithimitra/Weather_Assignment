import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchHistory, setSearchHistory] = useState([]);

    const API_KEY = "YOUR_API_KEY"; //  <-------  Replace with your actual API key
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Load search history from localStorage on component mount
    useEffect(() => {
        const storedHistory = localStorage.getItem('weatherSearchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory).slice(0, 5));
        }
    }, []);

    // Save search history to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('weatherSearchHistory', JSON.stringify(searchHistory));
    }, [searchHistory]);

    const fetchWeatherData = async () => {
        setLoading(true);
        setError(null); // Clear previous errors

        try {
            const response = await axios.get(API_URL);
            setWeatherData(response.data);
            setLoading(false);

            // Update search history (most recent at the beginning, limit to 5)
            setSearchHistory(prevHistory => {
                const newHistory = [response.data.name, ...prevHistory.filter(item => item !== response.data.name)].slice(0, 5);
                return newHistory;
            });

        } catch (err) {
            setError("Could not retrieve weather data. Please check the city name and your API key.");
            setLoading(false);
            setWeatherData(null);
            console.error("API Error:", err); // Log the error for debugging
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeatherData();
        } else {
            setError("Please enter a city name.");
        }
    };

    return (
        <Container className="weather-app">
            <h1 className="text-center mb-4">Weather Dashboard</h1>
            <Row className="justify-content-center">
                <Col md={6}>
                    <Form onSubmit={handleSearch}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Search"}
                            </Button>
                        </div>
                    </Form>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                </Col>
            </Row>

            {loading && (
                <div className="text-center mt-4">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {weatherData && (
                <Row className="justify-content-center mt-4">
                    <Col md={6}>
                        <Card className="weather-card">
                            <Card.Body>
                                <Card.Title className="text-center">{weatherData.name}, {weatherData.sys.country}</Card.Title>
                                <div className="weather-icon">
                                    <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                                </div>
                                <p className="text-center temperature">
                                    {weatherData.main.temp} °C
                                </p>
                                <p className="text-center condition">
                                    {weatherData.weather[0].description}
                                </p>
                                <Row>
                                    <Col>Humidity: {weatherData.main.humidity} %</Col>
                                    <Col>Wind Speed: {weatherData.wind.speed} km/h</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            <Row className="justify-content-center mt-4">
                <Col md={6}>
                    <div className="search-history">
                        <h2>Recent Searches</h2>
                        <ul>
                            {searchHistory.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default App;
