defmodule CollaborateWeb.DocumentsChannelTest do
  use CollaborateWeb.ChannelCase

  setup do
    {:ok, _, socket} =
      CollaborateWeb.UserSocket
      |> socket("user_id", %{some: :assign})
      |> subscribe_and_join(CollaborateWeb.DocumentsChannel, "documents:lobby")

    %{socket: socket}
  end

  test "ping replies with status ok", %{socket: socket} do
    ref = push(socket, "ping", %{"collaborate" => "there"})
    assert_reply ref, :ok, %{"collaborate" => "there"}
  end

  test "shout broadcasts to documents:lobby", %{socket: socket} do
    push(socket, "shout", %{"collaborate" => "all"})
    assert_broadcast "shout", %{"collaborate" => "all"}
  end

  test "broadcasts are pushed to the client", %{socket: socket} do
    broadcast_from!(socket, "broadcast", %{"some" => "data"})
    assert_push "broadcast", %{"some" => "data"}
  end
end
