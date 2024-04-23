defmodule Collaborate.Documents.Document do
  use Ecto.Schema
  import Ecto.Changeset

  schema "documents" do
    field :title, :string
    field :content, :string

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(document, attrs) do
    document
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
