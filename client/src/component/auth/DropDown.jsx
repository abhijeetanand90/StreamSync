

export default function DropDown() {

    const options = ['Option 1', 'Option 2', 'Option 3'];

    function handleOptionClick(){
        console.log('ui')
    }

  return (
    <div>
          {options.map((option) => (
            <ul>
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #eee',
              }}
            >
              {option}
            </li>
            </ul>
          ))}

    </div>
  )
}
