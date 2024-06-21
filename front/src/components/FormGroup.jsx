import { cloneElement } from "preact";

const FORM_BIND_PROP = "attr";
const FORM_OBJ_PROP = "bind";
const FORM_UPD_PROP = "watch";
const FORM_TRIGGER_PROP = "onChange";

function getValue(child, evt) {
  switch(child.props.type) {
    case "number": return Number(evt.target.value);
    //case "date": return evt.target.valueAsNumber;
    case "checkbox": return evt.target.checked;
    default: return evt.target.value;
  }
}

const createChangeListener = (child, original, update) => evt => {
  let key = child.props[FORM_BIND_PROP];
  let value = getValue(child, evt);
  update({ [key]: value }, key);
}

function toArray (val) {
  if (Array.isArray(val)) return val;
  else return [val];
}

function transformProps (original, props, child) {
  return {
    ...child.props,
    [FORM_TRIGGER_PROP]: createChangeListener(child, original, props[FORM_UPD_PROP]),
    value: original[child.props[FORM_BIND_PROP]]
  }
}

export const FormGroup = (props) => {
  const original = props[FORM_OBJ_PROP] || {};
  const mapChildren = children => toArray(children).map(child => {
    if (!child) return null;
    if (!child.props) return child;

    const newProps = FORM_BIND_PROP in child.props ?
      transformProps(original, props, child): child.props;

    return cloneElement(
      child,
      newProps,
      child.props.children && mapChildren(child.props.children)
    );
  });

  return (
    <form>{mapChildren(props.children)}</form>
  );
}
