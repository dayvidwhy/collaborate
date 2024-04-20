defmodule Collaborate.Repo do
  use Ecto.Repo,
    otp_app: :collaborate,
    adapter: Ecto.Adapters.Postgres
end
