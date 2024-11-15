using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotifyApi.Migrations
{
    /// <inheritdoc />
    public partial class albumartista : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums");

            migrationBuilder.AlterColumn<int>(
                name: "ArtistaId",
                table: "Albums",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums",
                column: "ArtistaId",
                principalTable: "Artistas",
                principalColumn: "ArtistaId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums");

            migrationBuilder.AlterColumn<int>(
                name: "ArtistaId",
                table: "Albums",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Albums_Artistas_ArtistaId",
                table: "Albums",
                column: "ArtistaId",
                principalTable: "Artistas",
                principalColumn: "ArtistaId");
        }
    }
}
