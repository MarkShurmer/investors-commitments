
static class InvestmentMocks
{
    public static IList<Investment> GetInvestmentsSameInvestor()
    {

        return new List<Investment>() {
            new Investment() {
                Id = 1,
                Name = "Investor 1",
                Type = "Test",
                DateAdded = DateTime.Now,
                LastUpdated = DateTime.Now,
                Country = "Test",
                Amount = 100,
                AssetClass = "Test",
                Currency = "GBP"
            },  new Investment() {
                Id = 2,
                Name = "Investor 1",
                Type = "Test",
                DateAdded = DateTime.Now,
                LastUpdated = DateTime.Now,
                Country = "Test",
                Amount = 500,
                AssetClass = "Test",
                Currency = "GBP"
            }};
    }

    public static IList<Investment> GetInvestmentsDifferentInvestors()
    {
        var investments = new List<Investment>(GetInvestmentsSameInvestor());

        investments.Add(new Investment()
        {
            Id = 3,
            Name = "Investor 2",
            Type = "Test",
            DateAdded = DateTime.Now,
            LastUpdated = DateTime.Now,
            Country = "UK",
            Amount = 1500,
            AssetClass = "Test",
            Currency = "GBP"
        });

        return investments;
    }
}

