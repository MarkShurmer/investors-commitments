
public interface IInvestmentService
{
    IList<Investment> GetInvestments();
}

public class InvestmentService : IInvestmentService
{
    private readonly DataContext _context;

    public InvestmentService()
    {
        _context = new DataContext();
    }
    public IList<Investment> GetInvestments()
    {
        return _context.Investments.ToList();
    }
}

