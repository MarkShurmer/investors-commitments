using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

[TestFixture]
public class CommitmentHandlerTests
{
    private Mock<ILogger<CommitmentHandlers>> _mockLogger;

    [SetUp]
    public void Setup()
    {
        _mockLogger = new Mock<ILogger<CommitmentHandlers>>();
        // _mockLogger.Setup(x => x.LogInformation(It.IsAny<string>()));
    }

    [Test]
    public void EmptyCollectionGivesCorrectResult()
    {
        // Arrange
        var mockService = new Mock<IInvestmentService>();
        mockService.Setup(x => x.GetInvestments()).Returns(new List<Investment>());

        // Act
        var result = CommitmentHandlers.GetCommitmentsForInvestor(1, mockService.Object, _mockLogger.Object);

        // Assert
        Assert.That(result.Count() == 0);
        mockService.Verify(x => x.GetInvestments(), Times.Once);
    }

    [Test]
    public void CollectionGivesCorrectResultForInvestor1()
    {
        // Arrange
        var mockService = new Mock<IInvestmentService>();
        mockService.Setup(x => x.GetInvestments()).Returns(InvestmentMocks.GetInvestmentsSameInvestor());
        mockService.Setup(x => x.GetInvestorName(It.IsAny<int>()))
           .Returns((int id) => InvestmentMocks.GetInvestmentsSameInvestor().First().Name);

        // Act
        var result = CommitmentHandlers.GetCommitmentsForInvestor(1, mockService.Object, _mockLogger.Object);



        // Assert
        Assert.That(result.Count() == 2);
        Assert.That(result[0].Amount == 100);
        Assert.That(result[1].Amount == 500);
        mockService.Verify(x => x.GetInvestments(), Times.Once);
    }

    [Test]
    public void CollectionGivesCorrectResultForInvestor2()
    {
        // Arrange
        var mockService = new Mock<IInvestmentService>();
        mockService.Setup(x => x.GetInvestments()).Returns(InvestmentMocks.GetInvestmentsDifferentInvestors());
        mockService.Setup(x => x.GetInvestorName(It.IsAny<int>()))
                   .Returns((int id) => "Investor 2");

        // Act
        var result = CommitmentHandlers.GetCommitmentsForInvestor(3, mockService.Object, _mockLogger.Object);

        // Assert
        Assert.That(result.Count() == 1);
        Assert.That(result.First().Amount == 1500);
        mockService.Verify(x => x.GetInvestments(), Times.Once);
    }
}