using System;
using System.Linq;
using Microsoft.AspNet.Identity;
using CulinaryAdvisor.Models;

namespace CulinaryAdvisor.Models.Managers
{
	public class RecipeManager
	{
		private readonly DatabaseEntities _context;

		public RecipeManager(DatabaseEntities context)
		{
			_context = context;
		}
		public IdentityResult AddRecipe(Recipe recipe)
		{
			try
			{
				_context.Recipes.Add(recipe);
				_context.SaveChanges();

				return IdentityResult.Success;
			}
			catch (Exception e)
			{
				return new IdentityResult(e.ToString());
			}
		}

		public Recipe GetRandRecipe(Type type)
		{
			var array = _context.Recipes.Where(r => r.TypeId == type.Id);

			Random random = new Random();

			int index = random.Next(0, array.Count() - 1);

			return array.OrderBy(r => r.Id).Skip(index).First();

		}
	}
}