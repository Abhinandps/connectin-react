// import React from 'react'

// const Select = ({ Label, placeholder, options, value, onChange, error }) => {
//     return (
//         <div className="form-field">
//             <label>
//                 {Label}
//             </label>
//             <select
//                 value={value}
//                 onChange={e => onChange(e.target.value)}
//             >
//                 <option value="">{placeholder}</option>
//                 {options.map((data) =>
//                     <option
//                         value={data.id}
//                         key={data.id}
//                     >{data.name}
//                     </option>
//                 )}
//             </select>
//             <div className="error-field">
//                 {error}
//             </div>
//         </div>

//     )
// }

// export default Select