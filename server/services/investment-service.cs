
using System.Runtime.CompilerServices;

public interface IInvestmentService
{
    IList<Investment> GetInvestments();

    string GetInvestorName(int id);
}

public class InvestmentService : IInvestmentService
{
    private readonly DataContext _context;
    private readonly IList<Investment> _investmentCache;
    private readonly IDictionary<int, string> _investorMap;

    public InvestmentService()
    {
        _context = new DataContext();
        // create readonly cache
        _investmentCache = _context.Investments.ToList();

        // create our map of investor names to ids
        _investorMap = (from i in _investmentCache
                        group i by i.Name into g
                        select new { g.First().Id, g.First().Name }).ToList().ToDictionary(x => x.Id, x => x.Name);

    }
    public IList<Investment> GetInvestments()
    {
        return _investmentCache;
    }

    public string GetInvestorName(int id)
    {
        return _investorMap[id];
    }
}

