public class Investment
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }

    public required string Country { get; set; }

    public required DateTime DateAdded { get; set; }

    public required DateTime LastUpdated { get; set; }

    public required string AssetClass { get; set; }

    public decimal Amount { get; set; }

    public required string Currency { get; set; }
}