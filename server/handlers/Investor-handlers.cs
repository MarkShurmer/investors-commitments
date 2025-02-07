using System;
using System.Collections.Generic;
using System.Linq;

public class InvestorHandlers
{

    public static List<Investor> GetInvestors(IInvestmentService service)
    {
        var investors = from inv in service.GetInvestments()
                        orderby inv.Name
                        group inv by inv.Name into g
                        select new Investor()
                        {
                            Id = g.First().Id,
                            Name = g.Key,
                            Type = g.First().Type,
                            DateAdded = g.First().DateAdded,
                            Address = g.First().Country,
                            TotalCommitment = g.Sum(y => y.Amount)
                        };

        return investors.ToList();
    }


}