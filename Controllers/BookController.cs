using BookListRazorPages.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookListRazorPages.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDbContext _db;
        public BookController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = await _db.Book.ToListAsync() });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _db.Book.FirstOrDefaultAsync(d => d.Id == id);
            if(book == null)
            {
                return Json(new { success = false, message = "Error while deleting book" });
            }
            _db.Book.Remove(book);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message = "Book Deleted Successfully!" }); 
        }
    }
}
