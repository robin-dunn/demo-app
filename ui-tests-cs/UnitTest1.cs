using Microsoft.Playwright.MSTest;

namespace ui_tests_cs;

[TestClass]
public class UnitTest1 : PageTest
{
    [TestMethod]
    public async Task ShouldDownloadTextFile()
    {
      await Page.GotoAsync("http://localhost:4500");

      var tasks = new[] {
        Page.WaitForDownloadAsync(),
        Page.Locator("[data-qa=btn-download]").ClickAsync()
      };

      await Task.WhenAll(tasks);

      var downloadTask = tasks[0] as Task<Microsoft.Playwright.IDownload>;
      Assert.IsNotNull(downloadTask);

      var d = downloadTask.Result;
      string? filePath = await d.PathAsync();
      Assert.IsNotNull(filePath);
      Assert.AreEqual(File.ReadAllText(filePath), "Download test");
    }
}
