import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.scss';
import clsx from 'clsx';

/**
 * Primary UI component for user interaction
 */
export const Input = ({
  config,
  label,
  name,
  required,
  status,
  helpText,
  leadingIcon,
  followingIcon,
}) => {
  const textInput = useRef(null);
  return (
    <div
      className={clsx('w-[100%] flex flex-col', {
        ['text-error']: status == 'error',
      })}
    >
      <label
        htmlFor={name}
        className={clsx('w-[100%] relative flex items-start', {
          [styles['outline-label']]: config == 'outline',
          [styles['filled-label']]: config == 'filled',
        })}
      >
        {leadingIcon && (
          <div
            className={clsx('absolute left-[12px] top-[35px]', {
              ['top-[35px]']: config == 'outline',
              ['top-[38px]']: config == 'filled',
            })}
          >
            {leadingIcon}
          </div>
        )}
        <input
          type="text"
          ref={textInput}
          name={name}
          className={clsx('w-[100%] py-[10px] mt-[20px] border-outline outline-none', {
            [styles['outline-input']]: config == 'outline',
            [styles['filled-input']]: config == 'filled',
            ['px-[35px]']: leadingIcon,
            ['px-[15px]']: !leadingIcon,
            ['border-error']: status === 'error',
            ['border-disabled']: status === 'disabled',
          })}
          required={required}
          disabled={status == 'disabled'}
          placeholder={label}
        />
        {followingIcon && (
          <div
            className={clsx('absolute right-[15px]', {
              ['top-[35px]']: config == 'outline',
              ['top-[38px]']: config == 'filled',
            })}
          >
            {followingIcon}
          </div>
        )}
        <span
          className={clsx('absolute left-[10px] text-[14px] duration-300 px-[5px]', {
            ['translate-y-[32px]']: config == 'outline',
            ['translate-y-[35px]']: config == 'filled',
            ['text-disabled']: status == 'disabled',
            ['ml-6']: leadingIcon,
          })}
          onClick={() => textInput.current.focus()}
        >
          {label} {required && '*'}
        </span>
      </label>
      {helpText && (
        <div className="w-[100%] flex justify-between items-center px-4 mt-1">
          <p
            className={clsx('inline-block text-[12px]', {
              ['text-error']: status == 'error',
              ['text-disabled']: status == 'disabled',
              ['text-text-helper']: status == 'enabled',
            })}
          >
            {helpText}
          </p>
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  /**
   * Configuration
   */
  config: PropTypes.oneOf(['outline', 'filled']),
  /**
   * Input Label
   */
  label: PropTypes.string,
  /**
   * Input name
   */
  name: PropTypes.string,
  /**
   * Help Text
   */
  helpText: PropTypes.string,
  /**
   * Input required
   */
  required: PropTypes.bool,
  /**
   * Input Status
   */
  status: PropTypes.oneOf(['enabled', 'error', 'disabled']),
  /**
   * Leading Icon
   */
  leadingIcon: PropTypes.element,
  /**
   * Following Icon
   */
  followingIcon: PropTypes.element,
};

Input.defaultProps = {
  config: 'outline',
  label: 'Full Name',
  name: 'fullName',
  required: true,
  status: 'enabled',
};
