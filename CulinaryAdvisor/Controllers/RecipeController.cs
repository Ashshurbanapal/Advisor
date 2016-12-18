using CulinaryAdvisor.Models;
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
    public class RecipeController : ApiController
    {
	    private readonly RecipeManager _recipeManager;
	    private readonly TypeManager _typesManager;

	    public RecipeController()
	    {
		    _recipeManager = new RecipeManager(new DatabaseEntities());
			_typesManager = new TypeManager(new DatabaseEntities());
	    }

		public JsonResult Put(RecipeViewModel model)
		{
			Models.Type type = _typesManager.GetTypeByName(model.Type);

			var recipe = new Recipe
			{
				Name = model.Name,
				Description = model.Description,
				Ingredients = model.Ingredients,
				Process = model.Process,
				Author = model.Author,
				TypeId = type.Id
			};

			var result = _recipeManager.AddRecipe(recipe);

			if (result.Succeeded)
			{
				var message = "Success";
				return new JsonResult { Data = message, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
			}

			return new JsonResult { Data = result.Errors.ToString(), JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}

		public JsonResult Post(AdvisorViewModel model)
	    {
			Models.Type type = _typesManager.GetTypeByName(model.Type);

		    var result = _recipeManager.GetRandRecipe(type);

		    if (result != null)
		    {
				ReturnRecipeModel recipe = new ReturnRecipeModel
				{
					Name = result.Name,
					Description = result.Description,
					Ingredients = result.Ingredients,
					Process = result.Process,
					Author = result.Author
				};
				return new JsonResult { Data = recipe, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
			}

			return new JsonResult { Data = "Error", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
		}
    }
}
