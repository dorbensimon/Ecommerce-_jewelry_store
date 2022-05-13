import './Button.css';
import { React } from 'react';



function Button({ button, filter }) {

  return (
    <div className="buttonss">
      {button.map((cat) => {
        return (
          <button className="btnn" onClick={() => filter(cat)}>
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default Button;
