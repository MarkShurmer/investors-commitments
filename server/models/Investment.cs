public class Investment
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }

   public required string Country { get; set; }

   public required string DateAdded { get; set; }

   public required string LastUpdated { get; set; }

   public required string AssetClass { get; set; }

   public int Amount { get; set; }

   public required string Currency { get; set; }
}