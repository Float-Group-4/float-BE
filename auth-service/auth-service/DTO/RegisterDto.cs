using System.ComponentModel.DataAnnotations;

namespace auth_service.DTO
{
    public class RegisterDto
    {
        [EmailAddress]
        public string email {  get; set; }
        [Required]
        public string password { get; set; }
        public string name { get; set; }
    }
}
