export default function DateOfBirthDropdowns({ value, onChange }) {
  const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  function generateDays() {
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
    for (let i = endYear; i >= startYear; i--) {
      Years.push(i);
    }
    return Years;
  }

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
      <select
        name="month"
        value={value.month || ""}
        onChange={(e) => onChange({ ...value, month: e.target.value })}
        style={{
          cursor: "pointer",
          padding: "10px 12px",
          borderRadius: "5px",
          backgroundColor: "#121212",
          color: "#fff",
        }}
      >
        <option value="">Month</option>
        {months.map((x) => (
          <option key={x.value} value={x.value}>
            {x.label}
          </option>
        ))}
      </select>

      <select
        name="day"
        value={value.day || ""}
        onChange={(e) => onChange({ ...value, day: e.target.value })}
        style={{
          cursor: "pointer",
          padding: "10px 12px",
          borderRadius: "5px",
          backgroundColor: "#121212",
          color: "#fff",
        }}
      >
        <option value="">Day</option>
        {generateDays().map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <select
        name="year"
        value={value.year || ""}
        onChange={(e) => onChange({ ...value, year: e.target.value })}
        style={{
          cursor: "pointer",
          padding: "10px 12px",
          borderRadius: "5px",
          backgroundColor: "#121212",
          color: "#fff",
        }}
      >
        <option value="">Year</option>
        {generateYears().map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
    </div>
  );
}
