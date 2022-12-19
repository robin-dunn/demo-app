namespace ui_tests_cs;

[TestClass]
public class UnitTest1 : TestingCore
{
    [TestMethod]
    public async Task ShouldDownloadTextFile()
    {
      await Page.GotoAsync("http://localhost:4500");

      var csvFile = await DownloadCSVFile("[data-qa=btn-download]");

      string colHeader0 = csvFile.GetHeader(0);
      Assert.AreEqual(colHeader0, "Header0");

      string dataCell0 = csvFile.GetDataCell(0, 0);
      Assert.AreEqual(dataCell0, "Cell0");
    }
}
