using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Exam
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Professor { get; set; }
        public string ProfessorImg { get; set; }
        public string Location { get; set; }
        public string ShareName { get; set; }
        public List<File> Files { get; set; }
    }
}
