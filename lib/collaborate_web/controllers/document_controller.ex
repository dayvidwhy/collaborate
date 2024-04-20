defmodule CollaborateWeb.DocumentController do
  use CollaborateWeb, :controller

  def index(conn, _params) do
    render(conn, :index)
  end
end
