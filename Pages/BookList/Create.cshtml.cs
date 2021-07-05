using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazorPages.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace BookListRazorPages.Pages.BookList
{
    public class CreateModel : PageModel
    { 
    private readonly ApplicationDbContext _db;

    public CreateModel(ApplicationDbContext db)
    {
            _db = db;
    }
        //method #2 to post data into the db is to bind it with the model automatically
        [BindProperty]
        public Book Book { get; set; }
        public void OnGet()
        {
        }

        //method #1 to post data into the db
        //public async Task<IActionResult> OnPost(Book BookObj)
        //{
        //    //do something here
        //}

        //using method #2
        public async Task<IActionResult> OnPost()
        {
            if (!(ModelState.IsValid))
            {
                //return back to the current page with error message
                return Page();
            }
            else
            {
                //collect data and add to queue
                await _db.Book.AddAsync(Book);

                //save data into the database
                await _db.SaveChangesAsync();

                //redirect back to the index page
                return RedirectToPage("Index");

            }
        }
    }
}
