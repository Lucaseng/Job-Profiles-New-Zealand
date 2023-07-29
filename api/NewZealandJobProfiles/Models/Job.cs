
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace NewZealandJobProfiles.Models
{
    public class Job
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string title { get; set; }
        public string subtitle { get; set; }
        public string description { get; set; }
        public string opportunity { get; set; }

        [BsonElement("salary")]
        [JsonPropertyName("salary")]
        public Salary[] salaries { get; set; }

        public string link { get; set; }
    }
}
