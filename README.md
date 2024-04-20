# Collaborate

Real time collaboration tool that allows multiple users contribute to a document.

## Getting Started

The development environment is provided by containers.

```bash
git clone git@github.com:dayvidwhy/collaborate.git
cd collaborate
docker-compose up --build
docker exec -it collaborate-app bash
```

Copy the example env file and update the variables. You can generate secrets using the `mix phx.gen.secret [length]` command.

```bash
cp .env.example .env
```

You can generate random secrets using the built in `mix phx.gen.secret [secret-length]` command.

```bash
# inside container
source .env
mix local.hex
mix ecto.create
mix phx.server
```

Server will be available at `localhost:4000` on your machine.

## Useful commands
Phoenix provides cli commands to scaffold new features.

```bash
# Migrate the Database
mix ecto.create

# Create a new message channel
mix phx.gen.socket [socket-name]

# Create a new secret
mix phx.gen.secret [secret-length]
```
