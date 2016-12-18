using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CulinaryAdvisor.Controllers
{
    public class ErrorController : Controller
    {
		[HttpGet]
		public ActionResult ToMainPage()
		{
			return RedirectToRoute(new { controller = "Home", action = "Index" });
		}

		public ActionResult HttpError404(string message)
		{
			ViewBag.Message = message;

			return View();
		}

		public ActionResult HttpError500(string message)
		{
			ViewBag.Message = message;

			return View();
		}

		public ActionResult General(string errorType, string message)
		{
			ViewBag.ErrorType = errorType;
			ViewBag.Message = message;

			return View();
		}

		public ActionResult Fatal(string message)
		{
			ViewBag.Message = message;

			return View();
		}
	}
}