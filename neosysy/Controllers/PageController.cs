using Microsoft.AspNetCore.Mvc;
using neosysy.Models;
using System.Text.Json;

namespace neosysy.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PageController : ControllerBase
    {
        private readonly ILogger<PageController> _logger;

        public PageController(ILogger<PageController> logger)
        {
            _logger = logger;
        }


        [HttpPost(Name = "GetRecords")]
        public async Task<IActionResult> GetRecords([FromBody] VmPaginationRequest vmPaginationRequest)
        {
            try
            {
                if (vmPaginationRequest != null && vmPaginationRequest.PageSize > 0 && vmPaginationRequest.PageNumber > 0)
                {
                    using FileStream fs = new(Path.Combine("SampleData", "data.json"), FileMode.Open, FileAccess.Read);
                    VmPaginationResponse<ActualData> vmPaginationResponse = new();
                    _logger.LogInformation("Loading all data.");
                    var allData = await JsonSerializer.DeserializeAsync<List<ActualData>>(fs);
                    _logger.LogInformation("Data Loaded successfully.");

                    if (allData == null)
                    {
                        throw new Exception("No data to be returned.");
                    }

                    vmPaginationResponse.Data = allData
                                                .OrderBy(x => x.Id)
                                                .Where(x=> string.IsNullOrEmpty(x.Name) || string.IsNullOrEmpty(vmPaginationRequest.SearchFilter) || x.Name.Contains(vmPaginationRequest.SearchFilter, StringComparison.OrdinalIgnoreCase))
                                                .Skip((vmPaginationRequest.PageNumber - 1) * vmPaginationRequest.PageSize)
                                                .Take(vmPaginationRequest.PageSize)
                                                .ToList();
                    vmPaginationResponse.TotalCount = allData.Count;
                    return Ok(vmPaginationResponse);
                }

                throw new Exception("Invalid arguments passed.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}