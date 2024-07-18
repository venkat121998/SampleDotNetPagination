namespace neosysy.Models
{
    public class VmPaginationResponse<T>
    {
        public List<T>? Data { get; set; }

        public int TotalCount { get; set; }
    }
}