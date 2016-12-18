using System.Web;
using System.Web.Optimization;

namespace CulinaryAdvisor
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			var styleBundle = new StyleBundle("~/Content/css");

			styleBundle.Include("~/Content/bootstrap.css");
			styleBundle.Include("~/Content/site.css");
			styleBundle.Include("~/Content/MyStyle.css");

			bundles.Add(styleBundle);

			bundles.Add(new ScriptBundle("~/bundles/js/lib").Include(
				"~/Scripts/jquery-{version}.js",
				"~/Scripts/jquery.validate*",
				"~/Scripts/modernizr-*",
				"~/Scripts/bootstrap.js",
				"~/Scripts/respond.js",
				"~/Scripts/angular.js",
				"~/Scripts/angular-route.js",
				"~/Scripts/angular-cookies.js",
				"~/Scripts/spin.js",
				"~/Scripts/angular-spinner.js",
				"~/Scripts/akFileUploader.js"
				));

			bundles.Add(new ScriptBundle("~/bundles/js/app").Include(
				//Main Angular module
				"~/App_Scripts/app.module.js",
				"~/App_Scripts/app.config.js",
				
				//Home
				"~/App_Scripts/Home/header.controller.js",
				"~/App_Scripts/Home/home.controller.js",
				//Quote
				"~/App_Scripts/Quote/app.add.quote.module.js",
				"~/App_Scripts/Quote/quote.controller.js",
				"~/App_Scripts/Quote/quote.service.js",
				"~/App_Scripts/Quote/add.quote.controller.js",
				//AddRecipe
				"~/App_Scripts/AddRecipe/app.add.recipe.module.js",
				"~/App_Scripts/AddRecipe/add.recipe.controller.js",
				"~/App_Scripts/AddRecipe/add.recipe.service.js",
				//Advisor
				"~/App_Scripts/Advisor/app.advisor.module.js",
				"~/App_Scripts/Advisor/advisor.controller.js",
				"~/App_Scripts/Advisor/advisor.service.js",
				//Error
				"~/App_Scripts/Error/app.error.module.js",
				"~/App_Scripts/Error/error.controller.js"
				));

		}
	}
}
