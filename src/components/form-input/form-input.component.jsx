import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* if label exits then render this if not then dont */}
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } from-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

// do this way or this way 
// if you used this way in signup form put value in obj

// const FormInput = ({ label, inputOptions }) => {
//     return (
//       <div className="group">
//         <input className="form-input" {...inputOptions} />
//         {/* if label exits then render this if not then dont */}
//         {label && (
//           <label
//             className={`${
//               inputOptions.value.length ? "shrink" : ""
//             } from-input-label`}
//           >
//             {label}
//           </label>
//         )}
//       </div>
//     );
//   };

export default FormInput;
