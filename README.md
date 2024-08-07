# News Aggregator

Welcome to the News Aggregator frontend project! This project is a React-based application that aggregates news articles from various sources, allowing users to search and filter articles based on their preferences.

## Deployed Application

You can view the deployed application on Netlify using the following link:
[News Aggregator on Netlify](https://news-aggregator-articles.netlify.app)

## Prerequisites

Ensure you have the following installed:

- Docker: [Install Docker](https://docs.docker.com/get-docker/)
- Docker Compose: [Install Docker Compose](https://docs.docker.com/compose/install/)

## Running the Application

### 1. Clone the Repository

First, clone the repository to your local machine:
bash
git clone https://github.com/Swati-Shelke-au8/NewsAggregator.git
cd NewsAggregator

### 2. Create the Docker Image

Navigate to the root directory of the project where the `Dockerfile` is located and build the Docker image:
bash
docker build -t news-aggregator .

### 3. Run the Docker Container

Run the Docker container using the image you just built:
bash
docker run -p 5000:5000 news-aggregator

This command maps port 5000 on your host machine to port 5000 in the Docker container. You can now access the application by navigating to `http://localhost:5000` in your web browser.

### 4. Using Docker Compose

Docker Compose can be used to simplify the running of the application. Ensure you have the `docker-compose.yml` file in the root directory with the following content:
yaml
version: '3'
services:
web:
build: .
ports: - "5000:5000"

Run the following command to start the application using Docker Compose:
bash
docker-compose up

This will build the image (if not already built) and start the container. The application will be accessible at `http://localhost:5000`.

### 5. Verify and Access the Application

Once the container is running, open your web browser and go to:
plaintext
http://localhost:5000

You should see the News Aggregator application running.

## Conclusion

By following these steps, you should be able to build and run the News Aggregator application using Docker.

If you have any further questions or need additional assistance, feel free to reach out to ghogareswati14@gmail.com
