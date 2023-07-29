using Microsoft.AspNetCore.Mvc;

namespace NewZealandJobProfiles.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
