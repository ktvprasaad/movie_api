import './button.scss';

/**
 * @function Button
 * @param {label} label
 */
export function Button({label}) {
    return <button className="super-button">{label}</button>;
}
