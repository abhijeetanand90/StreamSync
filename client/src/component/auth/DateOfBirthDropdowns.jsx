



export default function DateOfBirthDropdowns() {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "3", label: "April" },
    { value: "3", label: "May" },
    { value: "3", label: "June" },
    { value: "3", label: "July" },
    { value: "3", label: "August" },
    { value: "3", label: "September" },
    { value: "3", label: "October" },
    { value: "3", label: "November" },
    { value: "12", label: "December" },
  ];

  function generateDays() {
    //   days=[]     days=[]; is missing const or let → Without it, JavaScript assumes it's a global variable.
    const days = [];

    for (let i = 1; i < 32; i++) {
      days.push(i);
    }
    return days;
  }

  function generateYears() {
    const startYear = 1950;
    const endYear = new Date().getFullYear();
    const Years = [];
    for (let i = endYear; i >=startYear; i--) {
      Years.push(i);
    }
    return Years;
  }

  return (
    <div style={{display:"flex",gap:'20px',marginTop:'8px' }}>
      <select name="" id=""  style={{cursor:'pointer', padding:'10px 12px', borderRadius:'5px', backgroundColor: '#121212', color:'#fff', }}>
        <option value="">Month</option>
        {months.map((x) => (
          <option>{x.label}</option>
        ))}
      </select>

      <select name="" id="" style={{cursor:'pointer', padding:'10px 12px' , borderRadius:'5px',backgroundColor: '#121212', color:'#fff',}}>
        <option value="">Day</option>
        {generateDays().map(item=>(
            <option>{item}</option>
        ))}
      </select>

      <select name="" id="" style={{cursor:'pointer', padding:'10px 12px' , borderRadius:'5px',backgroundColor: '#121212', color:'#fff',}}>
        <option value="">Year</option>
        {generateYears().map(x =>(
            <option>{x}</option>
        ))}
      </select>
    </div>
  );
}
