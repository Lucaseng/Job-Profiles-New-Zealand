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


        public async Task DeleteAsync(string id)
        {
            FilterDefinition<Job> filter = Builders<Job>.Filter.Eq("Id", id);
            await _jobCollection.DeleteOneAsync(filter);
            return;

        }
    }
}
