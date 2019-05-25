import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/validate';
import classnames from 'classnames';

const InputText = ({ label, type, name, value, placeholder, onChange, error, hasSuccess }) => {
    return (
        <div>
            <div className={classnames('form-group', { 
                'has-success': hasSuccess, 
                'has-danger': !isEmpty(error) 
            })}>
                { !isEmpty(label) && <label className="form-control-label">{label}</label> }
                <input 
                    type={type} 
                    value={value} 
                    name={name}
                    placeholder={placeholder} 
                    onChange={onChange}
                    className={classnames('form-control', { 
                        'is-invalid': !isEmpty(error) , 
                        'is-valid': hasSuccess
                    })} 
                /> 
                { !isEmpty(error) && <div className="invalid-feedback">{ error }</div> }
            </div>
        </div>
    );
};

InputText.propTypes = {
   
};

export default InputText;
