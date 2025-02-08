

var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<DataContext>();
builder.Services.AddSingleton<IInvestmentService, InvestmentService>();
builder.Services.AddCors();
builder.Services.AddHttpLogging(o => { });

var app = builder.Build();

app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
app.UseHttpLogging();

app.MapGet("/", () => "Hello health check");
app.MapGet("/investors", InvestorHandlers.GetInvestors);
app.MapGet("/investor/{investorId}", CommitmentHandlers.GetCommitmentsForInvestor);

app.Run();
