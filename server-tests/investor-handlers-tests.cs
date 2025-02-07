using Moq;
using NUnit.Framework;

[TestFixture]
public class InvestorHandlerTests
{


    [SetUp]
    public void Setup()
    {


    }

    [Test]
    public void EmptyCollectionGivesCorrectResult()
    {
        // Arrange
        var investments = new List<Investment>();
        var mockService = new Mock<IInvestmentService>();
        mockService.Setup(x => x.GetInvestments()).Returns(investments);

        // Act
        var result = InvestorHandlers.GetInvestors(mockService.Object);

        // Assert
        Assert.That(result.Count() == 0);
    }

    [Test]
    public void CollectionGivesCorrectResultForOneInvestor()
    {
        // Arrange
        var investments = new List<Investment>() {
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
            }

        };
        var mockService = new Mock<IInvestmentService>();
        Mock.Get(mockService.Object).Setup(x => x.GetInvestments()).Returns(investments);

        // Act
        var result = InvestorHandlers.GetInvestors(mockService.Object);

        // Assert
        Assert.That(result.Count() == 1);
        Assert.That(result.First().TotalCommitment == 600);
        Assert.That(result.First().Name == "Investor 1");
    }

    [Test]
    public void CollectionGivesCorrectResultForTwoInvestor()
    {
        // Arrange
        var investments = new List<Investment>() {
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
                Country = "Spain",
                Amount = 500,
                AssetClass = "Test",
                Currency = "GBP"
            },  new Investment() {
                Id = 2,
                Name = "Investor 2",
                Type = "Test",
                DateAdded = DateTime.Now,
                LastUpdated = DateTime.Now,
                Country = "UK",
                Amount = 1500,
                AssetClass = "Test",
                Currency = "GBP"
            }

        };
        var mockService = new Mock<IInvestmentService>();
        Mock.Get(mockService.Object).Setup(x => x.GetInvestments()).Returns(investments);

        // Act
        var result = InvestorHandlers.GetInvestors(mockService.Object);

        // Assert
        Assert.That(result.Count() == 2);
        Assert.That(result.First().TotalCommitment == 600);
        Assert.That(result.First().Name == "Investor 1");
        Assert.That(result[1].Name == "Investor 2");
        Assert.That(result[1].TotalCommitment == 1500);
    }
}
