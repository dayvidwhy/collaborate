defmodule CollaborateWeb.DocumentsChannel do
  use CollaborateWeb, :channel

  @impl true
  def join("documents:lobby", payload, socket) do
    if authorized?(payload) do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new_msg", %{"body" => body, "client_id" => client_id}, socket) do
    broadcast(socket, "new_msg", %{body: body, client_id: client_id})
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
