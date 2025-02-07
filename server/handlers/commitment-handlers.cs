using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;


public class CommitmentHandlers
{

    public static List<Commitment> GetCommitmentsForInvestor(int investorId, [FromServices] IInvestmentService service, [FromServices] ILogger<CommitmentHandlers> logger)
    {
        logger.LogInformation($"Getting commitments for investor {investorId}");

        var investorsCommitment = from inv in service.GetInvestments()
                                  where inv.Name == service.GetInvestorName(investorId)
                                  select new Commitment()
                                  {
                                      Id = inv.Id,
                                      AssetClass = inv.AssetClass,
                                      Currency = inv.Currency,
                                      Amount = inv.Amount,
                                  };

        return investorsCommitment.ToList();
    }
}