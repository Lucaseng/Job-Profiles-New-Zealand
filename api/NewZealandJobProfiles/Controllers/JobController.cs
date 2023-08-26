using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using NewZealandJobProfiles.Models;
using NewZealandJobProfiles.Services;

namespace NewZealandJobProfiles.Controllers
{
    [Controller]
    [Route("api/[controller]")]
    public class JobController : Controller
    {
        private readonly MongoDBService _mongoDBService;
        public JobController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        [HttpGet]
        public async Task<List<Job>> Get()
        {
            return await _mongoDBService.GetAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            if (!ObjectId.TryParse(id, out _))
            {
                return BadRequest(new Fail { fail = string.Format("{0} is not a valid ObjectId!", id) });
            }

            Job job = await _mongoDBService.GetByIdAsync(id);

            if (job == null)
            {
                return BadRequest(new Fail { fail = string.Format("No Job with id {0} found!", id) });
            }

            return Ok(job);
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string keyword, string opportunity, int? entrySalaryLower, int? entrySalaryUpper, int? expSalaryLower, int? expSalaryUpper, string sortBy, int? page)
        {
            List<Object> jobList = await _mongoDBService.Search(keyword, opportunity, entrySalaryLower, entrySalaryUpper, expSalaryLower, expSalaryUpper, sortBy, page);
            return Ok(jobList);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Job job)
        {
            await _mongoDBService.CreateAsync(job);
            return CreatedAtAction(nameof(Get), new { id = job.Id }, job);
        }

        [HttpPost("import")]
        public async Task<IActionResult> PostMany([FromBody] Job[] jobs)
        {
            await _mongoDBService.CreateManyAsync(jobs);
            return CreatedAtAction(nameof(PostMany), new { }, string.Format("Created {0} jobs", jobs.Length));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _mongoDBService.DeleteAsync(id);
            return Ok(string.Format("Job with id {0} was deleted successfully!", id));
        }
    }
}
