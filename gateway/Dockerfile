# Use official Nginx as base image
FROM nginx:latest

# Copy custom Nginx config into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
