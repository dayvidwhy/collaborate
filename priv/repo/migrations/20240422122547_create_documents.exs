defmodule Collaborate.Repo.Migrations.CreateDocuments do
  use Ecto.Migration

  def change do
    create table(:documents) do
      add :title, :string
      add :content, :text

      timestamps(type: :utc_datetime)
    end
  end
end
