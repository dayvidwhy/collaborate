defmodule Collaborate.DocumentsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Collaborate.Documents` context.
  """

  @doc """
  Generate a document.
  """
  def document_fixture(attrs \\ %{}) do
    {:ok, document} =
      attrs
      |> Enum.into(%{
        content: "some content",
        title: "some title"
      })
      |> Collaborate.Documents.create_document()

    document
  end
end
