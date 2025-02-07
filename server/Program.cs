

var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IInvestmentService, InvestmentService>();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

app.MapGet("/", () => "Hello health check");
app.MapGet("/investors", InvestorHandlers.GetInvestors);

app.Run();
