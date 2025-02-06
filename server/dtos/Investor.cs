public class Investor
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; }

    public required string DateAdded { get; set; }

    public required string Address { get; set; }

    public decimal TotalCommitment { get; set; }

    public static Investor FromInvestment(Investment inv, int amt) {
        return new Investor {
            Id = inv.Id,
            Name = inv.Name,
            Type = inv.Type,
            DateAdded = inv.DateAdded,
            Address = inv.Country,
            TotalCommitment = amt
        };
    }
}