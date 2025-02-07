public class Investor
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }

    public required DateTime DateAdded { get; set; }

    public required string Address { get; set; }

    public decimal TotalCommitment { get; set; }
}