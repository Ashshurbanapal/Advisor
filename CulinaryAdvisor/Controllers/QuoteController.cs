using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using CulinaryAdvisor.Models;
using CulinaryAdvisor.Models.Managers;
using CulinaryAdvisor.Models.ViewModels;

namespace CulinaryAdvisor.Controllers
{
    public class QuoteController : ApiController
    {
	    private readonly QuoteManager _quoteManager;

	    public QuoteController()
	    {
		    _quoteManager = new QuoteManager(new DatabaseEntities());
	    }

	    public JsonResult Post(QuoteViewModel model)
	    {
		    var result = _quoteManager.AddQuote(model.Text, model.Author);

		    if (result.Succeeded)
		    {
				return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
			}

			return new JsonResult { Data = result.Errors.ToString(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

	    public JsonResult Get()
	    {
		    var result = _quoteManager.GetRandQuote();

			return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}
    }
}
