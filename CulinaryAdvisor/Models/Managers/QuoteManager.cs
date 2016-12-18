using System;
using System.Linq;
using Microsoft.AspNet.Identity;
using CulinaryAdvisor.Models;

namespace CulinaryAdvisor.Models.Managers
{
	public class QuoteManager
	{
		private readonly DatabaseEntities _context;

		public QuoteManager(DatabaseEntities context)
		{
			_context = context;
		}

		public IdentityResult AddQuote(string text, string author)
		{
			Quote quote = new Quote
			{
				Text = text,
				Author = author
			};

			try
			{
				_context.Quotes.Add(quote);
				_context.SaveChanges();

				return IdentityResult.Success;
			}
			catch (Exception e)
			{
				return new IdentityResult(e.ToString());
			}
		}

		public IdentityResult AddQuote(Quote quote)
		{
			try
			{
				_context.Quotes.Add(quote);
				_context.SaveChanges();

				return IdentityResult.Success;
			}
			catch (Exception e)
			{
				return new IdentityResult(e.ToString());
			}
		}

		public Quote GetRandQuote()
		{
			Random random = new Random();

			int index = random.Next(0, _context.Quotes.Count() - 1);

			return _context.Quotes.OrderBy(q => q.Id).Skip(index).First();
		}
	}
}