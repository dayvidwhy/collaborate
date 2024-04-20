# Use the official Elixir image from the Docker Hub
FROM elixir:latest

# Set the working directory inside the container
WORKDIR /app

# Copy all application files
COPY . .

# Expose the port the app runs on
EXPOSE 4000

