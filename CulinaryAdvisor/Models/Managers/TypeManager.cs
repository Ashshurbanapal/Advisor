using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using CulinaryAdvisor.Models;

namespace CulinaryAdvisor.Models.Managers
{
	public class TypeManager
	{
		private readonly DatabaseEntities _context;

		public TypeManager(DatabaseEntities context)
		{
			_context = context;
		}

		public Type GetTypeById(int id)
		{
			return _context.Types.SingleOrDefault(t => t.Id == id);
		}

		public Type GetTypeByName(string name)
		{
			return _context.Types.SingleOrDefault(t => t.Name == name);
		}

		public IEnumerable<Type> GetAllTypes()
		{
			return _context.Types;
		}

		public IdentityResult AddType(string name)
		{
			Type type = new Type
			{
				Name = name
			};

			try
			{
				_context.Types.Add(type);
				_context.SaveChanges();

				return IdentityResult.Success;
			}
			catch (Exception e)
			{
				return  new IdentityResult(e.ToString());
			}
		}
	}
}