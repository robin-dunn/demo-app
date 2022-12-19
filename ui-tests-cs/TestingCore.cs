using Microsoft.Playwright.MSTest;

namespace ui_tests_cs;

public class TestingCore : PageTest
{
  protected async Task<CsvFile> DownloadCSVFile(string buttonSelector, bool hasHeader = true)
  {
      var tasks = new[] {
        Page.WaitForDownloadAsync(),
        Page.Locator(buttonSelector).ClickAsync()
      };

      await Task.WhenAll(tasks);

      var downloadTask = tasks[0] as Task<Microsoft.Playwright.IDownload>;

      if (downloadTask is null) throw new ApplicationException("Download error.");

      var d = downloadTask.Result;
      string? filePath = await d.PathAsync();

      if (filePath is null) throw new ApplicationException("File path was null.");

      return new CsvFile(filePath, hasHeader);
  }
}