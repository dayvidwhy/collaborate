defmodule Collaborate.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      CollaborateWeb.Telemetry,
      Collaborate.Repo,
      {DNSCluster, query: Application.get_env(:collaborate, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Collaborate.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Collaborate.Finch},
      # Start a worker by calling: Collaborate.Worker.start_link(arg)
      # {Collaborate.Worker, arg},
      # Start to serve requests, typically the last entry
      CollaborateWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Collaborate.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    CollaborateWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
