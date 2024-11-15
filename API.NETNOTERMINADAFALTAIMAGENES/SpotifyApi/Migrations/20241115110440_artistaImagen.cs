using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyApi.Migrations
{
    /// <inheritdoc />
    public partial class artistaImagen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artistas_Generos_GeneroId",
                table: "Artistas");

            migrationBuilder.AlterColumn<int>(
                name: "GeneroId",
                table: "Artistas",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Artistas_Generos_GeneroId",
                table: "Artistas",
                column: "GeneroId",
                principalTable: "Generos",
                principalColumn: "GeneroId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artistas_Generos_GeneroId",
                table: "Artistas");

            migrationBuilder.AlterColumn<int>(
                name: "GeneroId",
                table: "Artistas",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Artistas_Generos_GeneroId",
                table: "Artistas",
                column: "GeneroId",
                principalTable: "Generos",
                principalColumn: "GeneroId");
        }
    }
}
