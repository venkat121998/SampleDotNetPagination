using System.ComponentModel.DataAnnotations;

namespace neosysy.Models
{
    public class VmPaginationRequest
    {
        public int PageNumber { get; set; }

        public int PageSize { get; set; }
        
        public string? SearchFilter { get; set; }
    }
}
