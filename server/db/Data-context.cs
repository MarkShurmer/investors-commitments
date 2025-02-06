using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    public DbSet<Investment> Investments { get; set; }
    public string DbPath { get; }

    public DataContext()
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join("data", "investor_data");

    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

    

}