

var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IInvestmentService, InvestmentService>();

var app = builder.Build();

app.MapGet("/", () => "Hello health check");
app.MapGet("/investors", InvestorHandlers.GetInvestors);

app.Run();
