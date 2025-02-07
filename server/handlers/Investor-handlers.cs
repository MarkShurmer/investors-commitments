using System;
using System.Collections.Generic;
using System.Linq;

public class InvestorHandlers
{

    public static List<Investor> GetInvestors(IInvestmentService service)
    {
        var investors = from inv in service.GetInvestments()
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



        // .GroupBy(x => x.Name)
        // .Select(s => new Investor() {Id = s.First().Id, Name = s.Key, Type= s.First().Type, DateAdded = s.First().DateAdded, Address = s.First().Country, TotalCommitment = s.Sum(y => y.Amount)})
        // .ToListAsync();

        return investors.ToList();
    }


}