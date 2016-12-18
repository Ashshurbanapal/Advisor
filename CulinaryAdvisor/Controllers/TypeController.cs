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
    public class TypeController : ApiController
    {
	    private readonly TypeManager _typesManager;

	    public TypeController()
	    {
		    _typesManager = new TypeManager(new DatabaseEntities());
	    }

	    public JsonResult Get()
	    {
		    var types = _typesManager.GetAllTypes();

			List<TypeModel> typesModel = new List<TypeModel>();

		    foreach (var type in types)
		    {
			    typesModel.Add(new TypeModel
			    {
				    Name = type.Name
			    });
		    }

			return new JsonResult { Data = typesModel, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}
    }
}
