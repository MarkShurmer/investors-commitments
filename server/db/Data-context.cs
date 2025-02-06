using Microsoft.EntityFrameworkCore;

class DataContext : DbContext
{

    public string DbPath { get; }

    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        DbPath = System.IO.Path.Join(path, "investor_data");

    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");

}