using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using NewZealandJobProfiles.Models;

namespace NewZealandJobProfiles.Services
{
    public class MongoDBService
    {
        private readonly IMongoCollection<Job> _jobCollection;

        public MongoDBService(IOptions<MongoDBSettings> settings)
        {
            MongoClient client = new MongoClient(settings.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(settings.Value.DatabaseName);
            _jobCollection = database.GetCollection<Job>(settings.Value.CollectionName);
        }

        public async Task CreateAsync(Job job)
        {
            await _jobCollection.InsertOneAsync(job);
            return;
        }

        public async Task CreateManyAsync(Job[] jobs)
        {
            await _jobCollection.InsertManyAsync(jobs);
            return;
        }

        public async Task<List<Job>> GetAsync()
        {
            return await _jobCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Job> GetByIdAsync(string id)
        {
            FilterDefinition<Job> filter = Builders<Job>.Filter.Eq("Id", id);
            return await _jobCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<List<Job>> Search(string keyword, string opportunity, int? entrySalaryLower, int? entrySalaryUpper, int? expSalaryLower, int? expSalaryUpper, string sortBy)
        {
            var filterBuilder = Builders<Job>.Filter;
            var filter = filterBuilder.Empty; // Initialize with an empty document that matches nothing

            if (!string.IsNullOrEmpty(keyword))
            {
                // Create a filter for title and description using the OR operator (|)
                var titleFilter = filterBuilder.Regex("title", new BsonRegularExpression(keyword, "i"));
                var descriptionFilter = filterBuilder.Regex("description", new BsonRegularExpression(keyword, "i"));

                // Combine title and description filters using the OR operator (|)
                filter = filterBuilder.Or(titleFilter, descriptionFilter);
            }

            // Filter through job opportunities
            if (!string.IsNullOrEmpty(opportunity))
            {
                filter &= filterBuilder.Eq(j => j.opportunity, opportunity.Substring(0, 1).ToUpper() + opportunity.ToLower().Substring(1));
            }


            // Filter thorugh the lower bound of entry salaries
            if (entrySalaryLower != null)
            {
                filter &= filterBuilder.Gte(j => j.salaries[0].range[0], entrySalaryLower);
            }

            // Filter thorugh the upper bound of entry salaries
            if (entrySalaryUpper != null)
            {
                filter &= filterBuilder.Lte(j => j.salaries[0].range[1], entrySalaryUpper);
            }

            // Filter thorugh the lower bound of experienced salaries
            if (expSalaryLower != null)
            {
                filter &= filterBuilder.Gte(j => j.salaries[1].range[0], expSalaryLower);

            }

            // Filter thorugh the lower bound of experienced salaries
            if (expSalaryLower != null)
            {
                filter &= filterBuilder.Lte(j => j.salaries[1].range[1], expSalaryUpper);

            }


            //Organise sorting
            if (!string.IsNullOrEmpty(sortBy))
            {
                string[] sortByArr = sortBy.Split(' ');

                var sortBuilder = Builders<Job>.Sort;
                List<SortDefinition<Job>> sortDefinitions = new List<SortDefinition<Job>>();

                foreach (var sortParam in sortByArr)
                {
                    string sortField;
                    bool isDescending = false;

                    if (sortParam.StartsWith("-"))
                    {
                        sortField = sortParam.Substring(1);
                        isDescending = true;
                    }
                    else
                    {
                        sortField = sortParam;
                    }

                    // Check for specific fields and map them to the corresponding salary range
                    if (sortField == "EntrySalaryLower")
                    {
                        sortField = "salaries.0.range.0";
                    }
                    else if (sortField == "EntrySalaryUpper")
                    {
                        sortField = "salaries.0.range.1";
                    }
                    else if (sortField == "ExpSalaryLower")
                    {
                        sortField = "salaries.1.range.0";
                    }
                    else if (sortField == "ExpSalaryUpper")
                    {
                        sortField = "salaries.1.range.1";
                    }

                    SortDefinition<Job> currentSort = isDescending
                        ? sortBuilder.Descending(sortField)
                        : sortBuilder.Ascending(sortField);

                    sortDefinitions.Add(currentSort);
                }

                SortDefinition<Job> sort = sortBuilder.Combine(sortDefinitions);

                return await _jobCollection.Find(filter).Sort(sort).ToListAsync();
            }




            return await _jobCollection.Find(filter).ToListAsync();
        }



        public async Task DeleteAsync(string id)
        {
            FilterDefinition<Job> filter = Builders<Job>.Filter.Eq("Id", id);
            await _jobCollection.DeleteOneAsync(filter);
            return;

        }
    }
}
