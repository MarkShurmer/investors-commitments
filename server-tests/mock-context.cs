using Microsoft.EntityFrameworkCore;
using Moq;
using System.Collections.Generic;
using System.Linq;

namespace NETCore3WebApp.Test.Business {
 public static class DbContextMock {
  public static DbSet <T> GetQueryableMockDbSet <T> (List <T> sourceList) where T: class 
  {
    var queryable = sourceList.AsQueryable();
    var dbSet = new Mock<DbSet<T>>();
    dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
    dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
    dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
    dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
    dbSet.Setup(d => d.Add(It.IsAny<T>())).Callback<T>((s) => sourceList.Add(s));
    return dbSet.Object;
  }
 }
}