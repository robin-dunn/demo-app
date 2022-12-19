namespace ui_tests_cs;

public class CsvFile
{
  private bool _hasHeaders = false;
  private string[] _headers = new string[] {};
  private string[] _dataRows = new string[] {};

  public CsvFile(string filePath, bool hasHeader = true)
  {
    InitData(File.ReadAllLines(filePath), hasHeader);
  }

  public CsvFile(string[] lines, bool hasHeader = true)
  {
    InitData(lines, hasHeader);
  }

  private void InitData(string[] lines, bool hasHeader = true)
  {
    Console.WriteLine("lines:");
    foreach(var line in lines) Console.WriteLine(line.ToString());

    if (hasHeader) {
      _hasHeaders = true;
      _headers = lines[0].Split(",");
      _dataRows = lines.Skip(1).ToArray();
    } else {
      _dataRows = lines.Skip(0).ToArray();
    }

    Console.WriteLine("Data rows:");
    foreach(var drow in _dataRows) Console.WriteLine(drow.ToString());
  }

  public string GetHeader(int colIndex)
  {
    return _headers[colIndex];
  }

  public string GetDataCell(int rowIndex, int colIndex)
  {
    return _dataRows[rowIndex].Split(",")[colIndex];
  }
}