FROM postgres:16

# Set environment variables
ENV POSTGRES_USER=chessuser
ENV POSTGRES_PASSWORD=chesspassword
ENV POSTGRES_DB=chessapp

# Copy schema and custom entrypoint
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql
COPY entrypoint.sh /docker-entrypoint.sh

# Make entrypoint executable
RUN chmod +x /docker-entrypoint.sh

# Use custom entrypoint
ENTRYPOINT ["/bin/bash", "/docker-entrypoint.sh"]
