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
        var mockService = new Mock<IInvestmentService>();
        mockService.Setup(x => x.GetInvestments()).Returns(new List<Investment>());

        // Act
        var result = InvestorHandlers.GetInvestors(mockService.Object);

        // Assert
        Assert.That(result.Count() == 0);
    }

    [Test]
    public void CollectionGivesCorrectResultForOneInvestor()
    {
        // Arrange
        var mockService = new Mock<IInvestmentService>();
        Mock.Get(mockService.Object).Setup(x => x.GetInvestments()).Returns(InvestmentMocks.GetInvestmentsSameInvestor());

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
        var mockService = new Mock<IInvestmentService>();
        Mock.Get(mockService.Object).Setup(x => x.GetInvestments()).Returns(InvestmentMocks.GetInvestmentsDifferentInvestors());

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
