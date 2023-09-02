using ContactoCRUD.Models;
namespace ContactoCRUD.Services
{
    public interface IEmailServices
    {
        void SendEmail(EmailDTO request);
    }
}
